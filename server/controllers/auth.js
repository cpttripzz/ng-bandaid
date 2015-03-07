var route = require('koa-route'),
  parse = require('co-body'),
  passport = require("koa-passport");


exports.init = function (app) {
  app.use(route.post('/api/auth/local', signIn));
  app.use(route.post('/api/auth/register', register));
};


function *signIn() {
  var ctx = this;
  yield* passport.authenticate("local", function*(err, user, info) {
    if (err) {
      throw err;
    }
    if (user === false) {
      ctx.status = 401;
    } else {
      yield ctx.login(user);
      ctx.body = { user: user };
    }
  }).call(this);
};

function *register(){
  var credentials = yield parse(this);
  var email    = credentials.email
    , username = credentials.username
    , password = credentials.password;


  if (!password) {
    var err = { "error": "E_VALIDATION", "status": 400, "summary": "1 attribute is invalid", "model": "User", "invalidAttributes": { "password": [ { "rule": "string", "message": "`undefined` should be a string (instead of \"null\", which is a object)" }, { "rule": "required", "message": "\"required\" validation rule failed for input: null" } ] } }
    return next(err);
  }
  user = yield app.models.user.create({
    username : username
    , email    : email
  }, function (err, user) {
    if (err) {
      console.log(err);
    }
    debugger;
    app.models.passport.create({
      protocol : 'local'
      , password : password
      , user     : user.id
    }, function (err, passport) {
      if (err) {
        if (err.code === 'E_VALIDATION') {
          req.flash('error', 'Error.Passport.Password.Invalid');
        }
        console.log(err);
        return user.destroy(function (destroyErr) {
          next(destroyErr || err);
        });
      }

      next(null, user);
    });
  });
}

//exports.getCurrentUser = function *() {
//  if (this.passport.user) {
//    this.body = { user: this.passport.user };
//  }
//  this.status = 200;
//};
//
//exports.signOut = function *() {
//  this.logout();
//  this.session = null;
//  this.status = 204;
//};
//
//exports.createUser = function *() {
//  if (!this.request.body) {
//    this.throw("The body is empty", 400);
//  }
//
//  if (!this.request.body.username) {
//    this.throw("Missing username", 400);
//  }
//  if (!this.request.body.password) {
//    this.throw("Missing password", 400);
//  }
//
//  var User = require("mongoose").model("User");
//
//  try {
//    var user = new User({ username: this.request.body.username, password: this.request.body.password });
//    user = yield user.save();
//    yield this.login(user);
//  } catch (err) {
//    this.throw(err);
//  }
//
//  this.status = 200;
//  this.body = { user: this.passport.user };
//};

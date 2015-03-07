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
}

function *register(){

  if (!this.request.body) {
    this.throw("The body is empty", 400);
  }

  if (!this.request.body.username) {
    this.throw("Missing username", 400);
  }
  if (!this.request.body.password) {
    this.throw("Missing password", 400);
  }

  var User = require("mongoose").model("User");
  try {
    var user = new User({ username: this.request.body.username, password: this.request.body.password });
    user = yield user.save();
    console.log(user);
  } catch (err) {
    this.throw(err);
  }

  this.status = 200;
  this.body = { user: this.passport.user };
};

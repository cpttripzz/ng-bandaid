var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google').Strategy;

var serialize = function (user, done) {
  done(null, user._id);
};

var deserialize = function (User, id, done) {
  User.findById(id, done);
};

var getUser = function(app,passport,query){
  console.log(app.context.models);
  app.context.models.user.findOne(query, function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(new Error('Identifier not found.'), false);
    }

    app.models.passport.findOne({
      protocol : 'local'
      , user     : user.id
    }, function (err, passport) {
      if (passport) {
        passport.validatePassword(password, function (err, res) {
          if (err) {
            return next(err);
          }

          if (!res) {
            req.flash('error', 'Error.Passport.Password.Wrong');
            return next(new Error('Identifier not found.'), null);
          } else {
            return next(null, user);
          }
        });
      }
      else {
        req.flash('error', 'Error.Passport.Password.NotSet');
        return next(null, false);
      }
    });
  });
};


module.exports = function (app, passport, config) {
  console.log(app.context.models);
  passport.serializeUser(serialize);
  passport.deserializeUser(app.context.models.user, deserialize);
  passport.use(new LocalStrategy(getUser(app,passport,query)));
  passport.use(new FacebookStrategy({
      clientID: 'your-client-id',
      clientSecret: 'your-secret',
      callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
    },
    function(token, tokenSecret, profile, done) {
      // retrieve user ...
      done(null, user)
    }
  ));

  passport.use(new GoogleStrategy({
      returnURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback',
      realm: 'http://localhost:' + (process.env.PORT || 3000)
    },
    function(identifier, profile, done) {
      // retrieve user ...
      done(null, user)
    }
  ));
};

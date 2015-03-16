'use strict';

/**
 * Entry point for KOAN app. Initiates database connection and starts listening for requests on configured port.
 */

var config = require('./server/config/config'),
  mongo = require('./server/config/mongo'),
  waterline = require('./server/config/waterline'),
  koaConfig = require('./server/config/koa'),
  co = require('co'),


  fs = require('fs'),
  logger = require('koa-logger'),
  send = require('koa-send'),
  jwt = require('koa-jwt'),
  cors = require('koa-cors'),
  mongoose = require('mongoose'),

  Router = require('koa-router'),
  passport = require('koa-passport'),
  router = new Router(),


  koa = require('./lib/application.js');

var app = koa();

var port = process.env.PORT || 3000;


module.exports = app;

/**
 * Initiates a new KOAN server. Returns a promise.
 * @param overwriteDB Overwrite existing database with the seed data. Useful for testing environment.
 */
app.init = co.wrap(function *(overwriteDB) {
  // koa config
  koaConfig(app);

  app.listen(port, function () {
    console.log('Server listening at port %d', port);
  });
});

mongoose.connect(config.mongo.url);
mongoose.connection.on('error', function (err) {
  console.log(err);
});
/**
 * Load the models
 */
var models_path = config.app.root + '/server/models';
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('js')) {
    require(models_path + '/' + file);
  }
});
require('./server/config/passport')(passport, config);
app.use(passport.initialize());
app.use(passport.session());

// auto init if this app is not being initialized by another module (i.e. using require('./app').init();)
if (!module.parent) {
  app.init().catch(function (err) {
    console.error(err.stack);
    process.exit(1);
  });
}

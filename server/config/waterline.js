"use strict";
var fs = require('fs'),
  Waterline = require('waterline');
var orm= new Waterline();
module.exports=function(app, callback){
  var mongoAdapter = require('sails-mongo');

  // Build A Config Object
  var waterLineConfig = {

    // Setup Adapters
    // Creates named adapters that have have been required
    adapters: {
      'default': mongoAdapter,
      'mongoAdapter': mongoAdapter
    },

    // Build Connections Config
    // Setup connections using the named adapter configs
    connections: {
      localMongodbServer: {
        adapter: 'mongoAdapter',
        host: 'localhost',
        port: 27017,
        database: 'koa-bandaid'
        // user: 'username',
        // password: 'password',
        // database: 'your_mongo_db_name_here'
      }

    },

    defaults: {
      migrate: 'alter'
    }

  };

  // mount all the routes defined in the api controllers
  console.log(__dirname);
  fs.readdirSync('./server/models').forEach(function (file) {
    var model = require(__dirname + '/../models/' + file);
    console.log(__dirname + '/../models/' + file + ' loaded');
    orm.loadCollection(model);
  });

  orm.initialize(waterLineConfig, callback);
  return orm;
};

'use strict';

var fs = require('fs'),
  logger = require('koa-logger'),
  send = require('koa-send'),
  jwt = require('koa-jwt'),
  cors = require('koa-cors'),
  Waterline = require('waterline'),
  config = require('./config');


module.exports = function (app) {
  // middleware configuration

  var orm = new Waterline();
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
  //console.log(__dirname);
  fs.readdirSync('./server/models').forEach(function (file) {
    var model = require(__dirname + '/../models/' + file);
    console.log(__dirname + '/../models/' + file);

    orm.loadCollection(model);
  });

  //////////////////////////////////////////////////////////////////
// START WATERLINE
//////////////////////////////////////////////////////////////////

// Start Waterline passing adapters in
  orm.initialize(waterLineConfig, function(err, models) {
    if(err) throw err;

    app.models = models.collections;
    app.connections = models.connections;

    console.log("To see saved users, visit http://localhost:3000/users");
  });

  if (config.app.env !== 'test') {
    app.use(logger());
  }
  if (config.app.env === 'development') {
    app.use(require('koa-livereload')({excludes: ['/modules']}));
  }
  app.use(cors({
    maxAge: config.app.cacheTime / 1000,
    credentials: true,
    methods: 'GET, HEAD, OPTIONS, PUT, POST, DELETE',
    headers: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  }));

  // register special controllers which should come before any jwt token check and be publicly accessible
  require('../controllers/public').init(app);
  require('../controllers/signin').init(app);

  // serve the static files in the /client directory, use caching only in production (7 days)
  var sendOpts = config.app.env === 'production' ? {root: 'client', maxage: config.app.cacheTime} : {root: 'client'};
  app.use(function *(next) {
    // do not handle /api paths
    if (this.path.substr(0, 5).toLowerCase() === '/api/') {
      yield next;
      return;
    } else if (yield send(this, this.path, sendOpts)) {
      // file exists and request successfully served so do nothing
      return;
    } else if (this.path.indexOf('.') !== -1) {
      // file does not exist so do nothing and koa will return 404 by default
      // we treat any path with a dot '.' in it as a request for a file
      return;
    } else {
      // request is for a subdirectory so treat it as an angular route and serve index.html, letting angular handle the routing properly
      yield send(this, '/index.html', sendOpts);
    }
  });

  // middleware below this line is only reached if jwt token is valid
  app.use(jwt({secret: config.app.secret}));

  // mount all the routes defined in the api controllers
  fs.readdirSync('./server/controllers').forEach(function (file) {
    require('../controllers/' + file).init(app);
  });


  var nsp = app.io.of('/koan');

  nsp.use(function* (next) {
    var accessToken = this.headers.Authorization;
    console.log(this.headers);
    // this bit is a bit of hack to make a sync function out of thunkified async function! might better use 'jws' (npm) package here
    jwt.verify(accessToken, config.app.secret)(function (err, jwtPayload) {
      info.req.user = jwtPayload;
    });

    if (jwtPayload) {
      this.join('posts');
      return info.req.user;
    }
    // on connect
    console.log('somebody connected to namespace');
    console.log(this.headers);
    yield* next;
    // on disconnect

  });


  nsp.on('connection', function (socket) {
    console.log('someone connected');
  });
  nsp.emit('hi', 'everyone!');
};


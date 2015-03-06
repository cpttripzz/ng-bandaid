'use strict';

/**
 * Entry point for KOAN app. Initiates database connection and starts listening for requests on configured port.
 */

var config = require('./server/config/config'),
    mongo = require('./server/config/mongo'),
    mongoSeed = require('./server/config/mongo-seed'),
    koaConfig = require('./server/config/koa'),
    co = require('co'),
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

// auto init if this app is not being initialized by another module (i.e. using require('./app').init();)
if (!module.parent) {
    app.init().catch(function (err) {
        console.error(err.stack);
        process.exit(1);
    });
}

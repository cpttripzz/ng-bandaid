// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-09-10 using
// generator-karma 0.8.3

module.exports = function(config) {
  'use strict';

    config.set({
      // enable / disable watching file and executing tests whenever any file changes

      autoWatch: true,
      // base path, that will be used to resolve files and exclude
      basePath: '../',

      // testing framework to use (jasmine/mocha/qunit/...)
      frameworks: ['jasmine'],

      files: [
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-touch/angular-touch.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-touch/angular-touch.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/ngstorage/ngStorage.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/ngDialog/js/ngDialog.js',
        'bower_components/angular-ui-select/dist/select.js',
        'bower_components/angular-cache/dist/angular-cache.min.js',
        'bower_components/lodash/dist/lodash.compat.js',
        'bower_components/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js',
        'bower_components/angular-http-auth/src/http-auth-interceptor.js',
        'bower_components/angular-google-maps/dist/angular-google-maps.js',
        'bower_components/ngGeolocation/ngGeolocation.js',
        'bower_components/ngGeolocation/ngGeolocation.min.js',
        'bower_components/angular-ui-grid/ui-grid.js',
        'bower_components/angular-ui-date/src/date.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jquery-ui/jquery-ui.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-translate/angular-translate.js',
        'bower_components/angular-inflector/dist/angular-inflector.min.js',
        'bower_components/sinonjs/sinon.js',
        'node_modules/chai/chai.js',
        'node_modules/sinon-chai/lib/sinon-chai.js',
        'bower_components/jasmine-sinon/lib/jasmine-sinon.js',
        'app/scripts/**/*.js',
        'test/mock/**/*.js',
        'test/spec/**/*.js'
      ],


      // list of files / patterns to exclude
      exclude: [],

      // web server port
      port: 8080,

      // Start these browsers, currently available:
      // - Chrome
      // - ChromeCanary
      // - Firefox
      // - Opera
      // - Safari (only Mac)
      // - PhantomJS
      // - IE (only Windows)
      browsers: [
        'PhantomJS'
      ],

      reporters: ['progress', 'coverage'],
      preprocessors: {
        'app/scripts/**/*.js': ['coverage']
      },
      coverageReporter: {
        type: 'html',
        dir: 'coverage'
      },

      // Which plugins to enable
      plugins: [
        'karma-phantomjs-launcher',
        'karma-jasmine',
        'karma-coverage'
      ],

      // Continuous Integration mode
      // if true, it capture browsers, run tests and exit
      singleRun: false,

      colors: true,

      // level of logging
      // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
      logLevel: config.LOG_INFO,

      // Uncomment the following lines if you are using grunt's server to run the tests
      // proxies: {
      //   '/': 'http://localhost:9000/'
      // },
      // URL root prevent conflicts with the site root
      // urlRoot: '_karma_'
    });
};

'use strict';

/**
 * @ngdoc overview
 * @name bandaidApp
 * @description
 * # bandaidApp
 *
 * Main module of the application.
 */
var app = angular
  .module('bandaidApp', ['ngAnimate','ngCookies','ngResource','ngRoute','ngSanitize','ngTouch',
    'ui.bootstrap', 'dialogs.main', 'ng-token-auth', 'ngStorage','commonService'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
app.config(function ($logProvider) {
  $logProvider.debugEnabled(true);
});

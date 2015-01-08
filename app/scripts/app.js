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
    .module('bandaidApp', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch',
        'ui.bootstrap', 'dialogs.main', 'ngStorage', 'commonService','AuthService','ui.router', 'restmod'
    ])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: 'views/main.html',
                controller: 'mainCtrl'
            })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/band/:bandSlug', {
                templateUrl: 'views/band.html',
                controller: 'BandCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

    .config(function($stateProvider,$httpProvider){
        $stateProvider.state('home',{
            url:'/',
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        }).state('viewBand',{
            url:'/bands/:id/view',
            templateUrl:'views/band/view.html',
            controller:'BandViewController'
        }).state('newBand',{
            url:'/bands/new',
            templateUrl:'views/band/add.html',
            controller:'BandCreateController'
        }).state('editBand',{
            url:'/bands/:id/edit',
            templateUrl:'views/band/edit.html',
            controller:'BandEditController'
        });
    }).run(function($state){
        $state.go('home');
    })
    .config(function ($logProvider) {
        $logProvider.debugEnabled(true);
    })

    .config(['$sceDelegateProvider', 'commonServiceFactoryProvider', function ($sceDelegateProvider, commonServiceFactory) {
        var apiConfig = commonServiceFactory.$get().getApiConfig();
        $sceDelegateProvider.resourceUrlWhitelist(['self', apiConfig.baseUri + '/user/*']);
        $sceDelegateProvider.resourceUrlWhitelist(['self', apiConfig.baseUri + '/web/img/users/*']);
        $sceDelegateProvider.resourceUrlWhitelist(['self', apiConfig.baseUri + '/web/img/genres/*']);

    }])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
    })


    .config(['$httpProvider', 'commonServiceFactoryProvider', function ($httpProvider, commonServiceFactory) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        // get callable from provider
        var getFormAsParams = commonServiceFactory.$get().getFormAsParams;
        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? getFormAsParams(data) : data;
        }];
    }]);

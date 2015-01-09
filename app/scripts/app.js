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
        'ui.bootstrap', 'ngDialog', 'ngStorage', 'commonService', 'AuthService', 'ui.router', 'ModelService'
    ])


    .config(function ($stateProvider, $httpProvider) {
        var access = routingConfig.accessLevels;

        $stateProvider
            .state('anon', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    access: access.anon
                }
            })
            .state('anon.login', {
                url: '/login',
                controller: 'LoginController'
            })
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            }).state('viewBand', {
                url: '/bands/:slug/view',
                templateUrl: 'views/band/view.html',
                controller: 'BandViewController'
            });
        $stateProvider
            .state('user', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    access: access.user
                }
            })
            .state('user.userItems', {
                url: '/user/items',
                templateUrl: 'views/user-items.html',
                controller: 'UserItemController'
            })
            .state('newBand', {
                url: '/bands/new',
                templateUrl: 'views/band/add.html',
                controller: 'BandCreateController'
            })
            .state('editBand', {
                url: '/bands/:slug/edit',
                templateUrl: 'views/band/edit.html',
                controller: 'BandEditController'
            });
    }).run(function ($state) {
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
    //
    //.run(['$rootScope', '$state', 'AuthService', function ($rootScope, $state, AuthService) {
    //
    //    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    //        debugger;
    //        if (!AuthService.isAuthenticated && toState.data.access.bitMask !== 6) {
    //            $state.go('anon.login');
    //        }
    //    });
    //
    //}]);


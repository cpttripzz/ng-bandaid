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
        'ui.bootstrap', 'ui.select',  'ngDialog', 'ngStorage', 'commonService', 'AuthService', 'ui.router', 'ModelService',
        'angular-data.DSCacheFactory', 'angularjs-dropdown-multiselect', 'http-auth-interceptor','uiGmapgoogle-maps', 'ngGeolocation'
    ])

    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    })
    .config(function ($stateProvider, $httpProvider) {
        var access = routingConfig.accessLevels;

        $stateProvider
            .state('anon', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    access: access['ROLE_ANON']
                }
            })
            .state('anon.login', {
                url: '/login',
                controller: 'LoginController'
            })
            .state('anon.home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            }).state('anon.viewBand', {
                url: '/bands/:slug/view',
                templateUrl: 'views/band/view.html',
                controller: 'BandViewController',
                resolve: {
                    bandResource: 'bandResource',
                    band: function (bandResource, $stateParams) {
                        return bandResource.get({slug: $stateParams.slug}).$promise;
                    }
                }
            });
        $stateProvider
            .state('user', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    access: access['ROLE_USER']
                }
            })
            .state('user.userItems', {
                url: '/user/items',
                templateUrl: 'views/user-items.html',
                controller: 'UserItemController'
            })
            .state('user.newBand', {
                url: '/bands/new',
                templateUrl: 'views/band/add.html',
                controller: 'BandCreateController'
            })
            .state('user.editBand', {
                url: '/bands/:slug/edit',
                templateUrl: 'views/band/edit.html',
                controller: 'BandEditController',
                resolve: {
                    bandResource: 'bandResource',
                    band: function (bandResource, $stateParams) {
                        return bandResource.get({slug: $stateParams.slug}).$promise;
                    },
                    cacheService: 'cacheService',
                    genres: function(cacheService,$q){
                        var deferred = $q.defer();
                        cacheService.getStaticData('genres').then(function(data){
                            deferred.resolve(data);
                        });
                        return deferred.promise;
                    }

                }
            });
    }).run(function ($state) {
        $state.go('anon.home');
    })
    .config(function ($logProvider) {
        $logProvider.debugEnabled(true);
    })

    .config(['$sceDelegateProvider', 'commonServiceFactoryProvider', function ($sceDelegateProvider, commonServiceFactory) {
        var apiConfig = commonServiceFactory.$get().getApiConfig();
        $sceDelegateProvider.resourceUrlWhitelist(['self', apiConfig.baseUri + '/user/*']);
        $sceDelegateProvider.resourceUrlWhitelist(['self', apiConfig.baseUri + '/band/*']);
        $sceDelegateProvider.resourceUrlWhitelist(['self', apiConfig.baseUri + '/api/secure/*']);
        $sceDelegateProvider.resourceUrlWhitelist(['self', apiConfig.baseUri + '/web/img/users/*']);
        $sceDelegateProvider.resourceUrlWhitelist(['self', apiConfig.baseUri + '/web/img/genres/*']);

    }])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
    })

    .run(['$rootScope', '$state', 'userService', function ($rootScope, $state, userService) {

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if(!('data' in toState) || !('access' in toState.data)){
                $rootScope.error = "Access undefined for this state";
                event.preventDefault();
            }
            else if (!userService.authorize(toState.data.access)) {
                $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
                event.preventDefault();

                if(fromState.url === '^') {
                    if(userService.isLoggedIn()) {
                        $state.go('anon.home');
                    } else {
                        $rootScope.error = null;
                        $state.go('anon.login');
                    }
                }
            }
        });
        $rootScope.$on("userLoggedOut", function (event, toState, toParams, fromState, fromParams) {
            $state.go('anon.home');
        });
        $rootScope.$on("userLoggedIn", function (event, toState, toParams, fromState, fromParams) {
            $state.go('anon.home');
        });
        $rootScope.$on("event:auth-loginRequired", function (event, toState, toParams, fromState, fromParams) {
            $state.go('anon.login');
        });


    }]);

;
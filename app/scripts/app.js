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
        'ui.bootstrap', 'ui.select',  'ui.grid', 'ngDialog', 'ngStorage', 'commonService', 'AuthService', 'ui.router', 'ModelService',
        'angular-data.DSCacheFactory', 'angularjs-dropdown-multiselect', 'http-auth-interceptor','uiGmapgoogle-maps', 'ngGeolocation',
        'ui.date'
    ])

    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    })
    .config(function ($stateProvider, $httpProvider,$urlRouterProvider) {
        var access = routingConfig.accessLevels;

        $stateProvider
            .state('anon', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    access: access.public
                }
            })
            .state('anon.login', {
                url: '/login',
                controller: 'LoginController'
            })
            .state('anon.home', {
                url: '/home/page/:page',
                templateUrl: 'views/home.html',
                controller: 'HomeController',
                resolve: {
                    homeItemResource: 'homeItemResource',
                    homeItems: function (homeItemResource, $stateParams) {
                        return homeItemResource.get({page: $stateParams.page}).$promise;
                    }
                }
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
                    access: access.user
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
        $stateProvider
            .state('admin', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    access: access.admin
                }
            })
            .state('admin.home', {
                url: '/admin/',
                templateUrl: 'views/admin/view.html',
                controller: 'AdminController',
                resolve: {
                    adminResource: 'adminResource',
                    users: function (adminResource) {
                        return adminResource.getUsers().$promise;
                    }
                }
            });


        //$urlRouterProvider.otherwise('/404');
    }).run(function ($state) {
        $state.go('anon.home');
    })
    .config(function ($logProvider) {
        $logProvider.debugEnabled(true);
    })


    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
    })

    .run(['$rootScope', '$state', 'userService', function ($rootScope, $state, userService) {

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if(!('data' in toState) || !('access' in toState.data)){
                event.preventDefault();
            }
            else if (!userService.authorize(toState.data.access)) {
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
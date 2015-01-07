'use strict';

/**
 * @ngdoc service
 * @name bandaidApp.UserService
 * @description
 * # UserService
 * Service in the bandaidApp.
 */
angular.module('AuthService', [])
app.factory('AuthService', function () {
    var auth = {
        isAuthenticated: false
    }

    return auth;
})
    .factory('TokenInterceptor', function ($q, $sessionStorage, $location, AuthService) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($sessionStorage.user) {
                    config.headers.Authorization = 'Bearer ' + $sessionStorage.user.token;
                }
                return config;
            },

            requestError: function (rejection) {
                return $q.reject(rejection);
            },

            /* Set Authentication.isAuthenticated to true if 200 received */
            response: function (response) {
                if (response != null && response.status == 200 && $sessionStorage.user && !AuthService.isAuthenticated) {
                    AuthService.isAuthenticated = true;
                }
                return response || $q.when(response);
            },

            /* Revoke client authentication if 401 is received */
            responseError: function (rejection) {
                if (rejection != null && rejection.status === 401 && ($sessionStorage.usertoken || AuthService.isAuthenticated)) {
                    delete $sessionStorage.user.token;
                    AuthService.isAuthenticated = false;
                    $location.path("/admin/login");
                }

                return $q.reject(rejection);
            }
        };
    })


    .service('ApiService', ['$http', '$q', 'commonServiceFactory', '$sessionStorage', '$rootScope',
        function ($http, $q, commonServiceFactory, $sessionStorage, $rootScope) {
            var apiConfig = commonServiceFactory.getApiConfig();
            var url = apiConfig.baseUri + apiConfig.homePath;
            this.getHomeItems = function (lastElement,direction) {
                if(lastElement){
                    url = apiConfig.baseUri + apiConfig.homePath+'?last_element=' + lastElement
                    if(direction){
                        url = apiConfig.baseUri + apiConfig.homePath+'?last_element=' + lastElement + '&page_direction='+direction;
                    }
                }
                var deferred = $q.defer();
                try {
                    var items = {};
                    $http.get(url)
                        .then(function (result) {
                            items = result.data;
                            deferred.resolve(items);
                        }, function (error) {
                            deferred.reject(items);
                        });
                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            };

        }])

    .service('UserService', ['$http', '$q', 'commonServiceFactory', '$sessionStorage', '$rootScope',
        function ($http, $q, commonServiceFactory, $sessionStorage, $rootScope) {
            var apiConfig = commonServiceFactory.getApiConfig();
            var urlBase = apiConfig.baseUri + apiConfig.loginPath;
            var user = {};

            this.login = function (username, password) {
                var deferred = $q.defer();
                try {
                    $http.post(urlBase, {
                        username: username,
                        password: password,
                        userId: userId
                    }).then(function (result) {
                        user = {
                            token: result.data.token,
                            username: result.data.username,
                            userId: result.data.userId
                        };
                        $sessionStorage.user = user;
                        $rootScope.$broadcast('userLoggedIn', user);
                        deferred.resolve(user);
                    }, function (error) {
                        deferred.reject(error);
                    });
                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            }

        }
    ]);

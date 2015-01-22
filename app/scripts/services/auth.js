'use strict';

/**
 * @ngdoc service
 * @name bandaidApp.UserService
 * @description
 * # UserService
 * Service in the bandaidApp.
 */
angular.module('auth', [])
    .factory('authService', function () {
        var auth = {
            isAuthenticated: false
        }

        return auth;
    })

    .factory('tokenInterceptor', function ($q, $sessionStorage, $location, authService) {
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
                if (response != null && response.status == 200 && $sessionStorage.user && !authService.isAuthenticated) {
                    authService.isAuthenticated = true;
                }
                return response || $q.when(response);
            },

            /* Revoke client authentication if 401 is received */
            responseError: function (rejection) {
                if (rejection != null && rejection.status === 401 && ($sessionStorage.usertoken || authService.isAuthenticated)) {
                    delete $sessionStorage.user;
                    authService.isAuthenticated = false;
                    $location.path("/");
                }

                return $q.reject(rejection);
            }
        };
    })

    .factory('userService', function ($http, $q, commonServiceFactory, $sessionStorage, $rootScope, authService, userResource) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var urlBase = apiConfig.baseUri + apiConfig.loginPath;
        var user = {};
        var accessLevels = routingConfig.accessLevels;
        var userRoles = routingConfig.userRoles;
        var currentUser = $sessionStorage.user || {username: '', role: userRoles.ROLE_ANON};

        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        return {
            authorize: function (accessLevel, role) {
                if (role === undefined) {
                    role = currentUser.role;
                }

                return accessLevel.bitMask & role.bitMask;
            },
            isLoggedIn: function (user) {
                if (user === undefined) {
                    user = currentUser;
                }
                return user.role.title === userRoles['ROLE_USER'].title || user.role.title === userRoles['ROLE_ADMIN'].title;
            },
            //register: function(user, success, error) {
            //    $http.post('/register', user).success(function(res) {
            //        changeUser(res);
            //        success();
            //    }).error(error);
            //},
            login: function (username, password) {
                var deferred = $q.defer();
                try {
                    $http.post(urlBase, {
                        username: username,
                        password: password

                    }).then(function (result) {
                        if (!result.data.username) {
                            deferred.reject(result);
                        } else {
                            user = {
                                token: result.data.token,
                                username: result.data.username,
                                userId: result.data.userId,
                                role: userRoles[result.data.roles[0]]
                            };
                            $sessionStorage.user = user;
                            changeUser(user);
                            authService.loginConfirmed('success', function (config) {
                                config.ignoreAuthModule = false;
                                return config;
                            });
                            $rootScope.$broadcast('userLoggedIn', user);
                            deferred.resolve(user);
                        }
                    }, function (error) {
                        deferred.reject(error);
                    });
                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            },
            logout: function (success, error) {
                changeUser({
                    username: '',
                    role: userRoles.ROLE_ANON
                });
            },
            checkUserNameOrEmailAvailable: function (field, value) {
                return userResource.checkUserNameOrEmailAvailable({field: field, value: value}).$promise;
            },
            register: function (username, email, password) {
                var deferred = $q.defer();
                try {
                    var user = new userResource;
                    user.username = username;
                    user.email = email;
                    user.password = password;
                    user.$save().then(function (result) {
                        if (!result.username) {
                            deferred.reject(result);
                        } else {
                            deferred.resolve(result);
                        }
                    }, function (error) {
                        deferred.reject(error);
                    });
                } catch (e) {
                    deferred.reject(e);
                }
                return deferred.promise;
            },
            accessLevels: accessLevels,
            userRoles: userRoles,
            user: currentUser
        };
    });


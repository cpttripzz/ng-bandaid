'use strict';

/**
 * @ngdoc service
 * @name bandaidApp.Authservice
 * @description
 * # Authservice
 * Service in the bandaidApp.
 */

app.service('authService', ['$http', '$q', 'commonServiceFactory', '$sessionStorage', '$rootScope',
    function ($http, $q, commonServiceFactory, $sessionStorage, $rootScope) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var urlBase = apiConfig.baseUri + apiConfig.loginPath;
        var user = {};
        this.login = function (email, password) {
            var deferred = $q.defer();
            try {
                $http.post(urlBase, {
                    email: email,
                    password: password
                }).then(function (result) {
                    user = {
                        token: result.data.user.token,
                        email: result.data.user.email
                    };
                    $sessionStorage.user = user;
                    $rootScope.$broadcast('userLoggedIn', user);
                    deferred.resolve(user);
                }, function (error) {
                    deferred.reject(error);
                });
            } catch (e){
                deferred.reject(e);
            }
            return deferred.promise;
        }

    }
]);

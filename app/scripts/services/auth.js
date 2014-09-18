'use strict';

/**
 * @ngdoc service
 * @name bandaidApp.Authservice
 * @description
 * # Authservice
 * Service in the bandaidApp.
 */

app.service('authService', ['$http', '$q', 'commonService', function ($http,$q) {
    debugger;
    //var apiConfig = commonService.APIConfig();
    //var urlBase = apiConfig.baseUri + '/' + apiConfig.loginPath;
    var userInfo ={};
    this.login = function (userName, password) {
      var deferred = $q.defer();

      $http.post(apiConfig.loginPath, {
        userName: userName,
        password: password
      }).then(function (result) {
        userInfo = {
          accessToken: result.token,
          userName: result.email
        };
        //$sessionStorage.deferred.resolve(userInfo);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

  }
]);

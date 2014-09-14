'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:mainCtrl
 * @description
 * # MainCtrl
 * Controller of the bandaidApp
 */
app.controller('mainCtrl', function ($scope, $rootScope,$sessionStorage) {

      $scope.$storage = $sessionStorage;
      if( typeof $scope.$storage.user != 'undefined'){
        $scope.user = {
          email: $scope.$storage.user.email
          };
      } else {
        $scope.user = {
          email: ''
        };
      }



  });

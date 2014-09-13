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
      $scope.user = $scope.$storage.user;


  });

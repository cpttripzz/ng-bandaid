'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:DialogController
 * @description
 * # DialogController
 * Controller of the bandaidApp
 */

app.controller('DialogController', function ($scope, $rootScope,$sessionStorage) {

  $scope.logout = function () {
    $scope.$storage = $sessionStorage;
    delete $scope.$storage.user;
    delete $scope.user;
    $rootScope.$broadcast('userLoggedOut');
  };
});
'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:DialogCtrl
 * @description
 * # DialogCtrl
 * Controller of the bandaidApp
 */

app.controller('dialogCtrl', function ($scope, $rootScope,dialogs,$sessionStorage) {
  $scope.launch = function (which) {
    switch (which) {
      case 'error':
        dialogs.error();
        break;
      case 'login':
        dialogs.create('dialogs/login.html', 'userDialogCtrl', {}, 'lg');
        break;
    }
  }; // end launch
  $scope.logout = function () {
    $scope.$storage = $sessionStorage;
    delete $scope.$storage.user;
    delete $scope.user;
  };
});
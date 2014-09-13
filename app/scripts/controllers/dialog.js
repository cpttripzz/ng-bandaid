'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:DialogCtrl
 * @description
 * # DialogCtrl
 * Controller of the bandaidApp
 */

app.controller('dialogCtrl', function ($scope, dialogs) {
  $scope.launch = function (which) {
    switch (which) {
      case 'error':
        dialogs.error();
        break;
      case 'login':
        var dlg = dialogs.create('dialogs/login.html', 'userDialogCtrl', {}, 'lg');
        break;
    }
  }; // end launch

});
'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:userCtrl
 * @description
 * # DialogController
 * Controller of the bandaidApp
 */
app
    .controller('UserItemController', function ($scope, $stateParams, UserItem) {
        $scope.userItems = {};
        UserItem.get().$promise.then(function (userItems) {
            $scope.userItems = userItems.bands;
        });

    })
    .controller('LoginController', function ($scope, $rootScope, ngDialog, UserService) {
        ngDialog.open({
            template: 'views/dialogs/login.html',
            controller: 'UserDialogController'
        });
    })
    .controller('UserDialogController', function ($scope, $rootScope, ngDialog, UserService,$state) {


        $scope.loginForm = {};
        $scope.submitLogin = function (loginForm) {
            UserService.login($scope.loginForm.username, $scope.loginForm.password).then(function () {
                    ngDialog.close();
                    $state.go('user.userItems');
                },
                function (error) {
                    $scope.loginForm.errors = error.data.reasons;
                }
            );
        }


    })

    ;
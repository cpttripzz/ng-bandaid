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
    .controller('LoginController', function ($scope, $rootScope, ngDialog, userService) {
        ngDialog.open({
            template: 'views/dialogs/login.html',
            controller: 'UserDialogController'
        });
    })
    .controller('UserDialogController', function ($scope, $rootScope, ngDialog, userService) {

        $scope.cancel = function () {
            ngDialog.close();
        }; // end cancel

        $scope.hitEnter = function (evt) {
            if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.username, null) || angular.equals($scope.username, ''))) {
                $scope.save();
            }
        };

        $scope.loginForm = {};
        $scope.submitLogin = function (loginForm) {
            userService.login($scope.loginForm.username, $scope.loginForm.password).then(function () {
                    ngDialog.close();
                },
                function (error) {
                    $scope.loginForm.errors = error.data.reasons;
                }
            );
        }


    })

    ;
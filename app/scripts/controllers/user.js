'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:userCtrl
 * @description
 * # DialogController
 * Controller of the bandaidApp
 */
app
    .controller('UserItemController', function ($scope, $stateParams, UserItem, commonServiceFactory) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var imgPath = apiConfig.imgPath;
        var thumbPath = apiConfig.thumbPath;
        $scope.bandPath = apiConfig.baseUri + '/band';
        $scope.userImgPath = imgPath + '/users';

        $scope.items = {};
        UserItem.get().$promise.then(function (userItems) {
            $scope.items = userItems.bands;
        });

    })
    .controller('LoginController', function ($scope, $rootScope, ngDialog, userService) {
        ngDialog.open({
            template: 'views/dialogs/login.html',
            controller: 'UserDialogController'
        });
    })
    .controller('UserDialogController', function ($scope, $rootScope, ngDialog, userService,alertService) {

        $scope.cancel = function () {
            ngDialog.close();
        }; // end cancel

        $scope.hitEnter = function (evt) {
            if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.username, null) || angular.equals($scope.username, ''))) {
                $scope.save();
            }
        };

        $scope.submitLogin = function (loginForm) {
            userService.login(loginForm.username.$modelValue, loginForm.password.$modelValue).then(function () {
                    ngDialog.close();
                },
                function (error) {
                    $scope.loginForm.errors = error.data.message;
                }
            );
        };
        $scope.submitRegistration = function (loginForm) {
            userService.register(loginForm.username.$modelValue,loginForm.email.$modelValue, loginForm.password.$modelValue).then(function (data) {
                alertService.addAlert({ type: 'success', msg: 'User Successfully Created.' },true);
                ngDialog.close();
            });
        };
        $scope.showRegisterEmailField = false;
        $scope.showRegister = function (){
            $scope.showRegisterEmailField = true;
        };
    })

;
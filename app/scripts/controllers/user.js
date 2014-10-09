'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:userCtrl
 * @description
 * # dialogCtrl
 * Controller of the bandaidApp
 */
app.controller('userDialogCtrl', function ($scope, $rootScope, $modalInstance, UserService) {

    //-- Methods --//

    $scope.cancel = function () {
        $modalInstance.dismiss('Canceled');
    }; // end cancel

    $scope.save = function () {

    }; // end save

    $scope.hitEnter = function (evt) {
        if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.user.name, null) || angular.equals($scope.user.name, ''))) {
            $scope.save();
        }
    };
    $scope.loginForm = {};
    $scope.submitLogin = function (loginForm) {
        UserService.login($scope.loginForm.email, $scope.loginForm.password).then(function () {
            $modalInstance.close();
        },
           function (error) {
               $scope.loginForm.errors = error.data.reasons;
            }
        );
    }


})

    .config(['dialogsProvider', function (dialogsProvider) {
        dialogsProvider.useBackdrop('static');
        dialogsProvider.useEscClose(true);
        dialogsProvider.useCopy(true);
        dialogsProvider.setSize('sm');
    }])

    .run(['$templateCache', function ($templateCache) {
        $templateCache.put('views/dialogs/login.html', '' +
        '<div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">×</button> <h4 class="modal-title">Login</h4> </div> ' +
        '<div class="modal-body"> <form novalidate ng-submit="submitLogin(loginForm)"> ' +
        '<div class="form-group"  ng-class="{ \'has-error\' : loginForm.email.$invalid }"><label>Email</label>' +
        '   <input type="email" name="email" ng-model="loginForm.email" required="required" class="form-control"/> ' +
        '   <p ng-show="loginForm.email.$invalid" class="help-block">Enter a valid email.</p>' +
        '   <span class="help-block" ng-show="loginForm.email.$error.required">Required</span>' +
        '<div class="form-group"> <label>password</label> <input type="password" name="password" ng-model="loginForm.password" required="required" class="form-control"/></div>' +

        '<button  ng-disabled="loginForm.$invalid" type="submit" class="btn btn-primary btn-lg">Sign in</button> ' +
        '<div ng-model="loginForm.errors">{{loginForm.errors}}</div></form>  </div> ');
    }]);
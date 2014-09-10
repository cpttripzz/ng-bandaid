'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:dialogCtrl
 * @description
 * # dialogCtrl
 * Controller of the bandaidApp
 */
angular.module('bandaidApp',['ui.bootstrap','dialogs.main'])
    .controller('dialogCtrl',function($scope,$rootScope,dialogs){
        $scope.launch = function(which){
            switch(which){
                case 'error':
                    dialogs.error();
                    break;
                case 'login':
                    var dlg = dialogs.create('dialogs/login.html','loginDialogCtrl',{},'lg');
                    dlg.result.then(function(name){
                        $scope.name = name;
                    },function(){
                        if(angular.equals($scope.name,'')) {
                            $scope.name = 'You did not enter in your name!';
                        }
                    });
                    break;
            }
        }; // end launch
  })
    .controller('loginDialogCtrl',function($scope,$modalInstance){
        //-- Variables --//

        $scope.user = {name : ''};

        //-- Methods --//

        $scope.cancel = function(){
            $modalInstance.dismiss('Canceled');
        }; // end cancel

        $scope.save = function(){
            $modalInstance.close($scope.user.name);
        }; // end save

        $scope.hitEnter = function(evt){
            if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.user.name,null) || angular.equals($scope.user.name,''))) {
                $scope.save();
            }
        };
    })

.config(['dialogsProvider',function(dialogsProvider){
    dialogsProvider.useBackdrop('static');
    dialogsProvider.useEscClose(false);
    dialogsProvider.useCopy(false);
    dialogsProvider.setSize('sm');
}])

    .run(['$templateCache',function($templateCache){
        $templateCache.put('dialogs/login.html','<div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">×</button> <h4 class="modal-title">Login</h4> </div> <div class="modal-body"> <div class="error"> </div> <input type="hidden" name="_csrf_token" value="DStNK8872aZ9HrZ-OZdNIqtTL1-uUgQUu3xPHGT_cIA"> <div class="form-group container"> <label for="email">Username</label> <input type="text" id="username" name="_username" value="" required="required" placeholder="adresse@email.com"> </div> <div class="form-group container"> <label for="password">Password</label><br> <input type="password" id="password" name="_password" required="required" placeholder="********"> </div> <div class="form-group container"> <label for="remember_me"> <input type="checkbox" id="remember_me" name="_remember_me" value="on"> Remember Me </label> </div> </div> <p class="text-right"><a class="btn btn-facebook btn-width-200" id="btn-register">Register</a></p> <p class="text-right"><a href="#">Forgot password?</a></p> <div id="btn-facebook" class="btn btn-facebook btn-width-200"><i class="fa fa-facebook"></i> | Connect with Facebook </div> <div id="btn-google-plus" class="btn btn-google-plus btn-width-200"><i class="fa fa-google-plus"></i> | Connect with Google + </div> <div id="btn-twiter" class="btn btn-twitter btn-width-200"><i class="fa fa-twitter"></i> | Connect with Twitter </div> <div id="btn-github" class="btn btn-github btn-width-200"><i class="fa fa-github"></i> | Connect with Github </div> <div class="modal-footer"> <a href="#" data-dismiss="modal" class="btn" ng-click="cancel()">Close</a> <input type="submit" id="_submit" name="_submit" value="Login"> </div>');
    }]);
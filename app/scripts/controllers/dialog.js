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
        $templateCache.put('dialogs/login.html','<div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> User\'s Name</h4></div><div class="modal-body"><ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]"><label class="control-label" for="course">Name:</label><input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required><span class="help-block">Enter your full name, first &amp; last.</span></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button><button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button></div>');
    }]);
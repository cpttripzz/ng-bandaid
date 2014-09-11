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
    .controller('loginDialogCtrl',function($scope,$modalInstance,$http){
        //-- Variables --//

        $scope.user = {name : ''};

        //-- Methods --//

        $scope.cancel = function(){
            $modalInstance.dismiss('Canceled');
        }; // end cancel

        $scope.doLogin= function () {
          debugger;
          var loginPromise = $http.post('http://api.bandaid.com/user/login', this.login);

        };

    $scope.save = function(){
            $modalInstance.close($scope.user.name);
        }; // end save

        $scope.hitEnter = function(evt){
            if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.user.name,null) || angular.equals($scope.user.name,''))) {
                $scope.save();
            }
        };
    })
  .config(['$sceDelegateProvider', function($sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://api.bandaid.com/user/login']);

  }])

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function(obj) {
      var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

      for(name in obj) {
        value = obj[name];

        if(value instanceof Array) {
          for(i=0; i<value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value instanceof Object) {
          for(subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value !== undefined && value !== null)
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }

      return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
  }])

  .config(['dialogsProvider',function(dialogsProvider){
    dialogsProvider.useBackdrop('static');
    dialogsProvider.useEscClose(false);
    dialogsProvider.useCopy(false);
    dialogsProvider.setSize('sm');
}])

    .run(['$templateCache',function($templateCache){
        $templateCache.put('dialogs/login.html','<div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">×</button> <h4 class="modal-title">Login</h4> </div> <div class="modal-body"> <form  name="loginForm" role="login" ng-submit="doLogin()"> <div class="form-group"> <input type="text" class="form-control" ng-model="login.username" name="username" placeholder="Username"/> </div> <div class="form-group"> <input type="password" class="form-control" ng-model="login.password" name="password" placeholder="Password"/> </div> <button type="submit" class="btn btn-default hidden-devices">Login <i class="fa fa-sign-in"></i></button> </form> <div class="error"></div> </div> ');
    }]);
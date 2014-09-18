'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:userCtrl
 * @description
 * # dialogCtrl
 * Controller of the bandaidApp
 */
app.controller('userDialogCtrl', function ($scope, $rootScope, $modalInstance) {

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



})

  .config(['$sceDelegateProvider', 'commonServiceFactoryProvider', function ($sceDelegateProvider, commonServiceFactory) {
    var apiConfig = commonServiceFactory.$get().getApiConfig();
    $sceDelegateProvider.resourceUrlWhitelist(['self', apiConfig.baseUri + '/user/*']);
  }])

  .config(['$httpProvider', 'commonServiceFactoryProvider', function ($httpProvider, commonServiceFactory) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // get callable from provider
    var getFormAsParams = commonServiceFactory.$get().getFormAsParams();
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? getFormAsParams(data) : data;
    }];
  }])

  .config(['dialogsProvider', function (dialogsProvider) {
    dialogsProvider.useBackdrop('static');
    dialogsProvider.useEscClose(true);
    dialogsProvider.useCopy(true);
    dialogsProvider.setSize('sm');
  }])

  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('dialogs/login.html', '<div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">×</button> <h4 class="modal-title">Login</h4> </div> <div class="modal-body"> <form ng-submit="submitLogin(loginForm)" role="form" ng-init="loginForm = {}"> <div class="form-group"> <label>email</label> <input type="email" name="email" ng-model="loginForm.email" required="required" class="form-control"/> </div> <div class="form-group"> <label>password</label> <input type="password" name="password" ng-model="loginForm.password" required="required" class="form-control"/> </div> <button type="submit" class="btn btn-primary btn-lg">Sign in</button> </form> <div class="error"></div> </div> ');
  }]);
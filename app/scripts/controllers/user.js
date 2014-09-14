'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:userCtrl
 * @description
 * # dialogCtrl
 * Controller of the bandaidApp
 */
app

  .config(function ($authProvider,APIConfigProvider) {

    // the following shows the default values. values passed to this method
    // will extend the defaults using angular.extend
    var apiConfig = APIConfigProvider.$get[0]();
    apiConfig = apiConfig();
    $authProvider.configure({
      apiUrl: apiConfig.baseUri,
      tokenValidationPath: '/auth/validate_token',
      signOutUrl: apiConfig.logoutPath,
      emailRegistrationPath: '/auth',
      accountUpdatePath: '/auth',
      accountDeletePath: '/auth',
      confirmationSuccessUrl: window.location.href,
      passwordResetPath: '/auth/password',
      passwordUpdatePath: '/auth/password',
      passwordResetSuccessUrl: window.location.href,
      emailSignInPath: apiConfig.loginPath,
      storage: 'cookies',
      proxyIf: function () {
        return false;
      },
      proxyUrl: '/proxy',
      authProviderPaths: {
        github: '/auth/github',
        facebook: '/auth/facebook',
        google: '/auth/google'
      },
      tokenFormat: {
        "access-token": "{{ token }}",
        "token-type": "Bearer",
        "client": "{{ clientId }}",
        "expiry": "{{ expiry }}",
        "uid": "{{ uid }}"
      },
      parseExpiry: function (headers) {
        // convert from UTC ruby (seconds) to UTC js (milliseconds)
        return (parseInt(headers['expiry']) * 1000) || null;
      },
      handleLoginResponse: function (response) {
        return response.user;
      },
      handleAccountResponse: function (response) {
        return response.data;
      },
      handleTokenValidationResponse: function (response) {
        return response.data;
      }
    });
  })

  .controller('userDialogCtrl', function ($scope, $rootScope,$modalInstance, $http,$auth,$sessionStorage) {

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
    $rootScope.$on('auth:login-success', function(ev, user) {
      $scope.$storage = $sessionStorage;
      $scope.$storage.user = user;
      if( typeof $scope.$storage.user != 'undefined'){
        $scope.user = {
          email: $scope.$storage.user.email
        };
      } else {
        $scope.user = {
          email: ''
        };
      }

      $modalInstance.close();
      $rootScope.$broadcast('userLoggedIn', user);
    });

    $rootScope.$on('auth:logout-success', function(ev) {
      debugger;
      $scope.$storage = $sessionStorage;
    });
  })

  .config(['$sceDelegateProvider','APIConfigProvider', function ($sceDelegateProvider, APIConfig) {
    var apiConfig = APIConfig.$get[0]();
    apiConfig = apiConfig();
    $sceDelegateProvider.resourceUrlWhitelist(['self', apiConfig.baseUri+'/user/*']);
  }])

  .config(['$httpProvider', 'getFormAsParamsProvider', function ($httpProvider, getFormAsParams) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // get callable from provider
    var getFormAsParams = getFormAsParams.$get[0]();
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? getFormAsParams(data) : data;
    }];
  }])

  .config(['dialogsProvider', function (dialogsProvider) {
    dialogsProvider.useBackdrop('static');
    dialogsProvider.useEscClose(false);
    dialogsProvider.useCopy(false);
    dialogsProvider.setSize('sm');
  }])

  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('dialogs/login.html', '<div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">×</button> <h4 class="modal-title">Login</h4> </div> <div class="modal-body"> <form ng-submit="submitLogin(loginForm)" role="form" ng-init="loginForm = {}"> <div class="form-group"> <label>email</label> <input type="email" name="email" ng-model="loginForm.email" required="required" class="form-control"/> </div> <div class="form-group"> <label>password</label> <input type="password" name="password" ng-model="loginForm.password" required="required" class="form-control"/> </div> <button type="submit" class="btn btn-primary btn-lg">Sign in</button> </form> <div class="error"></div> </div> ');
  }]);
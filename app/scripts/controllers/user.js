'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:userCtrl
 * @description
 * # dialogCtrl
 * Controller of the bandaidApp
 */
angular.module('bandaidApp', ['ui.bootstrap', 'dialogs.main', 'ng-token-auth', 'commonService'])

  .config(function ($authProvider) {

    // the following shows the default values. values passed to this method
    // will extend the defaults using angular.extend

    $authProvider.configure({
      apiUrl: 'http://api.bandaid.com',
      tokenValidationPath: '/auth/validate_token',
      signOutUrl: '/auth/logout',
      emailRegistrationPath: '/auth',
      accountUpdatePath: '/auth',
      accountDeletePath: '/auth',
      confirmationSuccessUrl: window.location.href,
      passwordResetPath: '/auth/password',
      passwordUpdatePath: '/auth/password',
      passwordResetSuccessUrl: window.location.href,
      emailSignInPath: '/user/login',
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
        return response.data;
      },
      handleAccountResponse: function (response) {
        return response.data;
      },
      handleTokenValidationResponse: function (response) {
        return response.data;
      }
    });
  })
  .controller('dialogCtrl', function ($scope, $rootScope, dialogs) {
    $scope.launch = function (which) {
      switch (which) {
        case 'error':
          dialogs.error();
          break;
        case 'login':
          var dlg = dialogs.create('dialogs/login.html', 'loginDialogCtrl', {}, 'lg');
          dlg.result.then(function (name) {
            $scope.name = name;
          }, function () {
            if (angular.equals($scope.name, '')) {
              $scope.name = 'You did not enter in your name!';
            }
          });
          break;
      }
    }; // end launch
  })

  .controller('loginDialogCtrl', function ($scope, $modalInstance, $http) {
    //-- Variables --//

    $scope.user = {name: ''};

    //-- Methods --//

    $scope.cancel = function () {
      $modalInstance.dismiss('Canceled');
    }; // end cancel

    $scope.save = function () {
      $modalInstance.close($scope.user.name);
    }; // end save

    $scope.hitEnter = function (evt) {
      if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.user.name, null) || angular.equals($scope.user.name, ''))) {
        $scope.save();
      }
    };
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
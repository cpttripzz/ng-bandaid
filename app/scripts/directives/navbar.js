'use strict';

/**
 * @ngdoc directive
 * @name bandaidApp.directive:header
 * @description
 * # header
 */
angular.module('bandaidApp')
  .directive('navbar', function () {
    return {
      templateUrl: '../../views/navbar.html',
      replace: 'true',
      restrict: 'E',
      scope: {
        doLogin: '&onLogin',
        doLogout: '&onLogout',
        email: '='
      },
      link: function(scope, element, attrs, tabsCtrl) {
        scope.$watch('email', function(newValue) {
          console.log(newValue);
        });
        attrs.$observe("email", function (newValue) {
          console.log(newValue);
        });
      }

    }
  })
;

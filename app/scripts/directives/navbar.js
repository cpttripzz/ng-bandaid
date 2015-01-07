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
        username: '='
      },
      link: function (scope,elem, attrs) {
        var e = elem;
        var a =attrs;
        scope.$on('userLoggedIn', function(event,args){
          scope.username = args.username;
        });
        scope.$on('userLoggedOut', function(event){
            scope.username = false;
        });
      }
    }
  });

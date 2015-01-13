'use strict';

/**
 * @ngdoc directive
 * @name bandaidApp.directive:header
 * @description
 * # header
 */
app.directive('navbar', function () {
    return {
      templateUrl: '/scripts/directives/templates/navbar.html',
      replace: 'true',
      restrict: 'E',
      controller: function($scope, $sessionStorage, $rootScope){
        $scope.logout = function () {
          $scope.$storage = $sessionStorage;
          delete $scope.$storage.user;
          delete $scope.user;
          $rootScope.$broadcast('userLoggedOut');
        };
      },
      scope: {
        logout: '&',
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

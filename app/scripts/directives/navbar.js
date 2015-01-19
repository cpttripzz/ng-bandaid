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
          delete $sessionStorage.user;
          delete $scope.user;
          $rootScope.$broadcast('userLoggedOut');
        };
      },
      scope: {
        logout: '&',
        user: '='

      },
      link: function (scope,elem, attrs) {
        var e = elem;
        var a =attrs;
        scope.$on('userLoggedIn', function(event,user){
          scope.user = user;
          scope.user.admin = user.role.title === 'ROLE_ADMIN'
        });
        scope.$on('userLoggedOut', function(event){
            scope.username = false;
        });
      }
    }
  });

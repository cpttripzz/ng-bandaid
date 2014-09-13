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
      scope: false,
      replace: 'true',
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.$watch('user', function() {
          console.log(scope.$storage);
        });
      }
    };
  });

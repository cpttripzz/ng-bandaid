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
      scope: true,
      replace: 'true',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });

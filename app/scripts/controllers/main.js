'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bandaidApp
 */
angular.module('bandaidApp')

  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
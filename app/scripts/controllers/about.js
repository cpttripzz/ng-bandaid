'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bandaidApp
 */
angular.module('bandaidApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

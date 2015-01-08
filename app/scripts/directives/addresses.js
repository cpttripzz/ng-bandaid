'use strict';

/**
 * @ngdoc directive
 * @name bandaidApp.directive:header
 * @description
 * # header
 */
angular.module('bandaidApp')
.directive('addresses', ['commonServiceFactory', function (commonServiceFactory) {
    return {
        restrict: 'E',
        scope: { 'addresses': '=data' },
        templateUrl: "/scripts/directives/templates/addresses.html",
        link: function (scope, element, attrs) {
            var apiConfig = commonServiceFactory.getApiConfig();
            var imgPath = apiConfig.imgPath;
            var flagImgPath = imgPath + '/flags/';
            scope.flagImgPath  = flagImgPath ;
        }
    };
}]);

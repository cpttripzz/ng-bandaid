'use strict';

/**
 * @ngdoc directive
 * @name bandaidApp.directive:header
 * @description
 * # header
 */
angular.module('bandaidApp')
.directive('genres', ['commonServiceFactory', function (commonServiceFactory) {
    return {
        restrict: 'E',
        scope: { 'genres': '=data' },
        templateUrl : "/scripts/directives/templates/genres.html",
        link: function (scope, element, attrs) {
            var apiConfig = commonServiceFactory.getApiConfig();
            var thumbPath = apiConfig.thumbPath;
            var genreImgPath = thumbPath + '/genres/';
            scope.genreImgPath = genreImgPath;
        }
    };
}]);
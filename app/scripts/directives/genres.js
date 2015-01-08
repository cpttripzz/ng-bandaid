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
        templateUrl : "/scripts/directives/templates/genres.tpl.html",
        controller: function($scope, $element, commonServiceFactory ){
            $scope.getGenreImgPath = function() {
                var apiConfig = commonServiceFactory.getApiConfig();
                var thumbPath = apiConfig.thumbPath;
                var genreImgPath = thumbPath + '/genres/';
                return genreImgPath + this.genre.slug + ".jpg"
            }
        }
    };
}]);
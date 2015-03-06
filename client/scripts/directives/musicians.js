'use strict';

/**
 * @ngdoc directive
 * @name bandaidApp.directive:header
 * @description
 * # header
 */
app.directive('musicians', function (commonServiceFactory) {
    return {
        restrict: 'E',
        scope: { 'musicians': '=data' },
        templateUrl : "/scripts/directives/templates/musicians.tpl.html",

        controller: function($scope, $element, commonServiceFactory ){
            $scope.getAssocSmallImgPath = function() {
                var apiConfig = commonServiceFactory.getApiConfig();
                var musicianImgUrl =  apiConfig.assocSmallImgPath;
                return musicianImgUrl + this.musician.documents[0].path;
            }
        }
    };
});
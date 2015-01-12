'use strict';

/**
 * @ngdoc directive
 * @name bandaidApp.directive:header
 * @description
 * # header
 */
app.directive('addresses', ['commonServiceFactory', function (commonServiceFactory) {
    return {
        restrict: 'E',
        scope: {
            'addresses': '=data',
            'showText': '=showText'


        },
        templateUrl: "/scripts/directives/templates/addresses.tpl.html",
        link: function (scope, element, attrs) {


        },
        controller: function($scope, $element, commonServiceFactory ){
            $scope.getFlagImgPath = function() {
                var apiConfig = commonServiceFactory.getApiConfig();
                var imgPath = apiConfig.imgPath;
                var flagImgPath = imgPath + '/flags/';

                return flagImgPath + this.address.city.country.code.toLowerCase() + ".png"
            }
            $scope.getAddressText = function() {
                if(!$scope.showText){
                    return;
                }
                return commonServiceFactory.getAddressText(this.address);
            }
        }

    };
}]);

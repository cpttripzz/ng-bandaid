'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the bandaidApp
 */
app.controller('BandCtrl', function ($scope, ApiService, commonServiceFactory,$routeParams) {
    var apiConfig = commonServiceFactory.getApiConfig();
    var imgPath = apiConfig.baseUri + apiConfig.imgPath;
    $scope.bandPath = apiConfig.baseUri + '/band';
    $scope.userImgPath = imgPath + '/users';
    $scope.genreImgPath = imgPath + '/genres';
    $scope.flagImgPath = imgPath + '/flags';
    $scope.bandSlug = $routeParams.bandSlug;
    ApiService.getBand($scope.bandSlug).then(function (items) {
            $scope.items = items.data;

        },
        function (error) {
            console.log(error);
        }
    );

});

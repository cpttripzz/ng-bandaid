'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the bandaidApp
 */
app.controller('HomeCtrl', function ($scope,ApiService,commonServiceFactory) {
    var apiConfig = commonServiceFactory.getApiConfig();
    var imgPath = apiConfig.baseUri + apiConfig.imgPath;
    $scope.userImgPath = imgPath + '/users';
    $scope.genreImgPath = imgPath + '/genres';
    $scope.flagImgPath = imgPath + '/flags';
    ApiService.getHomeItems().then(function (items) {
            $scope.items = items;
        },
        function (error) {
            console.log(error);
        }
    );

});

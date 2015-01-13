'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the bandaidApp
 */
app.controller('HomeController', function ($scope, ApiService, commonServiceFactory) {
    var apiConfig = commonServiceFactory.getApiConfig();
    var imgPath = apiConfig.imgPath;
    var thumbPath = apiConfig.thumbPath;
    $scope.bandPath = apiConfig.baseUri + '/band';
    $scope.userImgPath = imgPath + '/users';
    $scope.genreImgPath = thumbPath + '/genres';
    $scope.flagImgPath = imgPath + '/flags';
    $scope.maxSize = 5;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 16;
    ApiService.getHomeItems().then(function (items) {
            $scope.items = items.bands;
            $scope.totalItems = items.length;
        },
        function (error) {
            console.log(error);
        }
    );


    $scope.pageChanged = function () {
        ApiService.getHomeItems($scope.currentPage).then(function (items) {
                $scope.items = items.bands;
                $scope.totalItems = items.meta.total;
            },
            function (error) {
                console.log(error);
            }
        );

        console.log('Page changed to: ' + $scope.currentPage);
    };


});

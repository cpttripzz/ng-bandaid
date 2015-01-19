'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the bandaidApp
 */
app.controller('HomeController', function ($scope, commonServiceFactory, $location, homeItems,$stateParams) {
    var apiConfig = commonServiceFactory.getApiConfig();
    var imgPath = apiConfig.imgPath;
    var thumbPath = apiConfig.thumbPath;
    $scope.bandPath = apiConfig.baseUri + '/band';
    $scope.userImgPath = imgPath + '/users';
    $scope.genreImgPath = thumbPath + '/genres';
    $scope.flagImgPath = imgPath + '/flags';
    $scope.maxSize = 5;
    if(typeof $stateParams.page==='undefined') {
        $scope.currentPage = 1;
    } else {
        $scope.currentPage = $stateParams.page;
    }
    $scope.itemsPerPage = 16;
    $scope.items = homeItems.bands;
    $scope.totalItems = homeItems.meta.total;

    $scope.pageChanged = function () {
        $location.url('/home/page/' + $scope.currentPage);
        console.log('Page changed to: ' + $scope.currentPage);
    };


});

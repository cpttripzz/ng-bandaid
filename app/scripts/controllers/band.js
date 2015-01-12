'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the bandaidApp
 */
app.controller('BandViewController', function ($scope, $stateParams, band) {
    $scope.band = band.band[0];


})
    .controller('BandEditController',  function ($scope, $stateParams, commonServiceFactory, band, genres) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var thumbPath = apiConfig.thumbPath;
        $scope.genreImgPath = thumbPath + '/genres/';
        $scope.availableGenres = genres;
        $scope.band = band;
        $scope.updateBand = function () {
            var id = $scope.band.id;

            band.$update({ id:id }, $scope.band);

       }
    })
;

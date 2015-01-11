'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the bandaidApp
 */
app.controller('BandViewController', function ($scope, ApiService, $stateParams, commonServiceFactory, Band) {
    $scope.band = {};
    Band.get({slug: $stateParams.slug}).$promise.then(function (band) {
        $scope.band = band.band[0];
    });
})
    .controller('BandEditController', function ($scope, ApiService, $stateParams, commonServiceFactory, Band) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var thumbPath = apiConfig.thumbPath;
        $scope.genreImgPath = thumbPath + '/genres/';
        $scope.band = {};
        $scope.bandResource = Band.get({slug: $stateParams.slug});
        $scope.bandResource.$promise.then(function (band) {
            $scope.availableGenres = band.genres;
            $scope.band = band.band[0];
            for (var i = 0; i < $scope.availableGenres.length; i++) {
                $scope.availableGenres[i].selected = false;
            }
            for (var i = 0; i < $scope.band.genres.length; i++) {
                var index = commonServiceFactory.findArrayIndexWithAttr($scope.availableGenres, 'id', $scope.band.genres[i].id);
                $scope.availableGenres[index].selected = true;
            }

        });

        $scope.updateBand = function () {
            var id = $scope.band.id;
            console.log($scope.bandResource);
            Band.update({ id:id },$scope.bandResource).then(function () {

                $state.go('user.userItems');
                // success !!
            })
                .catch(function (x) {
                    // error !!
                });
        }
    })
;

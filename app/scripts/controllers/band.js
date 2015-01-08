'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the bandaidApp
 */
app.controller('BandViewController', function ($scope, ApiService, $stateParams,commonServiceFactory,Band) {
    $scope.band = {};
    Band.get({slug:$stateParams.slug}).$promise.then(function (band) {
        $scope.band = band.band[0];
    });

});

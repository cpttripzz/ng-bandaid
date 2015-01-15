'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:mainCtrl
 * @description
 * # MainCtrl
 * Controller of the bandaidApp
 */
app.controller('mainController', function ($scope, $rootScope, $sessionStorage,cacheService,$geolocation) {
    $scope.position = $geolocation.getCurrentPosition({
        timeout: 60000
    });
    $geolocation.watchPosition({
        timeout: 60000,
        maximumAge: 250,
        enableHighAccuracy: true
    });
    $scope.coords = $geolocation.position.coords; // this is regularly updated
    $scope.error = $geolocation.position.error; // this becomes truthy, and has 'code' and 'message' if an error occurs
    $scope.$watch('position.coords', function (newValue, oldValue) {
        $scope.map = {
            center: {
                latitude: newValue.latitude,
                longitude: newValue.longitude
            },
            zoom: 16
        };
    }, true);
    cacheService.getStaticData('genres').then(function (data) {
        $scope.genres = data;
    });
    $scope.$storage = $sessionStorage;
    if (typeof $scope.$storage.user != 'undefined') {
        $scope.user = {
            username: $scope.$storage.user.username,
            userId: $scope.$storage.user.userId
        };
    } else {
        $scope.user = {
            username: ''
        };
    }

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {


    });

});
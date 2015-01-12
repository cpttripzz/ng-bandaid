'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:mainCtrl
 * @description
 * # MainCtrl
 * Controller of the bandaidApp
 */
app.controller('mainCtrl', function ($scope, $rootScope, $sessionStorage,cacheService) {
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


});

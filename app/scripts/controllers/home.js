'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the bandaidApp
 */
app.controller('HomeCtrl', function ($scope,ApiService) {
    ApiService.getHomeItems().then(function (items) {
            $scope.items = items;
        },
        function (error) {
            console.log(error);
        }
    );

});

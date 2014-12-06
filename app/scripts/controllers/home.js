'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the bandaidApp
 */
app.controller('HomeCtrl', function ($scope, ApiService, commonServiceFactory) {
    var apiConfig = commonServiceFactory.getApiConfig();
    var imgPath = apiConfig.baseUri + apiConfig.imgPath;
    $scope.bandPath = apiConfig.baseUri + '/band';
    $scope.userImgPath = imgPath + '/users';
    $scope.genreImgPath = imgPath + '/genres';
    $scope.flagImgPath = imgPath + '/flags';
    $scope.maxSize = 5;
    $scope.lastPage = 1;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 12;
    ApiService.getHomeItems().then(function (items) {
            $scope.items = items.data;
            $scope.totalItems = items.meta.total;
            var objectKeys = Object.keys(items.data);
            $scope.firstElement = items.data[objectKeys[0]]._id.$id;
            $scope.lastElement = items.data[objectKeys[objectKeys.length - 1]]._id.$id;

        },
        function (error) {
            console.log(error);
        }
    );


    $scope.pageChanged = function () {
        var element, direction = null;
        if ($scope.currentPage - $scope.lastPage < 0) {
            element = $scope.firstElement;
            direction = 'back';

        } else {
            element = $scope.lastElement;
            direction = 'forward';
        }

        ApiService.getHomeItems(element, direction).then(function (items) {
                var objectKeys = Object.keys(items.data);
                $scope.items = items.data;
                $scope.totalItems = items.meta.total;
                $scope.lastPage = $scope.currentPage;
                $scope.firstElement = items.data[objectKeys[0]]._id.$id;
                $scope.lastElement = items.data[objectKeys[objectKeys.length - 1]]._id.$id;
                console.log($scope.firstElement, $scope.lastElement);
            },
            function (error) {
                console.log(error);
            }
        );

        console.log('Page changed to: ' + $scope.currentPage);
    };


});

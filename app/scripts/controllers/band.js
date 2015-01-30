'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the bandaidApp
 */
app.controller('BandViewController', function ($scope, $stateParams, band) {
    $scope.band = band;
})
    .controller('BandEditController', function ($q, $scope, $stateParams, commonServiceFactory, band, genres, alertService, $location, ngDialog,documentResource) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var thumbPath = apiConfig.thumbPath;
        $scope.assocGridImgPath = apiConfig.assocGridImgPath;
        $scope.genreImgPath = thumbPath + '/genres/';
        $scope.availableGenres = genres;
        $scope.band = band;
        if (typeof band.genres === 'undefined') {
            $scope.band.genres = [];
        }
        $scope.availableGenresSettings = {
            externalIdProp: '',
            smartButtonMaxItems: 5,
            displayProp: 'name'
        };
        $scope.documentsToDelete = {};

        $scope.beforeDeleteDocument = function () {
            var deferred = $q.defer();

            ngDialog.openConfirm({
                templateUrl: 'views/dialogs/confirm.html',
                className: 'ngdialog-theme-default'
            }).then(function (value) {
                deferred.resolve(value);

            }, function (reason) {
                deferred.reject(reason);
            });
            return deferred.promise;
        };
        $scope.deleteDocument = function (event, item) {
            documentResource.delete({docId:$scope.docToDelete.id}, function () {
                    $(item.draggable).fadeOut().remove();
                    alertService.addAlert({type: 'success', msg: 'Document Successfully Deleted.'}, true);
                }
            );
        };
        $scope.startDeleteDocument = function (item, $index) {
            $scope.docToDelete = this.doc;
        };


        $scope.saveBand = function () {
            if (typeof $scope.band.id === 'undefined') {
                $scope.band.$save().then(function (band) {
                    alertService.addAlert({type: 'success', msg: 'Band Successfully Created.'}, true);
                    $location.url('/bands/' + band.slug + '/edit')
                });
            } else {
                var id = $scope.band.id;
                $scope.band.$update().then(function (data) {
                    console.log(data);
                });
            }
        };

    })
;

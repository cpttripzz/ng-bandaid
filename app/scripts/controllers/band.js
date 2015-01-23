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
    .controller('BandEditController', function ($scope, $stateParams, commonServiceFactory, band, genres,alertService,$location,$upload) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var thumbPath = apiConfig.thumbPath;
        var documentUploadUrl = apiConfig.baseUri + '/api/secure/documents';
        $scope.genreImgPath = thumbPath + '/genres/';
        $scope.availableGenres = genres;
        $scope.band = band;
        if(typeof band.genres === 'undefined'){
            $scope.band.genres = [];
        }
        $scope.availableGenresSettings = {
            externalIdProp: '',
            smartButtonMaxItems: 5,
            displayProp: 'name'
        };
        $scope.saveBand = function () {
            if(typeof $scope.band.id === 'undefined'){
                $scope.band.$save().then(function (band) {
                    alertService.addAlert({ type: 'success', msg: 'Band Successfully Created.' },true);
                    $location.url('/bands/'+band.slug+'/edit')
                });
            } else {
                var id = $scope.band.id;
                $scope.band.$update().then(function (data) {
                    console.log(data);
                });
            }
        };
        $scope.myFiles =[];
        $scope.$watch('myFiles', function() {
            for (var i = 0; i < $scope.myFiles.length; i++) {
                var file = $scope.myFiles[i];
                $scope.upload = $upload.upload({
                    url: documentUploadUrl,
                    method: 'POST',
                    file: file
                }).progress(function (evt) {
                    console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    // file is uploaded successfully
                    console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
                });
            }
        });
    })
;

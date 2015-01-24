'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:userCtrl
 * @description
 * # DialogController
 * Controller of the bandaidApp
 */
app
    .controller('DocumentController', function ($scope, $rootScope, ngDialog,$stateParams) {
        console.log($stateParams);
        var dialog = ngDialog.open({
            template: 'views/dialogs/add-document.html',
            controller: 'DocumentDialogController',
            className: 'ng-dialog-width-full'
        });
        dialog.closePromise.then(function (data) {

        });
    })
    .controller('DocumentDialogController', function ($scope, $sessionStorage,$stateParams, commonServiceFactory,alertService,$location,$upload,$window) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var documentUploadUrl = apiConfig.baseUri + '/api/secure/documents';
        $scope.myFiles =[];
        $scope.isHTML5 = !!($window.File && $window.FormData);

        $scope.uploadAll = function() {
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

        };
    })

;
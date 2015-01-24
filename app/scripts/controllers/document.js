'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:userCtrl
 * @description
 * # DialogController
 * Controller of the bandaidApp
 */
app
    .controller('DocumentController', function ($scope, $rootScope, ngDialog) {
        ngDialog.open({
            template: 'views/dialogs/add-document.html',
            controller: 'DocumentDialogController',
            className: 'ng-dialog-width-full'
        });
    })
    .controller('DocumentDialogController', function ($scope, $sessionStorage,$stateParams, commonServiceFactory,alertService,$location,$upload) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var documentUploadUrl = apiConfig.baseUri + '/api/secure/documents';
        $scope.myFiles =[];
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
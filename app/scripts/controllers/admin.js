'use strict';

/**
 * @ngdoc function
 * @name bandaidApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the bandaidApp
 */
app.controller('AdminController', function ($scope, $stateParams,$sessionStorage,uiGridConstants,users) {

    $scope.gridOptions = {
        enableFiltering: true,
        columnDefs: [
            { field: 'id'},
            { field: 'username' },
            { field: 'email'}
        ]
    };
    $scope.gridOptions.data = users.users;
})

;

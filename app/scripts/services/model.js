'use strict';

/**
 * @ngdoc service
 * @name bandaidApp.UserService
 * @description
 * # UserService
 * Service in the bandaidApp.
 */
angular.module('modelService', [])
    app.factory('Band', [ 'commonServiceFactory','$resource', function(commonServiceFactory,$resource) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var url = apiConfig.baseUri;
        return $resource(url +'/api/open/bands/:slug/',{},{
            getMethod:{
                method:'GET'
            },
            postMethod:{
                url:url + '/secure/band/:id',
                params: {id: '@id'},
                method:'POST',
                isArray:false
            }
        });
    }]);

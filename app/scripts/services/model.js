'use strict';

/**
 * @ngdoc service
 * @name bandaidApp.UserService
 * @description
 * # UserService
 * Service in the bandaidApp.
 */
angular.module('ModelService', [])

    app.factory('Band', [ 'commonServiceFactory','$resource', function(commonServiceFactory,$resource) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var url = apiConfig.baseUri;
        return $resource(url +'/api/open/bands/:slug/',{},{
            getMethod:{
                method:'GET'
            },
            getById:{
                method:'GET',
                url: url +'/api/open/bands/:id/',
                params: {id: '@id'}
            },
            postMethod:{
                url:url + '/secure/band/:id',
                params: {id: '@id'},
                method:'POST',
                isArray:false
            }
        });
    }])
    .factory('UserItem', [ 'commonServiceFactory','$resource', function(commonServiceFactory,$resource) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var url = apiConfig.baseUri;
        return $resource(url +'/api/secure/useritems/slug',{},{
            getMethod:{
                method:'GET'
            }
        });
    }])

    ;

'use strict';

/**
 * @ngdoc service
 * @name bandaidApp.UserService
 * @description
 * # UserService
 * Service in the bandaidApp.
 */
angular.module('ModelService', [])

    .factory('bandResource', [ 'commonServiceFactory','$resource', function(commonServiceFactory,$resource) {
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
                url:url + '/api/secure/band/:id',
                params: {id: '@id'},
                method:'POST',
                isArray:false
            },
            'update': {
                method:'PUT',
                url:url + '/api/secure/band/:id',
                params: {id: '@id'}
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

'use strict';

/**
 * @ngdoc service
 * @name bandaidApp.UserService
 * @description
 * # UserService
 * Service in the bandaidApp.
 */
angular.module('modelService', [])

    .factory('bandResource', function(commonServiceFactory,$resource) {
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
            save:{
                url:url + '/api/secure/band/:id',
                method:'POST',
                isArray:false
            },
            'update': {
                method:'PUT',
                url:url + '/api/secure/band/:id',
                params: {id: '@id'}
            }
        });
    })
    .factory('userItemResource', function(commonServiceFactory,$resource) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var url = apiConfig.baseUri;
        return $resource(url +'/api/secure/useritems',{},{
            getMethod:{
                method:'GET'
            }
        });
    })
    .factory('homeItemResource', function(commonServiceFactory,$resource) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var url = apiConfig.baseUri;
        return $resource(url +'/api/open/homeitems?page=:page',{},{
            getMethod:{
                method:'GET',
                params: {page: '@page'}
            }
        });
    })
    .factory('adminResource', function(commonServiceFactory,$resource) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var url = apiConfig.baseUri;
        return $resource(url +'/api/secure/admin/userreports',{},{
            getUsers:{
                method:'GET'
            }
        });
    })
    .factory('userResource', function(commonServiceFactory,$resource) {
        var apiConfig = commonServiceFactory.getApiConfig();
        var url = apiConfig.baseUri;
        return $resource(url + '/api/open/register',{username: '@username',email: '@email',password: '@password'},{
            checkUserNameOrEmailAvailable:{
                method:'GET',
                url: url +'/api/open/checkUserNameOrEmailAvailable',
                params: {
                    field: '@field',
                    value: '@value'
                }

            },
            'register': {
                method:'POST',
                url:url + '/api/open/register',
                params: {
                    username: '@username',
                    email: '@email',
                    password: '@password'
                }
            }
        });
    })
;

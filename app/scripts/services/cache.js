'use strict';

/**
 * @ngdoc service
 * @name bandaidApp.UserService
 * @description
 * # UserService
 * Service in the bandaidApp.
 */
app
    .service('cacheService', function (DSCacheFactory, commonServiceFactory, $http, $q) {
        var apiConfig = commonServiceFactory.getApiConfig();

        var staticDataCache =  DSCacheFactory('staticDataCache',{
            storageMode: 'localStorage',
            deleteOnExpire: 'aggressive'
        });
        this.getStaticData= function(type) {
            var key = apiConfig.staticData[type];

            var deferred = $q.defer(),
                staticDataCache = DSCacheFactory.get('staticDataCache');
            if (staticDataCache.get(key)) {
                deferred.resolve(staticDataCache.get(key));
            } else {
                $http.get(key).success(function (data) {
                    staticDataCache.put(key, data);
                    deferred.resolve(data);
                });
            }
            return deferred.promise;
        }
});


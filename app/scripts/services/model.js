'use strict';

/**
 * @ngdoc service
 * @name bandaidApp.UserService
 * @description
 * # UserService
 * Service in the bandaidApp.
 */
angular.module('ModelService', [])
    app.config('restmodProvider', function(restmodProvider) {
        restmodProvider.rebase('DefaultPacker')
            .rebase({
                $config: {
                    urlPrefix: 'http://bandaid-api.com/app_dev.php'
                }
            })
            .rebase('AMSApi');
    })
        .factory('HomeItem', function(restmod) {
            return restmod.model('api/open/homeitems/1').mix(
                {
                    bands: { hasMany: 'Band' }
                }
            );
        })
        .factory('Band', function(restmod) {
            return restmod.model('api/open/band').mix(
                {
                    genres: { hasMany: 'Genre' },
                    addresses: { hasMany: 'Address' },
                    documents: { hasMany: 'Document' },
                    musicians: { hasMany: 'Genre' }
                }
            );
        });


/**
 export default DS.Model.extend({
    genres: DS.hasMany('genres'),
    addresses: DS.hasMany('addresses'),
    documents: DS.hasMany('documents'),
    musicians: DS.hasMany('musicians'),
    useritems: DS.belongsTo('useritem'),

});
 */
'use strict';

/**
 * @ngdoc service
 * @name bandaidApp.API
 * @description
 * # API
 * Constant in the bandaidApp.
 */

angular.module('commonService', [])

    .factory('commonServiceFactory', function () {
        var factory = {};
        var domain ='https://bandaid-api.com';
        var script = 'app_dev.php';
        var baseUri = domain + '/' + script;
        factory.getApiConfig = function () {
            return {
                'domain': domain,
                'baseUri': baseUri,
                'loginPath': '/api/open/getToken',
                'logoutPath': '/user/logout',
                'registrationPath': '/user/register',
                'homePath': '/api/open/homeitems/1',
                'imgPath': domain + '/img',
                'thumbPath' : domain + '/media/cache/thumb/img',
                'assocSmallImgPath' : domain + '/media/cache/assoc/img/users/',
                'staticData' : {
                    'genres' : baseUri + '/api/open/genres'
                }
            };
        };

        factory.findArrayIndexWithAttr =function (array, attr, value) {
            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value) {
                    return i;
                }
            }
            return false;
        };




        factory.getAddressText = function(obj) {
            var regionName = '';
            var countryName = '';
            var cityName = '';
            if(typeof obj.region !== 'undefined') {
                if(typeof obj.region.longName !== 'undefined'){
                    regionName = obj.region.longName;
                } else if(typeof obj.region.shortName !== 'undefined'){
                    regionName = obj.region.shortName;
                }
            }
            if(typeof obj.city.country !== 'undefined'){
                countryName = obj.city.country.name;
            }

            if(typeof obj.city !== 'undefined') {
                cityName = obj.city.name;
            }
            if(regionName){
                return cityName + ', ' + regionName + ', ' + countryName;
            } else {
                return cityName + ', ' + countryName;
            }
            return cityName + ', ' + regionName + ', ' + countryName;
        }
        return factory;
    })

    ;


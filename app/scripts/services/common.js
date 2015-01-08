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
        factory.getApiConfig = function () {
            return {
                'baseUri': 'http://bandaid-api.com/app_dev.php',
                'loginPath': '/api/open/getToken',
                'logoutPath': '/user/logout',
                'registrationPath': '/user/register',
                'homePath': '/api/open/homeitems/1',
                'imgPath': 'http://bandaid-api.com/img',
                'thumbPath' : 'http://bandaid.com/media/cache/thumb/img'
            };
        };
        factory.getFormAsParams = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
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


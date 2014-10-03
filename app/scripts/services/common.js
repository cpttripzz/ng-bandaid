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
                'baseUri': 'http://api.bandaid.com',
                'loginPath': '/user/login',
                'logoutPath': '/user/logout',
                'registrationPath': '/user/register',
                'homePath': '/home'
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
        return factory;
    })

    ;


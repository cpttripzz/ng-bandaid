'use strict';

/**
 * @ngdoc service
 * @name bandaidApp.User
 * @description
 * # User
 * Service in the bandaidApp.
 */
angular.module('bandaidApp'['ngStorage'])
  .factory('setUser',
    function($sessionStorage ) {
      return function(user) {
        $sessionStorage.user = user;
      };
    }
  );
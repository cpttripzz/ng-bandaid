"use strict";

var httpProviderIt;

describe("Auth Module Unit Tests", function () {
    var tokenInterceptor, userService, commonServiceFactory, $sessionStorage;
    beforeEach(function () {
        angular.module('commonService', 'ngStorage');

        module('auth', function ($httpProvider) {
            //save our interceptor
            httpProviderIt = $httpProvider;
        });

        inject(function () {
            tokenInterceptor = {
                request: sinon.stub(),
                requestError: sinon.stub(),
                response: sinon.stub(),
                responseError: sinon.stub()
            }
            commonServiceFactory = {
                getApiConfig : sinon.stub()
            },
            $sessionStorage = {
                user: sinon.stub()
            },
            userService = {
                changeUser: sinon.stub(),
                authorize: sinon.stub(),
                isLoggedIn: sinon.stub(),
                login: sinon.stub()
            }

        })
    });


    var $httpBackend;
    var token = 'someToken';

    describe('tokenInterceptor Tests', function () {

        it('should have tokenInterceptor be defined', function () {
            expect(tokenInterceptor).toBeDefined();
        });

        it('should properly set an api token if session storage user is set', function () {

        });
        //
        //it('should save the users api token after saveUser', function () {
        //    spyOn(tokenInterceptor, 'setToken');
        //    Auth.saveUser(apiResponse);
        //    expect(tokenInterceptor.setToken).toHaveBeenCalled();
        //});
        //
        //it('should have no api token upon start up', function () {
        //    var token = tokenInterceptor.getToken();
        //    expect(token).toBeNull();
        //});
        //
        //describe('HTTP tests', function () {
        //
        //    it('should have the tokenInterceptor as an interceptor', function () {
        //        expect(httpProviderIt.interceptors).toContain('tokenInterceptor');
        //    });
        //
        //    it('should token in the headers after setting', function () {
        //        tokenInterceptor.setToken(token);
        //        $httpBackend.when('GET', 'http://example.com', null, function (headers) {
        //            expect(headers.Authorization).toBe(token);
        //        }).respond(200, {name: 'example'});
        //    });
        //
        //    it('should not place a token in the http request headers if no token is set', function () {
        //        var config = tokenInterceptor.request({headers: {}});
        //        expect(config.headers['Authorization']).toBe(undefined);
        //    });
        //
        //    it('should place a token in the http request headers after a token is set', function () {
        //        tokenInterceptor.setToken(token);
        //        var config = tokenInterceptor.request({headers: {}});
        //        expect(config.headers['Authorization']).toBe('Token token="' + token + '"');
        //    });
        //}); //Mocked HTTP Requests

    }); //tokenInterceptor tests

});
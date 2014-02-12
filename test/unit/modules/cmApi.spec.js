define(['angular-mocks'], function () {
    'use strict';

    describe('cmApi', function(){

        var cmApi, $httpBackend

        beforeEach(module('cmApi',[

            'cmApiProvider',

            function(cmApiProvider){
                cmApiProvider.restApiUrl('my_rest_api')
            }
        ]))

        beforeEach(inject(function(_cmApi_, _$httpBackend_){
            cmApi = _cmApi_
            $httpBackend = _$httpBackend_
        }))

        afterEach(function(){
            $httpBackend.verifyNoOutstandingExpectation()
            $httpBackend.verifyNoOutstandingRequest()
        })

        it('should provide "cmApi" service that is itself a universal function for api calls.', function(){
            $httpBackend.expect('GET',		'my_rest_api/test').respond(200)
            $httpBackend.expect('POST',		'my_rest_api/test').respond(200)
            $httpBackend.expect('DELETE',	'my_rest_api/test').respond(200)
            $httpBackend.expect('HEAD',		'my_rest_api/test').respond(200)
            $httpBackend.expect('PUT',		'my_rest_api/test').respond(200)
            $httpBackend.expect('JSONP',	'my_rest_api/test').respond(200)

            var resolved = 0

            cmApi('GET',	'/test').then(function(){ resolved++ })
            cmApi('POST',	'/test').then(function(){ resolved++ })
            cmApi('DELETE',	'/test').then(function(){ resolved++ })
            cmApi('HEAD',	'/test').then(function(){ resolved++ })
            cmApi('PUT',	'/test').then(function(){ resolved++ })
            cmApi('JSONP',	'/test').then(function(){ resolved++ })

            $httpBackend.flush()

            expect(resolved).toEqual(6)
        })

        it('should provide "cmApi" service with a function for GET requests.', function(){
            $httpBackend.expect('GET',		'my_rest_api/test').respond(200)
            cmApi.get('/test')
            $httpBackend.flush()
        })

        it('should provide "cmApi" service with a function for GET requests.', function(){
            $httpBackend.expect('POST',		'my_rest_api/test').respond(200)
            cmApi.post('/test')
            $httpBackend.flush()
        })

        it('should provide "cmApi" service with a function for DELETE requests.', function(){
            $httpBackend.expect('DELETE',	'my_rest_api/test').respond(200)
            cmApi.delete('/test')
            $httpBackend.flush()
        })

        it('should provide "cmApi" service with a function for HEAD requests.', function(){
            $httpBackend.expect('HEAD',		'my_rest_api/test').respond(200)
            cmApi.head('/test')
            $httpBackend.flush()
        })

        it('should provide "cmApi" service with a function for PUT requests.', function(){
            $httpBackend.expect('PUT',		'my_rest_api/test').respond(200)
            cmApi.put('/test')
            $httpBackend.flush()
        })

        it('should provide "cmApi" service with a function for JSONP requests.', function(){
            $httpBackend.expect('JSONP',	'my_rest_api/test').respond(200)
            cmApi.jsonp('/test')
            $httpBackend.flush()
        })

    })

    describe('cmApi with cmAuth present', function(){

        beforeEach(module('cmApi'))

        beforeEach(module(function ($provide) {
            $provide.value('cmAuth', { getToken: function(){ return "my_token" } } );
        }))

        it('should extend api calls with an authorization token', inject(function(cmApi, $httpBackend){
            $httpBackend.expect('GET',		'/test?token=my_token').respond(200)
            cmApi.get('/test')
            $httpBackend.flush()
        }))

    })

})
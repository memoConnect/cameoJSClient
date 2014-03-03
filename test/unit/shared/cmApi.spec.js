 define([
     'angular-mocks'
 ], function () {
    'use strict';

    describe('cmApi', function(){

        var cmApi, $httpBackend;

        beforeEach(module('cmApi',[
            'cmApiProvider',
            function(cmApiProvider){
                cmApiProvider.restApiUrl('my_rest_api')
            }
        ]))

        beforeEach(inject(function(_cmApi_, _$httpBackend_){
            cmApi = _cmApi_;
            $httpBackend = _$httpBackend_;
        }))

        afterEach(function(){
            $httpBackend.verifyNoOutstandingExpectation()
            $httpBackend.verifyNoOutstandingRequest()
        })

        it('should provide "cmApi" service', function(){
            expect(cmApi).toBeDefined()
        })

        describe('service', function(){

            it('should itself be a universal function for api calls.', function(){
                $httpBackend.expect('GET',		'my_rest_api/test').respond(200, {res:'OK'} )
                $httpBackend.expect('POST',		'my_rest_api/test').respond(200, {res:'OK'} )
                $httpBackend.expect('DELETE',	'my_rest_api/test').respond(200, {res:'OK'} )
                $httpBackend.expect('HEAD',		'my_rest_api/test').respond(200, {res:'OK'} )
                $httpBackend.expect('PUT',		'my_rest_api/test').respond(200, {res:'OK'} )
                $httpBackend.expect('JSONP',	'my_rest_api/test').respond(200, {res:'OK'} )

                var resolved = 0

                cmApi('GET',	{url:'/test'}).then(function(){ resolved++ })
                cmApi('POST',	{url:'/test'}).then(function(){ resolved++ })
                cmApi('DELETE',	{url:'/test'}).then(function(){ resolved++ })
                cmApi('HEAD',	{url:'/test'}).then(function(){ resolved++ })
                cmApi('PUT',	{url:'/test'}).then(function(){ resolved++ })
                cmApi('JSONP',	{url:'/test'}).then(function(){ resolved++ })

                $httpBackend.flush()

                expect(resolved).toEqual(6)
            })

            it('should provide a function for GET requests.', function(){
                $httpBackend.expect('GET', 'my_rest_api/test').respond(200, {res:'OK'} )
                cmApi.get( {url:'/test'} )
                $httpBackend.flush()
            })

            it('should provide a function for GET requests.', function(){
                $httpBackend.expect('POST',	'my_rest_api/test').respond(200, {res:'OK'} )
                cmApi.post( {url:'/test'} )
                $httpBackend.flush()
            })

            it('should provide a function for DELETE requests.', function(){
                $httpBackend.expect('DELETE', 'my_rest_api/test').respond(200, {res:'OK'} )
                cmApi.delete( {url:'/test'} )
                $httpBackend.flush()
            })

            it('should provide a function for HEAD requests.', function(){
                $httpBackend.expect('HEAD',	'my_rest_api/test').respond(200, {res:'OK'} )
                cmApi.head( {url:'/test'} )
                $httpBackend.flush()
            })

            it('should provide a function for PUT requests.', function(){
                $httpBackend.expect('PUT', 'my_rest_api/test').respond(200, {res:'OK'} )
                cmApi.put( {url:'/test'} )
                $httpBackend.flush()
            })

            it('should provide a function for JSONP requests.', function(){
                $httpBackend.expect('JSONP', 'my_rest_api/test').respond(200, {res:'OK'} )
                cmApi.jsonp( {url:'/test'} )
                $httpBackend.flush()
            })

            it('should check the api conventions for case 1', function(){
                var my_pony, my_alternative;

                $httpBackend.expect('GET', 'my_rest_api/test')
                .respond(200,{
                    "res" : 'OK',
                    "data": {
                        "pony": "my_new_pony"
                    }
                })

                cmApi
                .get({
                    url: '/test',
                    exp_ok:	'pony'
                })
                .then(
                    function(pony){
                        my_pony = pony
                    },

                    function(alternative, res){
                        my_alternative = alternative
                    }
                )

                $httpBackend.flush()
                expect(my_pony).toEqual('my_new_pony')
                expect(my_alternative).not.toBeDefined()
            })

            it('should check the api conventions for case 2', function(){
                var my_pony, my_alternative;

                $httpBackend
                .expect('GET', 'my_rest_api/test')
                .respond(200,{
                    "res" : 'OK',
                    "data": {
                        "dog": "my_new_dog"
                    }
                })

                cmApi
                .get({
                    url: '/test',
                    exp_ok:	'pony'
                })
                .then(
                    function(pony){
                        my_pony = pony
                    },

                    function(alternative, res){
                        my_alternative = alternative
                    }
                )

                $httpBackend.flush()
                expect(my_pony).not.toBeDefined()
                expect(my_alternative).not.toBeDefined()
            })

            it('should check the api conventions for case 3', function(){
                var my_pony, my_alternative;

                $httpBackend.expect('GET', 'my_rest_api/test')
                .respond(200, {
                    "res" : 'KO',
                    "data": {
                        "alternative" : "kitty"
                    }
                })


                cmApi
                .get({
                    url: '/test',
                    exp_ok: 'pony'
                })
                .then(
                    function(pony){
                        my_pony = pony
                    },
                    function(alternative, res){
                        my_alternative = alternative
                    }
                )

                $httpBackend.flush()
                expect(my_pony).not.toBeDefined()
                expect(my_alternative).toEqual({"alternative" : "kitty"})
            })

            it('should check the api conventions for case 4', function(){
                var my_pony, my_alternative;

                $httpBackend
                .expect('GET', 'my_rest_api/test')
                .respond(200, {
                    "res" : 'XXX',
                    "data": {
                        "kitty" : "grumpy cat"
                    }
                })

                cmApi
                .get({
                    url: '/test',
                    exp_ok:	'pony'
                })
                .then(
                    function(pony){
                        my_pony = pony
                    },
                    function(alternative, res){
                        my_alternative = alternative
                    }
                )

                $httpBackend.flush()
                expect(my_pony).not.toBeDefined()
                expect(my_alternative).not.toBeDefined()
            })
        })
    })

    describe('cmApi with cmAuth present', function(){
        beforeEach(module('cmApi'))

        beforeEach(module(function ($provide) {
            $provide.value('cmAuth', { getToken: function(){ return "my_token" } } );
        }))

        it('should extend api calls with an authorization token', inject(function(cmApi, $httpBackend){
            $httpBackend.expect('GET', '/test', null, function(headers){ return 'Authorization' in headers }).respond(200, {res:'OK'} )
            cmApi.get( {url:'/test'} )
            $httpBackend.flush()
        }))
    })
})
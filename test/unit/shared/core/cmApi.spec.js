'use strict';

describe('cmApi', function(){

    var cmApi, $httpBackend

    beforeEach(module('cmCore',[
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

            cmApi('GET',	{path:'/test'}).then(function(){ resolved++ })
            cmApi('POST',	{path:'/test'}).then(function(){ resolved++ })
            cmApi('DELETE',	{path:'/test'}).then(function(){ resolved++ })
            cmApi('HEAD',	{path:'/test'}).then(function(){ resolved++ })
            cmApi('PUT',	{path:'/test'}).then(function(){ resolved++ })
            cmApi('JSONP',	{path:'/test'}).then(function(){ resolved++ })

            $httpBackend.flush()

            expect(resolved).toEqual(6)
        })

        it('should provide a function for GET requests.', function(){
            $httpBackend.expect('GET', 'my_rest_api/test').respond(200, {res:'OK'} )
            cmApi.get( {path:'/test'} )
            $httpBackend.flush()
        })

        it('should provide a function for GET requests.', function(){
            $httpBackend.expect('POST',	'my_rest_api/test').respond(200, {res:'OK'} )
            cmApi.post( {path:'/test'} )
            $httpBackend.flush()
        })

        it('should provide a function for DELETE requests.', function(){
            $httpBackend.expect('DELETE', 'my_rest_api/test').respond(200, {res:'OK'} )
            cmApi.delete( {path:'/test'} )
            $httpBackend.flush()
        })

        it('should provide a function for HEAD requests.', function(){
            $httpBackend.expect('HEAD',	'my_rest_api/test').respond(200, {res:'OK'} )
            cmApi.head( {path:'/test'} )
            $httpBackend.flush()
        })

        it('should provide a function for PUT requests.', function(){
            $httpBackend.expect('PUT', 'my_rest_api/test').respond(200, {res:'OK'} )
            cmApi.put( {path:'/test'} )
            $httpBackend.flush()
        })

        it('should provide a function for JSONP requests.', function(){
            $httpBackend.expect('JSONP', 'my_rest_api/test').respond(200, {res:'OK'} )
            cmApi.jsonp( {path:'/test'} )
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
                path: '/test',
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
                path: '/test',
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
                path: '/test',
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
                path: '/test',
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
    beforeEach(module('cmCore'))

    beforeEach(module(function ($provide) {
        $provide.value('cmAuth', {
            getToken: function(){ return "my_token"},
            getTwoFactorToken: function(){ return "my_twofactor_token" } } );
    }))

    it('should extend api calls with an authorization token', inject(function(cmApi, $httpBackend){
        $httpBackend.expect('GET', '/test', null, function(headers){ return 'Authorization' in headers }).respond(200, {res:'OK'} )
        cmApi.get( {path:'/test'} )
        $httpBackend.flush()
    }))

    it('should extend api calls with an two factor authorization token, if present', inject(function(cmApi, $httpBackend){
        $httpBackend.expect('GET', '/test', null, function(headers){ return 'X-TwoFactorToken' in headers }).respond(200, {res:'OK'} )
        cmApi.get( {path:'/test'} )
        $httpBackend.flush()
    }))
})
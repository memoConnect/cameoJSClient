define(['jquery', 'angular-mocks'], function ($) {
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

	it('should provide "cmApi" service with a function for GET requests.', function(){
		$httpBackend.expect('GET',		'my_rest_api/test').respond(200, {res:'OK'} )
		cmApi.get( {url:'/test'} )
		$httpBackend.flush()
	})

	it('should provide "cmApi" service with a function for GET requests.', function(){
		$httpBackend.expect('POST',		'my_rest_api/test').respond(200, {res:'OK'} )
		cmApi.post( {url:'/test'} )
		$httpBackend.flush()
	})

	it('should provide "cmApi" service with a function for DELETE requests.', function(){
		$httpBackend.expect('DELETE',	'my_rest_api/test').respond(200, {res:'OK'} )
		cmApi.delete( {url:'/test'} )
		$httpBackend.flush()
	})

	it('should provide "cmApi" service with a function for HEAD requests.', function(){
		$httpBackend.expect('HEAD',		'my_rest_api/test').respond(200, {res:'OK'} )
		cmApi.head( {url:'/test'} )
		$httpBackend.flush()
	})

	it('should provide "cmApi" service with a function for PUT requests.', function(){
		$httpBackend.expect('PUT',		'my_rest_api/test').respond(200, {res:'OK'} )
		cmApi.put( {url:'/test'} )
		$httpBackend.flush()
	})

	it('should provide "cmApi" service with a function for JSONP requests.', function(){
		$httpBackend.expect('JSONP',	'my_rest_api/test').respond(200, {res:'OK'} )
		cmApi.jsonp( {url:'/test'} )
		$httpBackend.flush()
	})	

})

describe('cmApi with cmAuth present', function(){

	beforeEach(module('cmApi'))

	beforeEach(module(function ($provide) {
   		$provide.value('cmAuth', { getToken: function(){ return "my_token" } } );
	}))

	it('should extend api calls with an authorization token', inject(function(cmApi, $httpBackend){						
		$httpBackend.expect('GET',		'/test?token=my_token').respond(200, {res:'OK'} )
		cmApi.get( {url:'/test'} )
		$httpBackend.flush()
	}))

})

});
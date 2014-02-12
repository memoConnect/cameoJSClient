define(['angular-mocks'], function () {
'use strict';

describe('cmAuth', function(){

	var cmAuth, $httpBackend

	beforeEach(module('cmAuth'))

	beforeEach(inject(function(_cmAuth_, _$httpBackend_){
		cmAuth = _cmAuth_
		$httpBackend = _$httpBackend_
	}))

	afterEach(function(){				
		$httpBackend.verifyNoOutstandingExpectation()
		$httpBackend.verifyNoOutstandingRequest()
	})

	it('should provide a service for authentication tasks', function(){
		expect(cmAuth).toBeDefined()
	})

	describe('service', function(){

		
		it('should provide a function to request authentication tokens.', function(){
			$httpBackend.expectGET('/token').respond(200)
			cmAuth.requestToken()
			$httpBackend.flush()
		})


		
		it('should provide one function to store and one function get tokens.', function(){
			cmAuth.storeToken('test')
			expect(cmAuth.getToken()).toEqual('test')
		})

		
		it('should provide a function to request user account creation.', function(){
			$httpBackend.expectPOST('/account').respond(200)
			cmAuth.createUser()
			$httpBackend.flush()			
		})
		

		it('should provide a function to check if user name already exists.', function(){
			$httpBackend.expectPOST('/account/check').respond(200)
			cmAuth.checkAccountName()
			$httpBackend.flush()			
		})

		it('should provide a function to check if a phone number is valid.', function(){
			$httpBackend.expectPOST('/services/checkPhoneNumber').respond(200)
			cmAuth.checkPhoneNumber()
			$httpBackend.flush()			
		})
	})

	//TODO: test for directives are not yet done

})

});
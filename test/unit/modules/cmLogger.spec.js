define(['angular-mocks'], function () {
    'use strict';

describe('cmLogger', function(){

	var cmLogger, log

	beforeEach(module('cmLogger'))
	beforeEach(inject(function(_cmLogger_){		
		cmLogger = _cmLogger_		
	}))

	it('should provide an info function', function(){
		expect(cmLogger.info).toBeDefined()		
	})

	it('should provide an warn function', function(){
		expect(cmLogger.warn).toBeDefined()		
	})

	it('should provide an error function', function(){
		expect(cmLogger.error).toBeDefined()		
	})

	it('should provide an debug function', function(){
		expect(cmLogger.debug).toBeDefined()		
	})
})

});
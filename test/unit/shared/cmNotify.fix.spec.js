define([
    'jquery',
    'angular-mocks',
    'cmNotify'
], function ($) {
    'use strict';

    describe("cmNotify", function() {
        var cmNotify,
            el,
            scope,
            $compile,
            $httpBackend,
            $http

        beforeEach(module("cmNotify"))
        beforeEach(inject(function(_cmNotify_, _$rootScope_, _$compile_, _$http_, _$httpBackend_){
            cmNotify 	    = _cmNotify_
            el				= angular.element('<div cm-notify></div>')
            scope			= _$rootScope_.$new()
            $compile		= _$compile_
            $httpBackend	= _$httpBackend_
            $http			= _$http_

            $compile(el)(scope)
            scope.$digest()
        }))

        it('should provide a service "cmNotify".', function(){
            expect(cmNotify).toBeDefined()
        })

        it('should have a template', function(){
            expect(el.html()).not.toBe('')
        })

        it('should display warnings.', function(){
            cmNotify.warn('waring_1')
            cmNotify.warn('waring_2')
            cmNotify.warn('waring_3')
            scope.$digest()
            expect($('.growl',el).children().length).toEqual(3)
        })

        it('should display infos.', function(){
            cmNotify.info('info_1')
            cmNotify.info('info_2')
            cmNotify.info('info_3')
            scope.$digest()
            expect($('.growl',el).children().length).toEqual(3)
        })

        it('should display success messages.', function(){
            cmNotify.success('info_1')
            cmNotify.success('info_2')
            cmNotify.success('info_3')
            scope.$digest()
            expect($('.growl',el).children().length).toEqual(3)
        })

        it('should display error messages.', function(){
            cmNotify.error('info_1')
            cmNotify.error('info_2')
            cmNotify.error('info_3')
            scope.$digest()
            expect($('.growl',el).children().length).toEqual(3)
        })

        it('should intercept messages in backend communication.', function(){
            $httpBackend.whenGET('/any').respond({
                "messages":	[
                    {text: 		"my warning", severity:	"warn"},
                    {text: 		"my error", severity:	"error"}
                ]
            })

            $http.get('/any')
            $httpBackend.flush();

            expect($('.growl',el).children().length).toEqual(2)
        })
    })
})
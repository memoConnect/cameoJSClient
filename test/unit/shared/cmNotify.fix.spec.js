'use strict';

describe("cmNotify", function() {
    var el,
        scope,
        cmNotify,
        $compile,
        $httpBackend,
        $http

    beforeEach(module("cmNotify"))
    beforeEach(inject(function(_cmNotify_, _$rootScope_, _$compile_, _$http_, _$httpBackend_){
        cmNotify        = _cmNotify_
        $compile        = _$compile_
        $httpBackend    = _$httpBackend_
        $http           = _$http_
    }))

    it('should provide a service "cmNotify".', function(){
        expect(cmNotify).toBeDefined()
    })
    

    describe("cmNotify directive", function() {

        var el,scope

        beforeEach(inject(function(_cmNotify_, _$rootScope_, _$compile_, _$http_, _$httpBackend_){
            el              = angular.element('<div cm-notify></div>')
            scope           = _$rootScope_.$new()

            $compile(el)(scope)
            scope.$digest()
        }))

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
            cmNotify.success('success_1')
            cmNotify.success('success_2')
            cmNotify.success('success_3')
            scope.$digest()
            expect($('.growl',el).children().length).toEqual(3)
        })

        it('should display error messages.', function(){
            cmNotify.error('error_1')
            cmNotify.error('error_2')
            cmNotify.error('error_3')
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

    describe("cmNotifySignal directive", function() {
        beforeEach(inject(function(_cmNotify_, _$rootScope_, _$compile_, _$http_, _$httpBackend_){
            el              = angular.element('<cm-notify-signal></cm-notify-signal>')
            scope           = _$rootScope_.$new()

            $compile(el)(scope)
            scope.$digest()
        }))

        it('should respond to notifications', function(){
            expect(scope.unreadNotifications).toBe(false)
            cmNotify.error('test_me')
            expect(scope.unreadNotifications).toBe(true)
        })
    })
})


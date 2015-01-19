'use strict';

describe('Directive cmSearchConversations', function(){
    var scope, element, cmFilter, httpBackend, timeout

    beforeEach(module('cmCore',[
        'cmApiProvider',
        function(cmApiProvider){
            cmApiProvider.setWithoutApiUrl()
        }
    ]))

    beforeEach(module('cmUi'))

    beforeEach(module('cmConversations'))

    beforeEach(inject(function(_$compile_,_$rootScope_, _cmFilter_, _$httpBackend_, _$timeout_){

        scope = _$rootScope_.$new()

        httpBackend = _$httpBackend_

        timeout = _$timeout_

        element = angular.element('<cm-search-conversations></cm-search-conversations>')

        element = _$compile_(element)(scope)

        cmFilter = _cmFilter_

        scope.$digest()
    }))

    describe('1. Test Element Default ', function(){
        it('should exist one button', function(){
            expect(element.find('button').length).toBe(1)
        })

        it('should exist one span', function(){
            expect(element.find('span').length).toBe(1)
        })

        it('should exist one cm-loader', function(){
            expect(element.find('cm-loader').length).toBe(1)
        })

        it('element should not be disabled', function(){
            expect(element.hasClass('cm-disabled')).toBe(false)
        })

        it('scope vars should be default', function(){
            expect(scope.matches.loaded).toBe(0)
            expect(scope.matches.qty).toBe(0)
            expect(scope.isDisabled).toBe(false)
        })

        it('should exists setDefault function', function(){
            expect(scope.setDefault).toBeDefined()
        })

        it('should exists updateElement function', function(){
            expect(scope.updateElement).toBeDefined()
        })

        it('should exists searchArchive function', function(){
            expect(scope.searchArchive).toBeDefined()
        })
    })

    describe('2. Test "Link" Behavior', function(){
        it('element should be disabled, when loaded matches equals matches quantity', function(){
            scope.matches = {
                loaded: 10,
                qty: 10
            }

            scope.updateElement();

            expect(element.hasClass('cm-disabled')).toBe(true)
        })

        it('element should be disabled, when loaded no matches exists', function(){
            scope.matches = {
                loaded: 0,
                qty: 0
            }

            scope.updateElement();

            expect(element.hasClass('cm-disabled')).toBe(true)
        })

        it('element should not be disabled, when not all results loaded', function(){
            scope.matches = {
                loaded: 5,
                qty: 10
            }

            scope.updateElement();

            expect(element.hasClass('cm-disabled')).toBe(false)
        })

        it('element should not be disabled, when setDefault is called', function(){
            scope.matches = {
                loaded: 0,
                qty: 0
            }

            scope.updateElement();

            expect(element.hasClass('cm-disabled')).toBe(true)

            scope.setDefault();

            expect(element.hasClass('cm-disabled')).toBe(false)

        })
    })

    describe('3. Test "Controller" Behavior', function(){
        it('should get matches on sendArchive and element is not disabled', function(){
            httpBackend.expectPOST('/conversations/search?limit=10&offset=0').respond(200,{res:'OK',data:{numberOfMatches:10,conversations:[{},{}]}})

            cmFilter.set('moep')
            scope.searchArchive()

            // because of timeout around http request in directive
            timeout.flush(500)

            httpBackend.flush()

            expect(scope.matches.loaded).toBe(2)
            expect(scope.matches.qty).toBe(10)

            expect(element.hasClass('cm-disabled')).toBe(false)
        })

        it('should get matches on sendArchive and element is disabled', function(){
            httpBackend.expectPOST('/conversations/search?limit=10&offset=0').respond(200,{res:'OK',data:{numberOfMatches:0,conversations:[]}})

            cmFilter.set('moep')
            scope.searchArchive()

            // because of timeout around http request in directive
            timeout.flush(500)

            httpBackend.flush()

            expect(scope.matches.loaded).toBe(0)
            expect(scope.matches.qty).toBe(0)

            expect(element.hasClass('cm-disabled')).toBe(true)
        })

        it('should get matches on sendArchive and element is disabled', function(){
            httpBackend.expectPOST('/conversations/search?limit=10&offset=0').respond(200,{res:'OK',data:{numberOfMatches:2,conversations:[{},{}]}})

            cmFilter.set('moep')
            scope.searchArchive()

            // because of timeout around http request in directive
            timeout.flush(500)

            httpBackend.flush()

            expect(scope.matches.loaded).toBe(2)
            expect(scope.matches.qty).toBe(2)

            expect(element.hasClass('cm-disabled')).toBe(true)
        })
    })
})

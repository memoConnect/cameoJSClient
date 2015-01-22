'use strict';

describe('Directive cmContextBar', function() {
    var scope, element, cmContextFactory

    beforeEach(module('cmCore'))

    beforeEach(inject(function(_$compile_,_$rootScope_, _cmContextFactory_){

        scope = _$rootScope_.$new()

        element = angular.element('<cm-context-bar></cm-context-bar>')

        element = _$compile_(element)(scope)

        cmContextFactory = _cmContextFactory_

        scope.$digest()
    }))

    describe('Element ', function(){
        it('should not have class cm-show', function() {
            expect(element.hasClass('cm-show')).toBe(false)
        })

        it('should have class cm-show, if cmContextFactory create a new Object', function(){
            expect(element.hasClass('cm-show')).toBe(false)

            cmContextFactory.create();

            expect(element.hasClass('cm-show')).toBe(true)
        })

        it('should have a Counter, which represents the length of cmContextFactory (QTY of Objects), in this case 1', function(){
            cmContextFactory.create();

            scope.$apply()

            expect(parseInt(cmContextFactory.length)).toBe(1)
            expect(parseInt(element[0].querySelector("[data-qa='ctn-context-counter']").innerHTML)).toBe(cmContextFactory.length)
        })

        it('counter part II should be 3', function(){
            cmContextFactory.create();

            scope.$apply()

            expect(parseInt(cmContextFactory.length)).toBe(1)
            expect(parseInt(element[0].querySelector("[data-qa='ctn-context-counter']").innerHTML)).toBe(cmContextFactory.length)

            cmContextFactory.create();
            cmContextFactory.create();

            scope.$apply()

            expect(parseInt(cmContextFactory.length)).toBe(3)
            expect(parseInt(element[0].querySelector("[data-qa='ctn-context-counter']").innerHTML)).toBe(cmContextFactory.length)
        })

        it('should lose class cm-show, after cmContextFactory triggers "clear"', function(){

            cmContextFactory.create();

            scope.$apply()

            expect(element.hasClass('cm-show')).toBe(true)

            cmContextFactory.trigger('clear');

            expect(element.hasClass('cm-show')).toBe(false)
        })
    })
})
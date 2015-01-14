'use strict';

describe('Directive hideOnFilter', function(){

    var element, scope, cmFilter

    beforeEach(module('cmCore'))

    beforeEach(module('cmUi'))


    describe('1. Test Standard Behavior', function(){

        beforeEach(inject(function(_$compile_, _$rootScope_, _cmFilter_){
            scope = _$rootScope_.$new()

            element = angular.element('<span cm-hide-on-filter="filterVar"></span>')

            element = _$compile_(element)(scope)

            cmFilter = _cmFilter_

            scope.$digest()
        }));

        it('element should not have class "cm-hide" on empty filter', function(){
            scope.filterVar = ''

            scope.$apply()

            expect(element.hasClass('cm-hide')).toBe(false)
        })

        it('element should have class "cm-hide" when filter has content', function(){
            scope.filterVar = 'moep'

            scope.$apply()

            expect(element.hasClass('cm-hide')).toBe(true)
        })

        it('element should not have class "cm-hide" when cmFilter called clear function', function(){

            scope.filterVar = 'moep'

            scope.$apply();

            expect(element.hasClass('cm-hide')).toBe(true)

            cmFilter.clear()

            expect(element.hasClass('cm-hide')).toBe(false)
        })
    })

});
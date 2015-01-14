'use strict';

describe('Directive showOnFilter', function(){

    var element, scope, cmFilter

    beforeEach(module('cmCore'))

    beforeEach(module('cmUi'))


    describe('1. Test Standard Behavior', function(){

        beforeEach(inject(function(_$compile_, _$rootScope_, _cmFilter_){
            scope = _$rootScope_.$new()

            element = angular.element('<span cm-show-on-filter="filterVar"></span>')

            element = _$compile_(element)(scope)

            cmFilter = _cmFilter_

            scope.$digest()
        }));

        it('element should not have class "cm-show" on empty filter', function(){

            scope.filterVar = ''

            scope.$apply();

            expect(element.hasClass('cm-show')).toBe(false)
        })

        it('element should have class "cm-show" when filter has content', function(){

            scope.filterVar = 'moep'

            scope.$apply();

            expect(element.hasClass('cm-show')).toBe(true)
        })

        it('element should not have class "cm-show" when cmFilter called clear function', function(){

            scope.filterVar = 'moep'

            scope.$apply();

            expect(element.hasClass('cm-show')).toBe(true)

            cmFilter.clear()

            expect(element.hasClass('cm-show')).toBe(false)
        })
    })

    describe('2. Test with cmShowOnMinLength', function(){

        beforeEach(inject(function(_$compile_, _$rootScope_, _cmFilter_){
            scope = _$rootScope_.$new()

            element = angular.element('<span cm-show-on-filter="filterVar" cm-show-on-min-length="3"></span>')

            element = _$compile_(element)(scope)

            cmFilter = _cmFilter_

            scope.$digest()
        }));

        it('element should not have class "cm-show" on empty filter', function(){

            scope.filterVar = ''

            scope.$apply();

            expect(element.hasClass('cm-show')).toBe(false)
        })

        it('element should note have class "cm-show" when filter string is smaller then attributes var', function(){

            scope.filterVar = 'mo'

            scope.$apply();

            expect(element.hasClass('cm-show')).toBe(false)
        })

        it('element should have class "cm-show" when filter is long enough', function(){

            scope.filterVar = 'moe'

            scope.$apply();

            expect(element.hasClass('cm-show')).toBe(true)
        })

        it('element should not have class "cm-show" when cmFilter called clear function', function(){

            scope.filterVar = 'moep'

            scope.$apply();

            expect(element.hasClass('cm-show')).toBe(true)

            cmFilter.clear()

            expect(element.hasClass('cm-show')).toBe(false)
        })
    })

    describe('2. Test with cmShowOnEmptyList', function(){

        beforeEach(inject(function(_$compile_, _$rootScope_, _cmFilter_){
            scope = _$rootScope_.$new()

            element = angular.element('<span cm-show-on-filter="filterVar" cm-show-on-empty-list></span>')

            element = _$compile_(element)(scope)

            cmFilter = _cmFilter_

            scope.$digest()
        }));

        it('element should not have class "cm-show" on empty filter', function(){

            scope.filterVar = ''

            scope.$apply();

            expect(element.hasClass('cm-show')).toBe(false)
        })

        it('element should not have class "cm-show" when cmFilter has results', function(){

            scope.filterVar = 'moep'

            cmFilter.setResultLength(3)

            scope.$apply();

            expect(element.hasClass('cm-show')).toBe(false)
        })

        it('element should have class "cm-show" when cmFilter has no results', function(){

            scope.filterVar = 'moep'

            cmFilter.setResultLength(0)

            scope.$apply();

            expect(element.hasClass('cm-show')).toBe(true)
        })

        it('element should not have class "cm-show" when cmFilter called clear function', function(){

            scope.filterVar = 'moep'

            cmFilter.setResultLength(0)

            scope.$apply();

            expect(element.hasClass('cm-show')).toBe(true)

            cmFilter.clear()

            expect(element.hasClass('cm-show')).toBe(false)
        })
    })
});
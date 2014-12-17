'use strict';

describe("cmPristine combine with input drtv", function(){
    var cmPristine, element, form, input, scope,
        count_event_added, count_event_updated, count_event_removed

    beforeEach(function(){
        module('cmCore')
        module('cmValidate')
        inject(function (_cmPristine_) {
            cmPristine = _cmPristine_

            count_event_added = 0
            cmPristine.on('added', function(){ count_event_added++ })

            count_event_updated = 0
            cmPristine.on('updated', function(){ count_event_updated++ })

            count_event_removed = 0
            cmPristine.on('removed', function(){ count_event_removed++ })
        })
    })

    describe('check service api', function(){
        it('should exists a "add" method', function(){
            expect(typeof cmPristine.add).toBe('function')
        })

        it('should exists a "is" method', function(){
            expect(typeof cmPristine.is).toBe('function')
        })

        it('should exists a "set" method', function(){
            expect(typeof cmPristine.set).toBe('function')
        })

        it('should exists a "remove" method', function(){
            expect(typeof cmPristine.remove).toBe('function')
        })

        it('should exists a "reset" method', function(){
            expect(typeof cmPristine.reset).toBe('function')
        })

        it('should exists a "getAll" method', function(){
            expect(typeof cmPristine.getAll).toBe('function')
        })
    })

    describe('check "add" method, with one "valid" element', function(){
        beforeEach(inject(function(_$compile_, _$rootScope_){
            scope = _$rootScope_
            element = angular.element('<input name="email" ng-model="email" />')

            element = _$compile_(element)(scope)
            scope.$digest()
        }))

        it('there should be one element and cmPristine should return true', function(){
            scope.$apply()

            var items = cmPristine.getAll()

            expect(items.length).toBe(1)

            expect(count_event_added).toBe(1)

            expect(cmPristine.is()).toBe(true)
        })
    })

    describe('check "add" method, with two "valid" elements', function(){
        beforeEach(inject(function(_$compile_, _$rootScope_){
            scope = _$rootScope_
            element = angular.element('<form><input name="email" ng-model="email" /><input name="text" ng-model="text" /></form>')

            element = _$compile_(element)(scope)
            scope.$digest()
        }))

        it('should add elements on scope.apply', function(){
            var items = 0

            scope.$apply()

            items = cmPristine.getAll()

            expect(items.length).toBe(2)

            expect(count_event_added).toBe(2)

            expect(cmPristine.is()).toBe(true)
        })
    })

    describe('check "add" method, with one "invalid" element', function(){
        beforeEach(inject(function(_$compile_, _$rootScope_){
            scope = _$rootScope_
            element = angular.element('<input />')

            element = _$compile_(element)(scope)
            scope.$digest()
        }))

        it('there should be no element and cmPristine should return true', function(){
            scope.$apply()

            var items = cmPristine.getAll()

            expect(items.length).toBe(0)

            expect(count_event_added).toBe(0)

            expect(cmPristine.is()).toBe(true)
        })
    })

    describe('check "add" method, with one "valid" and one "invalid" element', function(){
        beforeEach(inject(function(_$compile_, _$rootScope_){
            scope = _$rootScope_
            element = angular.element('<form><input name="email" ng-model="email" /><input /></form>')

            element = _$compile_(element)(scope)
            scope.$digest()
        }))

        it('there should be no element and cmPristine should return true', function(){
            scope.$apply()

            var items = cmPristine.getAll()

            expect(items.length).toBe(1)

            expect(count_event_added).toBe(1)

            expect(cmPristine.is()).toBe(true)
        })
    })

    describe('check "is" method, with one "valid" element', function(){
        beforeEach(inject(function(_$compile_, _$rootScope_){
            scope = _$rootScope_
            element = angular.element('<input name="email" ng-model="email" />')

            element = _$compile_(element)(scope)
            scope.$digest()
        }))

        it('pristine should be false, after changing input value', function(){
            scope.$apply()

            var input = element[0];

            $(input).focus()
            $(input).val('moep')
            $(input).blur()

            expect(cmPristine.is()).toBe(false)

            expect(count_event_added).toBe(1)
            expect(count_event_updated).toBe(1)
        })

        it('pristine should be true, after changing value to init value', function(){
            scope.$apply()

            var input = element[0];

            $(input).focus()
            $(input).val('moep')
            $(input).blur()

            expect(cmPristine.is()).toBe(false)

            $(input).focus()
            $(input).val('')
            $(input).blur()

            expect(cmPristine.is()).toBe(true)

            expect(count_event_added).toBe(1)
            expect(count_event_updated).toBe(2)
        })
    })

    describe('check "is"" method, with two "valid" element', function(){
        beforeEach(inject(function(_$compile_, _$rootScope_){
            scope = _$rootScope_
            element = angular.element('<form><input name="email" ng-model="email" /><input name="text" ng-model="text" /></form>')

            element = _$compile_(element)(scope)
            scope.$digest()
        }))

        it('pristine should be false, if minimum one element change value', function(){
            scope.$apply()

            var input_email = element.find('input')[0]
            var input_text = element.find('input')[1]

            // change email value
            $(input_email).focus()
            $(input_email).val('moep')
            $(input_email).blur()

            expect(cmPristine.is()).toBe(false)

            // change text value
            $(input_text).focus()
            $(input_text).val('moep')
            $(input_text).blur()

            expect(cmPristine.is()).toBe(false)

            // remove email value
            $(input_email).focus()
            $(input_email).val('')
            $(input_email).blur()

            expect(cmPristine.is()).toBe(false)

            // remove text value
            $(input_text).focus()
            $(input_text).val('')
            $(input_text).blur()

            expect(cmPristine.is()).toBe(true)

            expect(count_event_added).toBe(2)
            expect(count_event_updated).toBe(4)
        })
    })

    describe('check "remove" method, with one "valid" element', function(){
        beforeEach(inject(function(_$compile_, _$rootScope_){
            scope = _$rootScope_
            element = angular.element('<input name="email" ng-model="email" />')

            element = _$compile_(element)(scope)
            scope.$digest()
        }))

        it('there should be no element after scope destroy', function(){
            scope.$apply()

            var items = cmPristine.getAll()

            expect(items.length).toBe(1)

            scope.$destroy()

            items = cmPristine.getAll()
            expect(items.length).toBe(0)

            expect(count_event_added).toBe(1)
            expect(count_event_removed).toBe(1)
        })
    })

    describe('check "remove" method, with two "valid" elements', function(){
        beforeEach(inject(function(_$compile_, _$rootScope_){
            scope = _$rootScope_
            element = angular.element('<form><input name="email" ng-model="email" /><input name="text" ng-model="text" /></form>')

            element = _$compile_(element)(scope)
            scope.$digest()
        }))

        it('there should be no element after scope destroy', function(){
            scope.$apply()

            var items = cmPristine.getAll()

            expect(items.length).toBe(2)

            scope.$destroy()

            items = cmPristine.getAll()
            expect(items.length).toBe(0)

            expect(count_event_added).toBe(2)
            expect(count_event_removed).toBe(2)
        })
    })

    describe('check "reset" method, with two "valid" elements', function(){
        beforeEach(inject(function(_$compile_, _$rootScope_){
            scope = _$rootScope_
            element = angular.element('<form><input name="email" ng-model="email" /><input name="text" ng-model="text" /></form>')

            element = _$compile_(element)(scope)
            scope.$digest()
        }))

        it('there should be no element after reset cmPristine', function(){
            scope.$apply()

            var items = cmPristine.getAll()

            expect(items.length).toBe(2)

            cmPristine.reset()

            items = cmPristine.getAll()
            expect(items.length).toBe(0)

            expect(count_event_added).toBe(2)
            expect(count_event_removed).toBe(0)
        })
    })
})

'use strict';

// thx to http://stackoverflow.com/questions/15219717/to-test-a-custom-validation-angular-directive
describe("Directive cmValidatePhone", function(){
    var element,
        form,
        input,
        scope

    beforeEach(module('cmConfig'))
    beforeEach(module('cmValidate'))
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new()
        element = angular.element('<form name="form"><input name="phone" cm-validate-phone ng-model="phone" /></form>')

        $compile(element)(scope)
        scope.$digest()
        form = scope.form
        input = angular.element('input', element)
    }))

    it('default should be valid', function(){
        expect(form.phone.$valid).toBe(true)
        expect(form.phone.$invalid).toBe(false)
    })

    it('should be valid, if element is empty', function(){
        scope.phone = ''
        scope.$apply()
        expect(form.phone.$valid).toBe(true)
        expect(form.phone.$invalid).toBe(false)
    })

    it('should be valid', function(){
        scope.phone = '123456'
        scope.$apply()
        expect(form.phone.$valid).toBe(true)
        expect(form.phone.$invalid).toBe(false)
    })

    it('should be invalid', function(){
        scope.phone = 'asd'
        scope.$apply()
        expect(form.phone.$valid).toBe(false)
        expect(form.phone.$invalid).toBe(true)
    })
})
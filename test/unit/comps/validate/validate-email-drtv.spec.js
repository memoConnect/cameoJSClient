'use strict';

// thx to http://stackoverflow.com/questions/15219717/to-test-a-custom-validation-angular-directive
describe("Directive cmValidateEmail ", function(){
    var element,
        form,
        input,
        scope

    beforeEach(module('cmCore',[
        'cmApiProvider',
        function(cmApiProvider){
            cmApiProvider
                .setWithoutApiUrl()
        }
    ]))
    beforeEach(module('cmConfig'))
    beforeEach(module('cmValidate'))

    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope
        element = angular.element('<form name="form"><input name="email" cm-validate-email ng-model="email" /></form>')

        element = $compile(element)(scope)
        scope.$digest()
        form = scope.form
        input = angular.element('input', element)
    }))

    it('default should be valid', function(){
        expect(form.email.$valid).toBe(true)
        expect(form.email.$invalid).toBe(false)
    })

    it('should be valid, if element is empty', function(){
        scope.email = ''
        scope.$apply()
        expect(form.email.$valid).toBe(true)
        expect(form.email.$invalid).toBe(false)
    })

    it('should be valid, if value is correct email form', function(){
        scope.email = 'moep@excample.com'
        scope.$apply()
        expect(form.email.$valid).toBe(true)
        expect(form.email.$invalid).toBe(false)
    })

    it('should be invalid, if value is incorrect', function(){
        scope.email = 'moep@example'
        scope.$apply()
        expect(form.email.$valid).toBe(false)
        expect(form.email.$invalid).toBe(true)
    })
})

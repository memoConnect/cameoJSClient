'use strict';

// thx to http://stackoverflow.com/questions/15219717/to-test-a-custom-validation-angular-directive
describe("Directive cmValidatePhone", function(){
    var element,
        form,
        input,
        scope,
        httpBackend;

    beforeEach(function(){
        module(function($provide){
            $provide.constant('cmEnv',{});
        })
    })

    beforeEach(module('cmValidate'))
    beforeEach(inject(function($compile, $rootScope, $httpBackend){
        httpBackend = $httpBackend;

        scope = $rootScope.$new();
        element = angular.element('<form name="form"><input name="phone" cm-validate-phone ng-model="phone" /></form>');

        $compile(element)(scope);
        scope.$digest();
        form = scope.form;
        input = angular.element('input', element)
    }))

    it('should be valid, if element is empty', function(){
        input.val('');
        input.blur();
        expect(form.phone.$valid).toBe(true);
        expect(form.phone.$invalid).toBe(false);
    })

    /**
     * TODO add MockUp Tests for httpBackend with Promises
     */
})
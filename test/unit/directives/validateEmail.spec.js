define([
    'angular-mocks'
], function () {
    'use strict';

    // thx to http://stackoverflow.com/questions/15219717/to-test-a-custom-validation-angular-directive
    describe("Directive cmValidateEmail ", function(){
        var element,
            form,
            scope;

        beforeEach(module('cmAuth'));

        beforeEach(inject(function($compile, $rootScope){
            scope = $rootScope;
            element = angular.element('<form name="form"><input name="email" cm-validate-email ng-model="email" /></form>');

            $compile(element)($rootScope);
            scope.$digest();
            form = scope.form;
        }));

        it('should be valid, if element is empty', function(){
            element.find('input').val('');
            element.find('input').blur();
            expect(form.email.$valid).toBe(true);
            expect(form.email.$invalid).toBe(false);
        });

        it('should be valid, if value is correct email form', function(){
            element.find('input').val('moep@excample.com');
            element.find('input').blur();
            expect(form.email.$valid).toBe(true);
            expect(form.email.$invalid).toBe(false);
        });

        it('should be invalid, if value is incorrect', function(){
            element.find('input').val('moep@example');
            element.find('input').blur();
            expect(form.email.$valid).toBe(false);
            expect(form.email.$invalid).toBe(true);
        });
    });
});

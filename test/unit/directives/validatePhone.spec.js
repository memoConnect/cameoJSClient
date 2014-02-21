define([
    'angular-mocks'
], function () {
    'use strict';

    // thx to http://stackoverflow.com/questions/15219717/to-test-a-custom-validation-angular-directive
    describe("Directive cmValidatePhone", function(){
        var element,
            form,
            scope,
            httpBackend,
            service;

        beforeEach(module('cmAuth'));

        beforeEach(inject(function($compile, $rootScope, $httpBackend, cmAuth){
            httpBackend = $httpBackend;

            scope = $rootScope;
            element = angular.element('<form name="form"><input name="phone" cm-validate-phone ng-model="phone" /></form>');

            $compile(element)($rootScope);
            scope.$digest();
            form = scope.form;

            service = cmAuth;
        }));

        it('should be valid, if element is empty', function(){
            element.find('input').val('');
            element.find('input').blur();
            expect(form.phone.$valid).toBe(true);
            expect(form.phone.$invalid).toBe(false);
        });


        /**
         * TODO add MockUp Tests for httpBackend with Promises
         */
    });
});

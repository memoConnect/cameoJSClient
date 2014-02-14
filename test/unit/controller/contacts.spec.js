define(['_c/contacts', 'angularAMD'], function (app, angularAMD) {
    'use strict';

    describe('ContactsCtrl', function () {
        var $scope, ctrl;

        angularAMD.inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            ctrl = $controller('ContactsCtrl', { $scope: $scope });
        });

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        });

    });

    xdescribe('Directive cameo search',function(){
        var element, scope;

//        beforeEach(module('cameoClient'));

//        beforeEach(module('tpl/modules/contacts/cm-search-cameo-id.html'));

        angularAMD.inject(function($rootScope, $compile) {
            element = angular.element('<div cm-search-cameo-id></div>');
            scope = $rootScope.$new();

            $compile(element)(scope);
            scope.$digest();
        });

        it('results should be empty',function(){
            console.log(scope)
            expect(scope.results.length).toBe(0);
        });

        it('results should have the amount of mock',function(){
            scope.results = ['derMicha','dasEmpu','dutscher','reimerei','rhotp'];

            var list = element.find('li');
            expect(list.length).toBe(5);
        })

    })
})
define([
    'app',
    'angularAMD',
    'comps/point-spinner/point-spinner-drtv'
], function (app, angularAMD) {
    'use strict';

    //<span cm-point-spinner></span>

    describe('Directive cmPointSpinner', function () {

        describe('default',function(){
            var $scopeDirv, directive;
            angularAMD.inject(function ($rootScope, $compile) {
                directive = angular.element('<div cm-point-spinner></div>');
                directive = $compile(directive)($rootScope);
                $rootScope.$digest();

                $scopeDirv = directive.scope();
            });

            it('should load template',function(){
                expect(directive.html()).not.toBe('');
            });

            it('isIdle should be false',function(){
                expect($scopeDirv.isIdle).toBeFalsy();
            });

            it('points should be empty',function(){
                expect($scopeDirv.points).toBe('');
            });
        });
    });
});
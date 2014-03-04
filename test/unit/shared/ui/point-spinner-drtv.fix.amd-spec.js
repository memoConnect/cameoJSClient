'use strict';

//<span cm-point-spinner></span>

describe('Directive cmPointSpinner', function () {

    var el,
        scope

    beforeEach(module('cmUi'))
    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new()
        el = angular.element('<div cm-point-spinner></div>');
        el = $compile(el)(scope);
        scope.$digest()
    }))

    it('should load template',function(){
        expect(el.html()).not.toBe('');
    });

    it('isIdle should be false',function(){
        expect(el.scope().isIdle).toBeFalsy();
    });

    it('points should be empty',function(){
        expect(el.scope().points).toBe('');
    });
});
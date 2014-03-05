'use strict';

//<div cm-spinner></div>
describe('Directive cmSpinner', function () {
    var el,
        scope;

    beforeEach(module('cmUi'));

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        el =  angular.element('<div cm-spinner></div>');
        el = $compile(el)(scope);
        scope.$digest();
    }));

    it('should load template',function(){
        expect(el.html()).not.toBe('');
    });

    /**
     * TODO test Broadcast?
     */
});
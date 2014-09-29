'use strict';

describe('Directive cmLoader', function () {
    var el,
        scope

    beforeEach(module('cmUi'))

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new()
        el =  angular.element('<cm-loader></cm-loader>')
        el = $compile(el)(scope)
        scope.$digest()
    }))

    it('should load template',function(){
        expect(el.html()).not.toBe('')
    })

    /**
     * TODO test Broadcast?
     */
});
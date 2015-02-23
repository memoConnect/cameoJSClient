'use strict';

describe('Directive cmEnter', function () {
    var element,
        scope

    // example:
    // <input cm-enter="doFunc()" />

    beforeEach(function () {
        module('cmUi')
        module('cmConfig')
    })

    function createDrtv(html, _scope_){
        inject(function ($rootScope, $compile) {
            scope = _scope_ || $rootScope.$new()
            element = angular.element(html)
            element = $compile(element)(scope)
            scope.$digest()
        })
    }

    it('onkeydown callbacks should be called',function(){
        var whoop1,
            whoop1Be = 'jojodat',
            whoop2,
            whoop2Be = 'törööö'

        createDrtv('<input cm-enter="anyFunction()" />')

        scope.$on('cmEnter:pressed', function(){
            whoop2 = whoop2Be
        })

        scope.anyFunction = function(){
            whoop1 = whoop1Be
        }

        var e = $.Event('keydown')
            e.keyCode = 13
        $(element).trigger(e)

        expect(whoop1).toBe(whoop1Be)
        expect(whoop2).toBe(whoop2Be)
    })
})
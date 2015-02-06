'use strict';

describe('Directive cmSendOnReturn', function () {
    var element,
        scope,
        $rootScope

    // example:
    // <input cm-send-on-return />

    function createDrtv(html, _scope_) {
        inject(function (_$rootScope_, $compile) {
            $rootScope = _$rootScope_
            scope = _scope_ || $rootScope.$new()
            element = angular.element(html)
            element = $compile(element)(scope)
            scope.$digest()
        })
    }

    function createIt() {
        whoop,
        whoopBe = 'tralalala'

        createDrtv('<input cm-send-on-return />')

        $rootScope.$on('sendOnReturn', function () {
            whoop = whoopBe
        })

        var e = $.Event('keydown');
        e.keyCode = 13;
        e.shiftKey = false;
        $(element).trigger(e)
    }

    var whoop,
        whoopBe

    describe('settings false',function(){
        beforeEach(function () {
            module('cmUi', function ($provide) {
                $provide.factory('cmSettings', function () {
                    return {is: function () { return false }}
                })
            })
            module('cmConfig')
        })

        it('onkeydown callback shouldnt called', function () {
            createIt()

            expect(whoop).toBe(whoop)
        })
    })

    describe('settings true',function(){
        beforeEach(function () {
            module('cmUi', function ($provide) {
                $provide.factory('cmSettings', function () {
                    return {is: function () { return true }}
                })
            })
            module('cmConfig')
        })

        it('onkeydown callback shouldnt called', function () {
            createIt()

            expect(whoop).toBe(whoopBe)
        })
    })
})
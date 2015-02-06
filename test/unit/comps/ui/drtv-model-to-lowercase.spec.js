'use strict';

describe('Directive cmModelToLowercase', function () {
    var input,
        scope

    // example:
    // <input ng-model="any" cm-model-to-lowercase />

    beforeEach(function () {
        module('cmUi')
        module('cmConfig')
    })

    function createDrtv(html, _scope_){
        inject(function ($rootScope, $compile) {
            scope = _scope_ || $rootScope.$new()
            input = angular.element(html)
            input = $compile(input)(scope)
            scope.$digest()
        })
    }

    it('uppercase text should be lowercase',function(){
        createDrtv('<form name="form"><input name="input" ng-model="uppercase" cm-model-to-lowercase></textarea></form>')

        scope.form.input.$setViewValue('HALLOREN KUGEL')

        scope.$digest()

        expect(scope.uppercase).toBe('halloren kugel')
    })
})
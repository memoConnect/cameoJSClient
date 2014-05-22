'use strict';

describe('Directive cmProgressbar', function () {
    var el,
        scope

    //<cm-progressbar cm-percent="progress" ng-if="file.state != 'cached'"></cm-progressbar>

    beforeEach(module('cmUi'))

    function createDrtv(html){
        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new()
            el =  angular.element(html)
            el = $compile(el)(scope)
            scope.$digest()
        })
    }

    it('default should have 0%',function(){
        createDrtv('<cm-progressbar></cm-progressbar>')

        expect(el.find('.percent').text()).toBe('0%')
        expect(el.find('.progressbar').css('width')).toBe('0%')
    })

    it('with param percent', function(){
        createDrtv('<cm-progressbar cm-percent="progress"></cm-progressbar>')

        scope.progress = 0.5
        scope.$digest()

        expect(el.find('.percent').text()).toBe('50%')
        expect(el.find('.progressbar').css('width')).toBe('50%')

        scope.progress = 1.3
        scope.$digest()

        expect(el.find('.percent').text()).toBe('100%')
        expect(el.find('.progressbar').css('width')).toBe('100%')
    })

    it('with param percent and hundret times disabled', function(){
        createDrtv('<cm-progressbar cm-percent="progress" cm-hundret-times="false"></cm-progressbar>')

        scope.progress = 50
        scope.$digest()

        expect(el.find('.percent').text()).toBe('50%')
        expect(el.find('.progressbar').css('width')).toBe('50%')

        scope.progress = 103
        scope.$digest()

        expect(el.find('.percent').text()).toBe('100%')
        expect(el.find('.progressbar').css('width')).toBe('100%')
    })

})
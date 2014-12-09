'use strict';

describe('Directive cmResizeTextarea', function () {
    var area,
        shadow,
        scope,
        oneLine = 'moep moepppp moeepp meopp meow',
        $httpBackend

    // example:
    // <textarea cm-resize-textarea cm-max-rows="number" ng-model="any"></textarea>

    beforeEach(function(){
        module(function($provide){
            $provide.constant('cmEnv',{});
        })
    })

    beforeEach(module('cmUi'))

    beforeEach(inject(function(_$httpBackend_){
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('/account').respond({});
    }))

    function createDrtv(html, _scope_){
        inject(function ($rootScope, $compile) {
            scope = _scope_ || $rootScope.$new()
            area =  angular.element(html)
            area = $compile(area)(scope)
            shadow = area.next()
            scope.$digest()
        })
    }

    it('default should have one row and no value',function(){
        createDrtv('<textarea cm-resize-textarea></textarea>')

        expect(area.attr('rows')).toBe('1')
        expect(area.val()).toBe('')
        expect(shadow.html()).toBe('')
    })

    it('shadow should be invisible',function(){
        createDrtv('<textarea cm-resize-textarea></textarea>')

        expect(shadow.css('left')).toContain('-10000')
        expect(shadow.css('top')).toContain('-10000')
    })

    // in unit tests only can check one row
    it('check cm-rows calculation',function(){
        createDrtv('<textarea cm-resize-textarea style="width:100px"></textarea>')

        expect(area.val(oneLine).trigger('change').attr('rows')).toBe('1')
        expect(shadow.html()).toBe(oneLine)
    })

    it('check ng-model handling',inject(function ($rootScope) {
        scope = $rootScope.$new();
        createDrtv('<textarea cm-resize-textarea ng-model="moep" style="width:100px"></textarea>', scope)

        expect(area.val()).toBe('')

        scope.moep = oneLine
        scope.$digest();

        expect(area.val()).toBe(oneLine)

        scope.moep = ''
        scope.$digest();

        expect(area.val()).toBe('')
    }))
})
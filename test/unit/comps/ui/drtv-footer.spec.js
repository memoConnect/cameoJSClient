'use strict';

describe('Directive cmFooter', function () {
    var $el,
        $scope,
        $rootScope,
        $location

    beforeEach(function(){
        module(function($provide){
            $provide.constant('cmConfig',{
                footer: {
                    'hoop': {i18n:'ABC',icon:'moep'},
                    'hopp': {i18n:'DEF',icon:'moep2'},
                    'hppp': {i18n:'GHI',icon:'moep3'}
                }
            })
        })
    })

    beforeEach(module('cmUi'))

    beforeEach(inject(function (_$rootScope_, $compile, _$location_) {
        $rootScope = _$rootScope_
        $location = _$location_
        $scope = $rootScope.$new()
        $el =  angular.element('<cm-footer></cm-footer>')
        $compile($el)($scope)
        $scope.$digest()
    }))

    it('should load template',function(){
        expect($el.html()).not.toBe('')
    })

    it('have 3 default btns',function(){
        expect(Object.keys($scope.btns).length).toEqual(3)
    })

    describe('check location',function(){
        it('is empty toEqual 0 active',function(){
            expect($el.find('.active').length).toEqual(0)
        })

        xit('talks setted toEqual 1 active',function(){
            expect($el.find('.active').length).toEqual(1)
        })
    })
})
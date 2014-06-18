'use strict';

describe('Directive cmFooter', function () {
    var $el,
        $scope,
        $rootScope,
        $location

    beforeEach(module('cmUi'))

    beforeEach(inject(function (_$rootScope_, $compile, _$location_) {
        $rootScope = _$rootScope_
        $location = _$location_
        $scope = $rootScope.$new()
        $el =  angular.element('<footer cm-footer></footer>')
        $compile($el)($scope)
        $scope.$digest()
    }))

    it('should load template',function(){
        expect($el.html()).not.toBe('')
    })

    it('have 3 default btns',function(){
        expect($scope.btns.length).toEqual(3)
    })

    describe('check location',function(){
        it('is empty toEqual 0 active',function(){
            expect($el.find('.active').length).toEqual(0)
        })

        xit('talks setted toEqual 1 active',function(){
//            console.log($location.path())
            expect($el.find('.active').length).toEqual(1)
        })
    })
})
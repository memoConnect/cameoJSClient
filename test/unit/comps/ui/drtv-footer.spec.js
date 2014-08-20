'use strict';

describe('Directive cmFooter', function () {
    var $el,
        $scope

    function createDrtv(html){
        inject(function ($rootScope, $compile) {
            $scope = $rootScope.$new()
            $el = angular.element(html || '<cm-footer></cm-footer>')
            $compile($el)($scope)
            $scope.$digest()
        })
    }

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

    //footer directive works differently now.
    console.log('test removed')
    xdescribe('with transclude informations', function() {
        beforeEach(function(){
            createDrtv()
        })

        it('should load template', function () {
            expect($el.html()).not.toBe('')
        })

        it('ng-translate should be empty', function () {
            expect($el.find('[ng-transclude]').html()).toBe('')
        })

        it('have 3 default btns', function () {
            expect($el.find('a').length).toEqual(3)
        })
    })

    console.log('test removed')
    xdescribe('with transclude informations', function(){
        beforeEach(function(){
            createDrtv('<cm-footer>i\'am <strong>moep</strong></cm-footer>')
        })

        it('should have filled ng-transclude container', function(){
            expect($el.find('[ng-transclude]').text()).toBe('i\'am moep')
            expect($el.find('[ng-transclude] strong').length).toEqual(1)
        })

        it('default btns are away', function(){
            expect($el.find('a').length).toEqual(0)
        })
    })
})
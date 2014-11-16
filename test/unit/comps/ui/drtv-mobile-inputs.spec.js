'use strict';

/**
 * @depracted
 */
console.log('removed test')
xdescribe('mobile-inputs', function () {
    var $fixedElements,
        $input

    function createFixxedElements(){
        beforeEach(inject(function ($compile, $rootScope, $document) {
            var scope = $rootScope.$new()
            $fixedElements = $compile('<cm-header style="position:fixed"></cm-header>' +
                                      '<cm-footer style="position:fixed"></cm-footer>')(scope)
            angular.element($document[0].body).append($fixedElements)
        }))

        afterEach(function(){
            $fixedElements.remove()
        })
    }

    function createInput(cmEnv){
        beforeEach(module(function($provide){
            $provide.constant('cmEnv',cmEnv)
        }))

        createFixxedElements()

        beforeEach(inject(function($compile, $rootScope){
            var scope = $rootScope.$new()
            $input = $compile('<input type="text" name="" value="" />')(scope);
        }))
    }

    beforeEach(module('cmConfig'))
    beforeEach(module('cmUi'))

    describe('check desktop input ignore drtv', function(){
        createInput({
            isNotMobile: true
        })

        it('onfocus should happen nothing', function(){
            expect($($fixedElements[0]).css('position')).toBe('fixed')
            expect($($fixedElements[1]).hasClass('ng-hide')).toBeFalsy()

            $input.triggerHandler('focus')

            expect($($fixedElements[0]).css('position')).toBe('fixed')
            expect($($fixedElements[1]).hasClass('ng-hide')).toBeFalsy()

            $input.triggerHandler('blur')

            expect($($fixedElements[0]).css('position')).toBe('fixed')
            expect($($fixedElements[1]).hasClass('ng-hide')).toBeFalsy()
        })
    })

    console.log('changed test')
    //changed expected class
    describe('check mobile input compile the drtv', function(){
        createInput({
            isNotMobile: false
        })

        it('onfocus should unfixed header and hide footer', function(){
            expect($($fixedElements[0]).css('position')).toBe('fixed')

            $input.triggerHandler('focus')

            expect($($fixedElements[0]).css('position')).toBe('absolute')
            expect($($fixedElements[1]).hasClass('defixed')).toBeTruthy()       //Todo: changed class

            $input.triggerHandler('blur')

            expect($($fixedElements[0]).css('position')).toBe('fixed')
            expect($($fixedElements[1]).hasClass('defixed')).toBeFalsy()    //Todo: changed class
        })
    })

})
'use strict';

describe('mobile-inputs', function () {
    var $document,
        $compile,
        $rootScope

    function createHTML(cmEnv){
        beforeEach(function(){

//            module(function($provide){
//                $provide.constant('cmConfig',{})
//                $provide.constant('cmEnv',cmEnv)
//
//                $document = angular.element(document) // This is exactly what Angular does
//                $document.find('body')
//                    .append('<cm-header style="position:fixed"></cm-header>' +
//                        '<cm-footer style="position:fixed"></cm-footer>' +
//                        '<input type="text" name="" value="" />')
//
//                $compile($document)($rootScope)
//
//                $rootScope.$digest()
//
//                $provide.value('$document', $document)
//            })

            module('cmUi')
        })

        afterEach(function() {
//            $document.find('body').html('');
        })
    }

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_
        $rootScope = _$rootScope_
    }))

    xdescribe('check desktop input', function(){
        createHTML({
            isNotMobile: true
        })

        it('onfocus should happen nothing', function(){
            expect($document.find('cm-header').css('position')).toBe('fixed')
            expect($document.find('cm-footer').hasClass('ng-hide')).toBeFalsy()

            $document.find('input').focus()

            expect($document.find('cm-header').css('position')).toBe('fixed')
            expect($document.find('cm-footer').hasClass('ng-hide')).toBeFalsy()

            $document.find('input').blur()

            expect($document.find('cm-header').css('position')).toBe('fixed')
            expect($document.find('cm-footer').hasClass('ng-hide')).toBeFalsy()
        })
    })

    describe('check mobile input', function(){
        createHTML({
            isNotMobile: false
        })

        it('onfocus should unfixed header and hide footer', function(){
            console.log($document)
//            expect($document.find('cm-header').css('position')).toBe('fixed')
//
//            $document.find('input').focus()
//
//            expect($document.find('cm-header').css('position')).toBe('absolute')
//            expect($document.find('cm-footer').hasClass('ng-hide')).toBeTruthy()
//
//            $document.find('input').blur()
//
//            expect($document.find('cm-header').css('position')).toBe('fixed')
//            expect($document.find('cm-footer').hasClass('ng-hide')).toBeFalsy()
        })
    })

    xdescribe('huhu',function(){
        it('huhuhuhu', function(){
            console.log($compile)
        })
    })

})
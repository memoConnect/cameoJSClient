'use strict';

var cmKeyboard,
    $rootScope,
    $window

var $cordovaMock = {
    plugins: {
        Keyboard: {
            show: function(){},
            close: function(){},
            disableScroll: function(){}
        }
    }
}

describe('cmKeyboard default none app', function() {
    beforeEach(function () {
        module('cmPhonegap', function ($provide) {
            $provide.factory('$cordova', function () {
                return $cordovaMock;
            })
        })
        inject(function (_cmKeyboard_) {
            cmKeyboard = _cmKeyboard_
        })
    })

    it('should be defined', function () {
        expect(cmKeyboard).toBeDefined()
    })

    it('var plugin should be null', function(){
        expect(cmKeyboard.plugin).toBe(null)
    })

    describe('method init', function(){
        it('should be defined', function(){
            expect(cmKeyboard.init).toBeDefined()
        })
    })

    describe('method scroll', function(){
        it('should be defined', function(){
            expect(cmKeyboard.scroll).toBeDefined()
        })

        beforeEach(function(){
            spyOn($cordovaMock.plugins.Keyboard, 'disableScroll');
        })

        it('should return false', function(){
            expect(cmKeyboard.scroll()).toBeFalsy()
            expect($cordovaMock.plugins.Keyboard.disableScroll).not.toHaveBeenCalled()
        })
    })

    describe('method close', function(){
        it('should be defined', function(){
            expect(cmKeyboard.close).toBeDefined()
        })

        beforeEach(function(){
            spyOn($cordovaMock.plugins.Keyboard, 'close');
        })

        it('should return false', function(){
            expect(cmKeyboard.close()).toBeFalsy()
            expect($cordovaMock.plugins.Keyboard.close).not.toHaveBeenCalled()
        })
    })

    describe('method show', function(){
        it('should be defined', function(){
            expect(cmKeyboard.show).toBeDefined()
        })

        beforeEach(function(){
            spyOn($cordovaMock.plugins.Keyboard, 'show');
        })

        it('should return false', function(){
            expect(cmKeyboard.show()).toBeFalsy()
            expect($cordovaMock.plugins.Keyboard.show).not.toHaveBeenCalled()
        })
    })

    describe('method focusLast', function(){
        it('should be defined', function(){
            expect(cmKeyboard.focusLast).toBeDefined()
        })

        it('should return false', function(){
            expect(cmKeyboard.focusLast()).toBeFalsy()
        })
    })
})

describe('cmKeyboard is app', function() {
    beforeEach(function () {
        module('cmPhonegap', function ($provide) {
            $provide.factory('$phonegapCameoConfig', function () {
                return {
                    deviceReady: true
                }
            })
            $provide.factory('$cordova', function () {
                return $cordovaMock;
            })
        })
        inject(function (_cmKeyboard_, _$rootScope_, _$window_) {
            cmKeyboard = _cmKeyboard_
            $rootScope = _$rootScope_
            $window = _$window_
        })
    })

    it('var plugin should be not null', function(){
        expect(cmKeyboard.plugin).not.toBe(null)
    })

    describe('method init and locationChange event', function() {
        beforeEach(function(){
            spyOn($cordovaMock.plugins.Keyboard, 'close');
        })

        it('init should init events', function () {
            $rootScope.$broadcast('$locationChangeStart')
            expect($cordovaMock.plugins.Keyboard.close).toHaveBeenCalled()
            expect($rootScope.lastFocus).toBe(undefined)
        })
    })

    describe('method init check events', function() {
        var whoop1,
            whoop1Be = 'juhu',
            whoop2,
            whoop2Be = 'juhubuhuh'

        it('init should init init hide event', function () {
            cmKeyboard.on('hidden', function () {
                whoop1 = whoop1Be
            })

            var event = $.Event('native.keyboardhide')
            $($window).trigger(event)

            expect(whoop1).toBe(whoop1Be)
        })

        it('init should init init show event', function () {
            cmKeyboard.on('visible', function () {
                whoop2 = whoop2Be
            })

            var event = $.Event('native.keyboardshow')
            $($window).trigger(event)

            expect(whoop2).toBe(whoop2Be)
        })
    })

    describe('method show', function(){
        beforeEach(function(){
            spyOn($cordovaMock.plugins.Keyboard, 'show');
        })

        it('should be true and have been called', function(){
            expect(cmKeyboard.show()).toBeTruthy()
            expect($cordovaMock.plugins.Keyboard.show).toHaveBeenCalled()
        })
    })

    describe('method close', function(){
        beforeEach(function(){
            spyOn($cordovaMock.plugins.Keyboard, 'close');
        })

        it('should be true and have been called', function(){
            expect(cmKeyboard.close()).toBeTruthy()
            expect($cordovaMock.plugins.Keyboard.close).toHaveBeenCalled()
        })
    })

    describe('method scroll', function(){
        beforeEach(function(){
            spyOn($cordovaMock.plugins.Keyboard, 'disableScroll');
        })

        it('should be true and have been called', function(){
            expect(cmKeyboard.scroll()).toBeTruthy()
            expect($cordovaMock.plugins.Keyboard.disableScroll).toHaveBeenCalled()
        })
    })
})
'use strict';

var cmPhonegap

describe('cmPhonegap default none app', function() {
    beforeEach(function () {
        module('cmPhonegap', function ($provide) {
            $provide.factory('$phonegapCameoConfig', function () {
                return undefined
            })
        })
    })
    beforeEach(inject(function (_cmPhonegap_) {
        cmPhonegap = _cmPhonegap_
    }))

    it('should be defined', function () {
        expect(cmPhonegap).toBeDefined()
    })

    describe('method isReady', function () {
        it('should be defined', function () {
            expect(cmPhonegap.isReady).toBeDefined()
        })

        it('should return false', function () {
            expect(cmPhonegap.isReady()).toBeFalsy()
        })
    })

    describe('method initCloseApp', function () {
        it('should be defined', function () {
            expect(cmPhonegap.initCloseApp).toBeDefined()
        })

        it('should return false', function () {
            expect(cmPhonegap.initCloseApp()).toBeFalsy()
        })
    })
})

describe('cmPhonegap is app', function() {
    beforeEach(function () {
        module('cmPhonegap', function ($provide) {
            $provide.factory('$phonegapCameoConfig', function () {
                return {
                    deviceReady: false
                }
            })

            $provide.factory('$navigator', function () {
                return {
                    app: {
                        exitApp: function(){

                        }
                    }
                }
            })
        })
    })
    beforeEach(inject(function (_cmPhonegap_) {
        cmPhonegap = _cmPhonegap_
    }))

    it('should be defined', function () {
        expect(cmPhonegap).toBeDefined()
    })

    xdescribe('method isReady', function () {
        it('after dom:event deviceready should be ready', function(){
            var initFunction = false

            cmPhonegap.isReady(function(){
                initFunction = true
            })
            //http://stackoverflow.com/questions/17264376/testing-the-handling-of-a-custom-event-in-jasmine
            expect(initFunction).toBeFalsy()
            console.log('trigger')
            $(document).trigger('deviceready')
            expect(initFunction).toBeTruthy()
        })
    })

    xdescribe('method initCloseApp', function () {
        it('after dom:event backbutton exit app called', function () {
            expect(cmPhonegap.initCloseApp()).toBeFalsy()
        })
    })
})
'use strict';

var cmPhonegap

describe('cmPhonegap default none app', function() {
    beforeEach(function () {
        module('cmPhonegap', function ($provide) {
            $provide.factory('$phonegapCameoConfig', function () {
                return 'undefined'
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

    describe('method initDeviceButtons', function () {
        it('should be defined', function () {
            expect(cmPhonegap.initDeviceButtons).toBeDefined()
        })

        it('should return false', function () {
            expect(cmPhonegap.initDeviceButtons()).toBeFalsy()
        })
    })
})

describe('cmPhonegap is app', function() {

    var $rootScope,
        $phonegapCameoConfig = {
            deviceReady: false
        }

    beforeEach(function () {
        module('cmPhonegap', function ($provide) {
            $provide.factory('$phonegapCameoConfig', function () {
                return $phonegapCameoConfig
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

    describe('method isReady', function() {
        var spy = {
            promiseCallback: function() {
                console.log('ready event triggered')
            },
            directlyCallback: function(){
                console.log('ready event is already triggered')
            }
        }

        beforeEach(inject(function (_cmPhonegap_, _$rootScope_) {
            cmPhonegap = _cmPhonegap_
            $rootScope = _$rootScope_
        }))

        it('fast ready function go to promise queue and wait for "deviceready"', function(){
            spyOn(spy, 'promiseCallback')
            cmPhonegap.isReady(spy.promiseCallback)
            // trigger event
            var event = document.createEvent('HTMLEvents')
            event.initEvent('deviceready', true, true)
            document.dispatchEvent(event)
            $rootScope.$apply()

            expect(spy.promiseCallback).toHaveBeenCalled()
        })

        it('after "deviceready" called without proise',function(){
            spyOn(spy, 'directlyCallback')
            cmPhonegap.isReady(spy.directlyCallback)
            expect(spy.directlyCallback).toHaveBeenCalled()
        })

    })

    xdescribe('method initDeviceButtons', function () {
        it('after dom:event backbutton exit app called', function () {
            expect(cmPhonegap.initDeviceButtons()).toBeFalsy()
        })
    })
})
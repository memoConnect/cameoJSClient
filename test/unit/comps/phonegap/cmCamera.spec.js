'use strict';

var cmCamera,
    $rootScope,
    unknown = 'unknown'

describe('cmCamera default none app', function() {
    beforeEach(function () {
        module('cmPhonegap', function ($provide) {
            $provide.factory('$navigator', function () {
                return 'undefined'
            })
        })
    })
    beforeEach(inject(function (_cmCamera_) {
        cmCamera = _cmCamera_
    }))

    it('should be defined', function () {
        expect(cmCamera).toBeDefined()
    })

    describe('method existsPlugin', function(){
        it('should be defined', function(){
            expect(cmCamera.existsPlugin).toBeDefined()
        })

        it('should be false', function(){
            expect(cmCamera.existsPlugin()).toBeFalsy()
        })
    })

    describe('method takePhoto', function(){
        it('should be defined', function(){
            expect(cmCamera.takePhoto).toBeDefined()
        })

        it('should be false', function(){
            expect(cmCamera.takePhoto()).toBeFalsy()
        })
    })

    describe('method chooseFile', function(){
        it('should be defined', function(){
            expect(cmCamera.chooseFile).toBeDefined()
        })

        it('should be false', function(){
            expect(cmCamera.chooseFile()).toBeFalsy()
        })
    })

})

describe('cmCamera is app', function() {
    beforeEach(function () {
        module('cmPhonegap', function ($provide) {
            $provide.factory('$phonegapCameoConfig', function () {
                return {
                    deviceReady: true
                }
            })
            $provide.factory('$navigator', function () {
                return {
                    camera: {
                        getPicture: function(callback, _null_, options){

                        }
                    }
                }
            })
            $provide.factory('$window', function(){
                return {
                    resolveLocalFileSystemURL: function(fileUrl, callback){

                    }
                }
            })
        })
    })
    beforeEach(inject(function (_cmCamera_) {
        cmCamera = _cmCamera_
    }))

    describe('method existsPlugin', function(){
        it('should be true', function(){
            expect(cmCamera.existsPlugin()).toBeTruthy()
        })
    })

    describe('method takePhoto', function(){
        it('should be false', function(){
            expect(cmCamera.takePhoto()).toBeTruthy()
        })
    })

    describe('method chooseFile', function(){
        it('should be false', function(){
            expect(cmCamera.chooseFile()).toBeTruthy()
        })
    })
})
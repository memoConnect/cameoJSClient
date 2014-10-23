'use strict';

var cmDevice,
    unknown = 'unknown'

    describe('cmDevice default none app', function(){
        beforeEach(function () {
            module('cmPhonegap', function ($provide) {
                $provide.factory('$device', function () {
                    return undefined
                })
            })
        })
        beforeEach(inject(function (_cmDevice_) {
            cmDevice = _cmDevice_
        }))

        it('should be defined', function(){
            expect(cmDevice).toBeDefined()
        })

        describe('var debug',function(){
            it('should be defined',function(){
                expect(cmDevice.debug).toBeDefined()
            })

            it('should be false on default',function(){
                expect(cmDevice.debug).toBeFalsy()
            })
        })

        describe('method existsPlugin',function(){
            it('should be defined',function(){
                expect(cmDevice.existsPlugin).toBeDefined()
            })

            it('should return false on default',function(){
                expect(cmDevice.existsPlugin()).toBeFalsy()
            })
        })

        describe('method getPlatform',function(){
            it('should be defined',function(){
                expect(cmDevice.getPlatform).toBeDefined()
            })

            it('should return unknown on default',function(){
                expect(cmDevice.getPlatform()).toBe(unknown)
            })
        })

        describe('method isApp',function(){
            it('should be defined',function(){
                expect(cmDevice.isApp).toBeDefined()
            })

            it('should return false on default',function(){
                expect(cmDevice.isApp()).toBeFalsy()
            })
        })

        describe('method isAndroid',function(){
            it('should be defined',function(){
                expect(cmDevice.isAndroid).toBeDefined()
            })

            it('should return false on default',function(){
                expect(cmDevice.isAndroid()).toBeFalsy()
            })
        })

        describe('method isiOS',function(){
            it('should be defined',function(){
                expect(cmDevice.isiOS).toBeDefined()
            })

            it('should return false on default',function(){
                expect(cmDevice.isiOS()).toBeFalsy()
            })
        })

        describe('method isWinPhone',function(){
            it('should be defined',function(){
                expect(cmDevice.isWinPhone).toBeDefined()
            })

            it('should return false on default',function(){
                expect(cmDevice.isWinPhone()).toBeFalsy()
            })
        })

        describe('method isWinPhone8',function(){
            it('should be defined',function(){
                expect(cmDevice.isWinPhone8).toBeDefined()
            })

            it('should return false on default',function(){
                expect(cmDevice.isWinPhone8()).toBeFalsy()
            })
        })

        describe('method isBlackBerry',function(){
            it('should be defined',function(){
                expect(cmDevice.isBlackBerry).toBeDefined()
            })

            it('should return false on default',function(){
                expect(cmDevice.isBlackBerry()).toBeFalsy()
            })
        })

        describe('method isAmazonFireOS',function(){
            it('should be defined',function(){
                expect(cmDevice.isAmazonFireOS).toBeDefined()
            })

            it('should return false on default',function(){
                expect(cmDevice.isAmazonFireOS()).toBeFalsy()
            })
        })

        describe('method getCurrentOS',function(){
            it('should be defined',function(){
                expect(cmDevice.getCurrentOS).toBeDefined()
            })

            it('should return false on default',function(){
                expect(cmDevice.getCurrentOS()).toBe(unknown)
            })
        })

        describe('method getId',function(){
            it('should be defined',function(){
                expect(cmDevice.getId).toBeDefined()
            })

            it('should return false on default',function(){
                expect(cmDevice.getId()).toBe(unknown)
            })
        })

        describe('method getName',function(){
            it('should be defined',function(){
                expect(cmDevice.getName).toBeDefined()
            })

            it('should return false on default',function(){
                expect(cmDevice.getName()).toBe(unknown)
            })
        })

        describe('method getVersion',function(){
            it('should be defined',function(){
                expect(cmDevice.getVersion).toBeDefined()
            })

            it('should return false on default',function(){
                expect(cmDevice.getVersion()).toBe(unknown)
            })
        })
        describe('method detectOSAndBrowser',function(){
            it('should be defined', function(){
                expect(cmDevice.detectOSAndBrowser).toBeDefined()
            })

            it('should return an object',function(){
                expect(typeof cmDevice.detectOSAndBrowser()).not.toBe('undefined')
                expect(typeof cmDevice.detectOSAndBrowser()).toBe('object')
            })
        })
    })

    describe('cmDevice is app',function(){

        var deviceMock = {
            platform: 'android ios win win32nt blackberry amazon-fireos',
            uuid: '12345',
            name: 'moep',
            version: '1.2.3'
        }

        beforeEach(function () {
            module('cmPhonegap', function ($provide) {
                $provide.factory('$phonegapCameoConfig', function () {
                    return {deviceReady:true}
                })
                $provide.factory('$device', function () {
                    return {
                        get:function(){
                            return deviceMock
                        }
                    }
                })
            })
        })
        beforeEach(inject(function (_cmDevice_) {
            cmDevice = _cmDevice_
        }))

        describe('method existsPlugin',function(){
            it('should return true',function(){
                expect(cmDevice.existsPlugin()).toBeTruthy()
            })
        })

        describe('method getPlatform',function(){
            it('should return active platform',function(){
                expect(cmDevice.getPlatform()).toBe(deviceMock.platform)
            })
        })

        describe('method isApp',function(){
            it('should return true',function(){
                expect(cmDevice.isApp()).toBeTruthy()
            })
        })

        describe('method isAndroid',function(){
            it('should return true',function(){
                expect(cmDevice.isAndroid()).toBeTruthy()
            })
        })

        describe('method isiOS',function(){
            it('should return true',function(){
                expect(cmDevice.isiOS()).toBeTruthy()
            })
        })

        describe('method isWinPhone',function(){
            it('should return true',function(){
                expect(cmDevice.isWinPhone()).toBeTruthy()
            })
        })

        describe('method isWinPhone8',function(){
            it('should return true',function(){
                expect(cmDevice.isWinPhone8()).toBeTruthy()
            })
        })

        describe('method isBlackBerry',function(){
            it('should return true',function(){
                expect(cmDevice.isBlackBerry()).toBeTruthy()
            })
        })

        describe('method isAmazonFireOS',function(){
            it('should return true',function(){
                expect(cmDevice.isAmazonFireOS()).toBeTruthy()
            })
        })

        describe('method getCurrentOS',function(){
            it('should return and for android',function(){
                expect(cmDevice.getCurrentOS()).toBe('and')
            })
        })

        describe('method getId',function(){
            it('should return uuid',function(){
                expect(cmDevice.getId()).toBe(deviceMock.uuid)
            })
        })

        describe('method getName',function(){
            it('should return name',function(){
                expect(cmDevice.getName()).toBe(deviceMock.name)
            })
        })

        describe('method getVersion',function(){
            it('should return version',function(){
                expect(cmDevice.getVersion()).toBe(deviceMock.version)
            })
        })
    })

    describe('cmDevice.detectOSAndBrowser', function() {
        var $windowMock

        var blank = {
            dv:'',
            ua:'',
            os:'',
            be:''
        },
        browser = [
            {
                dv:'Willy Chrome Laptop',
                ua:'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36',
                be:'Windows / Google Chrome'
            },
            {
                dv:'Willy Firefox Laptop',
                ua:'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20100101 Firefox/31.0',
                be:'Windows / Mozilla Firefox'
            },
            {
                dv:'Reimer Chrome Laptop',
                ua:'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36',
                be:'Unix / Google Chrome'
            },
            {
                dv:'Reimer Firefox Laptop',
                ua:'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0package...8362888 (line 5581)',
                be:'Unix / Mozilla Firefox'
            },
            {
                dv:'Reimer SP App Chrome',
                ua:'Mozilla/5.0 (Linux; U; Android 4.3.1; en-gb; One Build/JWR66V.H10) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 CyanogenMod/10.2.1/m7ul',
                be:'Android / Native Browser'
            },
            {
                dv:'Reimer SP Native Browser',
                ua:'Mozilla/5.0 (Linux; U; Android 4.3.1; en-gb; One Build/JWR66V.H10) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 CyanogenMod/10.2.1/m7ul',
                be:'Android / Native Browser'
            },
            {
                dv:'Reimer SP Opera Browser',
                ua:'Mozilla/5.0 (Linux; Android 4.3.1; One Build/JWR66V.H10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.138 Mobile Safari/537.36 OPR/22.0.1485.78487',
                be:'Android / Opera'
            },
            {
                dv:'MacMini Chrome',
                ua:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36',
                be:'Mac OS X / Google Chrome'
            },
            {
                dv:'MacMini Firefox',
                ua:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:30.0) Gecko/20100101 Firefox/30.0',
                be:'Mac OS X / Mozilla Firefox'
            },
            {
                dv:'MacMini Safari',
                ua:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.76.4 (KHTML, like Gecko) Version/7.0.4 Safari/537.76.4',
                be:'Mac OS X / Safari'
            },
            {
                dv:'iPod #14',
                ua:'Mozilla/5.0 (iPod touch; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
                be:'iOS / Safari'
            },
            {
                dv:'Samsung #1 Native Browser',
                ua:'Mozilla/5.0 (Linux; U; Android 4.1.2; en-gb; GT-I9100 Build/JZO54K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
                be:'Android / Native Browser'
            },
            {
                dv:'Björn IE 11',
                ua:'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
                be:'Windows / Internet Explorer'
            },
            {
                dv:'Nokia Lumia 925 WP8.1',
                ua:'Mozilla/5.0 (Windows Phone 8.1; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 925) like gecko',
                be:'Windows / IEMobile'
            },
            {
                dv:'Willy IE11',
                ua:'mozilla/5.0 (windows nt 6.1; wow64; trident/7.0; slcc2; .net clr 2.0.50727; .net clr 3.5.30729; .net clr 3.0.30729; media center pc 6.0; .net4.0c; .net4.0e; rv:11.0) like gecko',
                be:'Windows / Internet Explorer'
            }
        ]

        function createUserAgents(isApp){
            // create device its
            browser.forEach(function(device){
                it('detect device os & browser', function (){
                    $windowMock.navigator = {
                        userAgent: device.ua
                    }
                    var detect = cmDevice.detectOSAndBrowser()
                    if(!isApp)
                        expect(detect.os+' / '+detect.browser).toBe(device.be)
                    else
                        expect(detect.os+' / '+detect.browser).toBe(device.be.split(' / ')[0]+' / App')
                })
            })
        }

        describe('none app', function(){
            beforeEach(function () {
                module('cmPhonegap', function ($provide) {
                    $provide.factory('$window', function () {
                        $windowMock = jasmine.createSpy('$window')
                        return $windowMock
                    })

                    $provide.factory('$device', function () {
                        return {get:function(){return undefined}}
                    })
                })
            })

            beforeEach(inject(function (_cmDevice_) {
                cmDevice = _cmDevice_
            }))

            createUserAgents()
        })

        describe('is app', function(){
            beforeEach(function () {
                module('cmPhonegap', function ($provide) {
                    $provide.factory('$window', function () {
                        $windowMock = jasmine.createSpy('$window')
                        return $windowMock
                    })

                    $provide.factory('$phonegapCameoConfig', function () {
                        return {deviceReady:true}
                    })

                    $provide.factory('$device', function () {
                        return {get:function(){return{}}}
                    })
                })
            })

            beforeEach(inject(function (_cmDevice_) {
                cmDevice = _cmDevice_
            }))

            createUserAgents(true)
        })
    })
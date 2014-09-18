'use strict';

var cmDevice

describe('cmDevice.detectOSAndBrowser', function() {
    var $windowMock

    beforeEach(function () {
        module('cmPhonegap', function ($provide) {
            $provide.factory('$window', function () {
                $windowMock = jasmine.createSpy('$window')
                return $windowMock
            })
        })
    })

    beforeEach(inject(function (_cmDevice_) {
        cmDevice = _cmDevice_
    }))

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
            os:'5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36',
            be:'Windows / Google Chrome'
        },
        {
            dv:'Willy Firefox Laptop',
            ua:'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20100101 Firefox/31.0',
            os:'5.0 (Windows)',
            be:'Windows / Mozilla Firefox'
        },
        {
            dv:'Reimer Chrome Laptop',
            ua:'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36',
            os:'5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36',
            be:'UNIX / Google Chrome'
        },
        {
            dv:'Reimer Firefox Laptop',
            ua:'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0package...8362888 (line 5581)',
            os:'5.0 (X11)',
            be:'UNIX / Mozilla Firefox'
        },
        {
            dv:'Reimer SP App Chrome',
            ua:'Mozilla/5.0 (Linux; U; Android 4.3.1; en-gb; One Build/JWR66V.H10) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 CyanogenMod/10.2.1/m7ul',
            os:'5.0 (Linux; U; Android 4.3.1; en-gb; One Build/JWR66V.H10) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 CyanogenMod/10.2.1/m7ul',
            be:'Android / Native Browser'
        },
        {
            dv:'Reimer SP Native Browser',
            ua:'Mozilla/5.0 (Linux; U; Android 4.3.1; en-gb; One Build/JWR66V.H10) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 CyanogenMod/10.2.1/m7ul',
            os:'5.0 (Linux; U; Android 4.3.1; en-gb; One Build/JWR66V.H10) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 CyanogenMod/10.2.1/m7ul',
            be:'Android / Native Browser'
        },
        {
            dv:'Reimer SP Opera Browser',
            ua:'Mozilla/5.0 (Linux; Android 4.3.1; One Build/JWR66V.H10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.138 Mobile Safari/537.36 OPR/22.0.1485.78487',
            os:'5.0 (Linux; Android 4.3.1; One Build/JWR66V.H10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.138 Mobile Safari/537.36 OPR/22.0.1485.78487',
            be:'Android / Opera'
        },
        {
            dv:'MacMini Chrome',
            ua:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36',
            os:'5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36',
            be:'Mac OS X / Google Chrome'
        },
        {
            dv:'MacMini Firefox',
            ua:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:30.0) Gecko/20100101 Firefox/30.0',
            os:'5.0 (Macintosh)',
            be:'Mac OS X / Mozilla Firefox'
        },
        {
            dv:'MacMini Safari',
            ua:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.76.4 (KHTML, like Gecko) Version/7.0.4 Safari/537.76.4',
            os:'5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.76.4 (KHTML, like Gecko) Version/7.0.4 Safari/537.76.4 ',
            be:'Mac OS X / Safari'
        },
        {
            dv:'iPod #14',
            ua:'Mozilla/5.0 (iPod touch; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
            os:'5.0 (iPod touch; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53',
            be:'iOS / Safari'
        },
        {
            dv:'Samsung #1 Native Browser',
            ua:'Mozilla/5.0 (Linux; U; Android 4.1.2; en-gb; GT-I9100 Build/JZO54K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
            os:'5.0 (Linux; U; Android 4.1.2; en-gb; GT-I9100 Build/JZO54K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
            be:'Android / Native Browser'
        },
//        {
//            dv:'Björn IE 11',
//            ua:'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
//            os:'',
//            be:'Windows / Internet Explorer'
//        }
    ]

    it('should be defined', function(){
        expect(cmDevice.detectOSAndBrowser).toBeDefined()
    })

    // create device it
    browser.forEach(function(device){
        it('detect device os & browser', function (){
            $windowMock.navigator = {
                appVersion: device.os,
                userAgent: device.ua
            }
            var detect = cmDevice.detectOSAndBrowser()
            expect(detect.os+' / '+detect.browser).toBe(device.be)
        })
    })
})
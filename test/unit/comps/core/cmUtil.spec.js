'use strict';

var cmUtil;

describe('cmUtil', function(){

    beforeEach(module("cmCore"))

    beforeEach(inject(function(_cmUtil_) {
        cmUtil = _cmUtil_
    }))

    it('should exist', function(){
        expect(cmUtil).toBeDefined()
    })

    describe('checkKeyExists', function(){
        it('should be defined', function(){
            expect(cmUtil.checkKeyExists).toBeDefined()
        })

        it('should return true if key exists in object/ associative array', function(){
            var object = {moep: 4, data: 'test'}
            expect(cmUtil.checkKeyExists(object, 'moep')).toBeTruthy()
        })

        it('should return false if no key is given', function(){
            var object = {moep: 4, data: 'test'}
            expect(cmUtil.checkKeyExists(object)).toBeFalsy()
        })

        it('should return false if no object/array is given', function(){
            expect(cmUtil.checkKeyExists('moep','moep')).toBeFalsy()
            expect(cmUtil.checkKeyExists(123,'moep')).toBeFalsy()
        })

        it('should return false if array is not associative', function(){
            var array = ['moep','data']
            expect(cmUtil.checkKeyExists(array, 'moep')).toBeFalsy()
        })

        it('should return false if array/object is empty', function(){
            var array = []
            expect(cmUtil.checkKeyExists(array, 'moep')).toBeFalsy()
        })

        it('should return false if array/object is empty', function(){
            var object = {}
            expect(cmUtil.checkKeyExists(object, 'moep')).toBeFalsy()
        })

        it('should return false if array/object is empty', function(){
            var object = {}
            expect(cmUtil.checkKeyExists(object, 'moep')).toBeFalsy()
        })
    })

    describe('handleLimitOffset', function(){
        it('should be defined', function(){
            expect(cmUtil.handleLimitOffset).toBeDefined()
        })

        it('should return nothing', function(){
            expect(cmUtil.handleLimitOffset()).toBe('')
        })

        it('should return ?limit=10', function(){
            expect(cmUtil.handleLimitOffset(10)).toBe('?limit=10')
        })

        it('should return ?limit=10&offset=2', function(){
            expect(cmUtil.handleLimitOffset(10,2)).toBe('?limit=10&offset=2')
        })

        it('if wrong param type, should return nothing', function(){
            expect(cmUtil.handleLimitOffset('dfvfdvdf',2)).toBe('')
        })
    })

    describe('validateInt', function(){
        it('should be defined', function(){
            expect(cmUtil.validateInt).toBeDefined()
        })

        it('should be true, if param is an integer', function(){
            expect(cmUtil.validateInt(2)).toBeTruthy()
        })

        it('should be wrong, if param is a string', function(){
            expect(cmUtil.validateInt('moep')).toBeFalsy()
        })

        it('should be wrong, if param is a float', function(){
            expect(cmUtil.validateInt('1.2')).toBeFalsy()
        })
    })

    describe('validateString', function(){
        it('should be defined', function(){
            expect(cmUtil.validateString).toBeDefined();
        })

        it('should be true, if param is alphanumeric', function(){
            expect(cmUtil.validateString('moep123moep')).toBeTruthy()
        })

        it('should be wrong, if param is contains special characters and whitespace', function(){
            expect(cmUtil.validateString('moep sdvdsv')).toBeFalsy() // whitespace
            expect(cmUtil.validateString('moep$3fewe')).toBeFalsy()// $
            expect(cmUtil.validateString('moep_')).toBeFalsy() // _
            expect(cmUtil.validateString('moep*')).toBeFalsy() // *
            expect(cmUtil.validateString('moep@')).toBeFalsy() // @
            expect(cmUtil.validateString('moep+')).toBeFalsy() // +
            expect(cmUtil.validateString('moep-')).toBeFalsy() // -
            expect(cmUtil.validateString('moep/')).toBeFalsy() // /
            expect(cmUtil.validateString('moep\\')).toBeFalsy() // \
        })
    })

    describe('prettify', function(){
        it('should be defined', function(){
            expect(cmUtil.prettify).toBeDefined();
        })

        it('should return a undefined without params', function(){
            expect(cmUtil.prettify()).toBeUndefined()
        })

        it('should return a string shows empty object', function(){
            expect(cmUtil.prettify({})).toBe('{}')
        })

        it('should prettify the json with newlines', function(){
            expect(cmUtil.prettify({test:''})).toBe('{\n  "test": ""\n}')
        })
    })

    describe('objLen', function(){
        it('should be defined', function(){
            expect(cmUtil.objLen).toBeDefined()
        })

        it('should return 0 without params', function(){
            expect(cmUtil.objLen()).toEqual(0)
        })

        it('should return 0 with empty object', function(){
            expect(cmUtil.objLen({})).toEqual(0)
        })

        it('should return 2 with object', function(){
            expect(cmUtil.objLen({test:1,testi:2})).toEqual(2)
        })

        it('should return 0 with empty array', function(){
            expect(cmUtil.objLen([])).toEqual(0)
        })

        it('should return 2 with array', function(){
            expect(cmUtil.objLen(['test','test2'])).toEqual(2)
        })
    })

    describe('ucFirst', function(){
        it('should be defined', function(){
            expect(cmUtil.ucFirst).toBeDefined()
        })

        describe('should return empty string', function(){
            it('without params', function(){
                expect(cmUtil.ucFirst()).toBe('')
            })

            it('with object as param', function(){
                expect(cmUtil.ucFirst({'test':1})).toBe('')
            })

            it('with array as param', function(){
                expect(cmUtil.ucFirst(['test'])).toBe('')
            })
        })

        it('should convert first letter to upper', function(){
            expect(cmUtil.ucFirst('test')).toBe('Test')
        })
    })

    describe('bytesToStr', function(){
        it('should be defined', function(){
            expect(cmUtil.bytesToStr).toBeDefined()
        })

        describe('should return n/a ', function(){
            it('without params', function(){
                expect(cmUtil.bytesToStr()).toBe('n/a')
            })

            it('with string as param', function(){
                expect(cmUtil.bytesToStr('huhu')).toBe('n/a')
            })

            it('with object as param', function(){
                expect(cmUtil.bytesToStr({'test':1})).toBe('n/a')
            })

            it('with array as param', function(){
                expect(cmUtil.bytesToStr(['test'])).toBe('n/a')
            })
        })

        describe('should return n/a', function(){
            it('1Bytes', function(){
                expect(cmUtil.bytesToStr(1)).toBe('1 Bytes')
            })

            it('512KB', function(){
                expect(cmUtil.bytesToStr(512*1024)).toBe('512 KB')
            })

            it('1MB', function(){
                expect(cmUtil.bytesToStr(1024*1024)).toBe('1 MB')
            })

            it('1GB', function(){
                expect(cmUtil.bytesToStr(1024*1024*1024)).toBe('1 GB')
            })

            it('1TB', function(){
                expect(cmUtil.bytesToStr(1024*1024*1024*1024)).toBe('1 TB')
            })
        })
    })

    describe('getRandomInt', function(){
        it('should be defined', function(){
            expect(cmUtil.getRandomInt).toBeDefined()
        })

        describe('should return 0', function(){
            it('with no params', function(){
                expect(cmUtil.getRandomInt()).toEqual(0)
            })

            it('with object as param', function(){
                expect(cmUtil.getRandomInt({'test':1})).toEqual(0)
            })

            it('with array as param', function(){
                expect(cmUtil.getRandomInt(['test'])).toEqual(0)
            })
        })

        it('should generate an random number between 1 - 5', function(){
            var random = cmUtil.getRandomInt(1,5)
            expect(random).toBeGreaterThan(0)
            expect(random).toBeLessThan(6)
        })
    })

    describe('millisecondsToStr', function(){
        it('should be defined', function(){
            expect(cmUtil.millisecondsToStr).toBeDefined()
        })

        describe('should return n/a', function(){
            it('with no params', function(){
                expect(cmUtil.millisecondsToStr()).toBe('n/a')
            })

            it('with object as param', function(){
                expect(cmUtil.millisecondsToStr({'test':1})).toBe('n/a')
            })

            it('with array as param', function(){
                expect(cmUtil.millisecondsToStr(['test'])).toBe('n/a')
            })
        })

        describe('should return', function(){
            it('< 1s', function(){
                expect(cmUtil.millisecondsToStr(0.1)).toBe('0s')
            })

            it('0s', function(){
                expect(cmUtil.millisecondsToStr(1)).toBe('0s')
            })

            it('1s', function(){
                expect(cmUtil.millisecondsToStr(1000)).toBe('1s')
            })

            it('1m', function(){
                expect(cmUtil.millisecondsToStr(1000*60)).toBe('1m')
            })

            it('1m 10s', function(){
                expect(cmUtil.millisecondsToStr(1000*70)).toBe('1m 10s')
            })

            it('1h', function(){
                expect(cmUtil.millisecondsToStr(1000*60*60)).toBe('1h')
            })

            it('1h 21m 40s', function(){
                expect(cmUtil.millisecondsToStr(1000*70*70)).toBe('1h 21m 40s')
            })

            it('1d', function(){
                expect(cmUtil.millisecondsToStr(1000*86400)).toBe('1d')
            })

            it('1y', function(){
                expect(cmUtil.millisecondsToStr(1000*86400*365)).toBe('1y')
            })
        })
    })

    describe('getType', function(){
        it('should be defined', function(){
            expect(cmUtil.getType).toBeDefined()
        })

        it('String', function(){
            expect(cmUtil.getType('meop')).toBe('String')
        })

        it('Array isnt a real Object', function(){
            var array = ['moep'];
            expect(cmUtil.getType(array)).toBe('')
        })

        it('Object', function(){
            expect(cmUtil.getType({meop:'meop'})).toBe('Object')
        })

        it('Function Object', function(){
            function moep(){
                this.moep = true;
            }
            expect(cmUtil.getType(new moep())).toBe('Object')
        })
    })

    describe('startsWith', function(){
        it('should be defined', function(){
            expect(cmUtil.startsWith).toBeDefined()
        })

        it('check boolean', function(){
            expect(cmUtil.startsWith()).toBeFalsy()
            expect(cmUtil.startsWith(undefined,'me')).toBeFalsy()
            expect(cmUtil.startsWith('meop',undefined)).toBeFalsy()

            expect(cmUtil.startsWith('meop','me')).toBeTruthy()
            expect(cmUtil.startsWith('meopmeop','meop')).toBeTruthy()

            expect(cmUtil.startsWith('meopmeop','poem')).toBeFalsy()
        })
    })

    describe('endsWith', function(){
        it('should be defined', function(){
            expect(cmUtil.endsWith).toBeDefined()
        })

        it('check boolean', function(){
            expect(cmUtil.endsWith()).toBeFalsy()
            expect(cmUtil.endsWith(undefined,'me')).toBeFalsy()
            expect(cmUtil.endsWith('meop',undefined)).toBeFalsy()

            expect(cmUtil.endsWith('meop','op')).toBeTruthy()
            expect(cmUtil.endsWith('meopmeop','meop')).toBeTruthy()

            expect(cmUtil.endsWith('meopmeop','poem')).toBeFalsy()
        })
    })

    describe('isArray', function(){
        it('should be defined', function(){
            expect(cmUtil.isArray).toBeDefined()
        })

        it('should be false', function(){
            expect(cmUtil.isArray(undefined)).toBeFalsy()
            expect(cmUtil.isArray(null)).toBeFalsy()
            expect(cmUtil.isArray('')).toBeFalsy()
            expect(cmUtil.isArray({})).toBeFalsy()
            expect(cmUtil.isArray({'huschi':'buschi'})).toBeFalsy()
        })

        it('should be true', function(){
            expect(cmUtil.isArray([])).toBeTruthy()
            expect(cmUtil.isArray(['1'])).toBeTruthy()
        })
    })

    describe('detectOSAndBrowser', function(){
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
            }
        ]

        it('should be defined', function(){
            expect(cmUtil.detectOSAndBrowser).toBeDefined()
        })

        describe('test devices', function(){
            var $window,
                navigator

            beforeEach(function () {
                inject(function (_$window_) {
                    $window = _$window_
                })

                // Save the original navigator object
                navigator = $window.navigator
            })

            afterEach(function () {
                $window.navigator = navigator
            })

            // create
            browser.forEach(function(device){
                it('detect device os & browser', function () {
                    $window.navigator = {
                        appVersion: device.os,
                        userAgent: device.ua
                    }

                    var detect = cmUtil.detectOSAndBrowser()
                    expect(detect.os+' / '+detect.browser).toBe(device.be)
                })
            })
        })
    })
})
'use strict';

var cmUtil;

describe('cmUtil', function() {

    beforeEach(module("cmCore"))

    beforeEach(inject(function (_cmUtil_) {
        cmUtil = _cmUtil_
    }))

    it('should exist', function () {
        expect(cmUtil).toBeDefined()
    })

    describe('checkKeyExists', function () {
        it('should be defined', function () {
            expect(cmUtil.checkKeyExists).toBeDefined()
        })

        it('should return true if key exists in object/ associative array', function () {
            var object = {moep: 4, data: 'test'}
            expect(cmUtil.checkKeyExists(object, 'moep')).toBeTruthy()
        })

        it('should return false if no key is given', function () {
            var object = {moep: 4, data: 'test'}
            expect(cmUtil.checkKeyExists(object)).toBeFalsy()
        })

        it('should return false if no object/array is given', function () {
            expect(cmUtil.checkKeyExists('moep', 'moep')).toBeFalsy()
            expect(cmUtil.checkKeyExists(123, 'moep')).toBeFalsy()
        })

        it('should return false if array is not associative', function () {
            var array = ['moep', 'data']
            expect(cmUtil.checkKeyExists(array, 'moep')).toBeFalsy()
        })

        it('should return false if array/object is empty', function () {
            var array = []
            expect(cmUtil.checkKeyExists(array, 'moep')).toBeFalsy()
        })

        it('should return false if array/object is empty', function () {
            var object = {}
            expect(cmUtil.checkKeyExists(object, 'moep')).toBeFalsy()
        })

        it('should return false if array/object is empty', function () {
            var object = {}
            expect(cmUtil.checkKeyExists(object, 'moep')).toBeFalsy()
        })
    })

    describe('handleLimitOffset', function () {
        it('should be defined', function () {
            expect(cmUtil.handleLimitOffset).toBeDefined()
        })

        it('should return nothing', function () {
            expect(cmUtil.handleLimitOffset()).toBe('')
        })

        it('should return ?limit=10', function () {
            expect(cmUtil.handleLimitOffset(10)).toBe('?limit=10')
        })

        it('should return ?limit=10&offset=2', function () {
            expect(cmUtil.handleLimitOffset(10, 2)).toBe('?limit=10&offset=2')
        })

        it('should return ?timeLimit=1411153446045', function () {
            expect(cmUtil.handleLimitOffset(null, null, 1411153446045)).toBe('?timeLimit=1411153446045')
        })

        it('should return ?timeLimit=1411153446045', function () {
            expect(cmUtil.handleLimitOffset(10, 2, 1411153446045)).toBe('?timeLimit=1411153446045')
        })

        it('if wrong param type, should return nothing', function () {
            expect(cmUtil.handleLimitOffset('dfvfdvdf', 2)).toBe('')
        })
    })

    describe('validateInt', function () {
        it('should be defined', function () {
            expect(cmUtil.validateInt).toBeDefined()
        })

        it('should be true, if param is an integer', function () {
            expect(cmUtil.validateInt(2)).toBeTruthy()
        })

        it('should be wrong, if param is a string', function () {
            expect(cmUtil.validateInt('moep')).toBeFalsy()
        })

        it('should be wrong, if param is a float', function () {
            expect(cmUtil.validateInt('1.2')).toBeFalsy()
        })
    })

    describe('validateString', function () {
        it('should be defined', function () {
            expect(cmUtil.validateString).toBeDefined();
        })

        it('should be true, if param is alphanumeric', function () {
            expect(cmUtil.validateString('moep123moep')).toBeTruthy()
        })

        it('should be wrong, if param is contains special characters and whitespace', function () {
            expect(cmUtil.validateString('moep sdvdsv')).toBeFalsy() // whitespace
            expect(cmUtil.validateString('moep$3fewe')).toBeFalsy()// $
            expect(cmUtil.validateString('moep*')).toBeFalsy() // *
            expect(cmUtil.validateString('moep@')).toBeFalsy() // @
            expect(cmUtil.validateString('moep+')).toBeFalsy() // +
            expect(cmUtil.validateString('moep/')).toBeFalsy() // /
            expect(cmUtil.validateString('moep\\')).toBeFalsy() // \
        })
    })

    describe('prettify', function () {
        it('should be defined', function () {
            expect(cmUtil.prettify).toBeDefined();
        })

        it('should return a undefined without params', function () {
            expect(cmUtil.prettify()).toBeUndefined()
        })

        it('should return a string shows empty object', function () {
            expect(cmUtil.prettify({})).toBe('{}')
        })

        it('should prettify the json with newlines', function () {
            expect(cmUtil.prettify({test: ''})).toBe('{\n  "test": ""\n}')
        })
    })

    describe('objLen', function () {
        it('should be defined', function () {
            expect(cmUtil.objLen).toBeDefined()
        })

        it('should return 0 without params', function () {
            expect(cmUtil.objLen()).toEqual(0)
        })

        it('should return 0 with empty object', function () {
            expect(cmUtil.objLen({})).toEqual(0)
        })

        it('should return 2 with object', function () {
            expect(cmUtil.objLen({test: 1, testi: 2})).toEqual(2)
        })

        it('should return 0 with empty array', function () {
            expect(cmUtil.objLen([])).toEqual(0)
        })

        it('should return 2 with array', function () {
            expect(cmUtil.objLen(['test', 'test2'])).toEqual(2)
        })
    })

    describe('ucFirst', function () {
        it('should be defined', function () {
            expect(cmUtil.ucFirst).toBeDefined()
        })

        describe('should return empty string', function () {
            it('without params', function () {
                expect(cmUtil.ucFirst()).toBe('')
            })

            it('with object as param', function () {
                expect(cmUtil.ucFirst({'test': 1})).toBe('')
            })

            it('with array as param', function () {
                expect(cmUtil.ucFirst(['test'])).toBe('')
            })
        })

        it('should convert first letter to upper', function () {
            expect(cmUtil.ucFirst('test')).toBe('Test')
        })
    })

    describe('bytesToStr', function () {
        it('should be defined', function () {
            expect(cmUtil.bytesToStr).toBeDefined()
        })

        describe('should return n/a ', function () {
            it('without params', function () {
                expect(cmUtil.bytesToStr()).toBe('n/a')
            })

            it('with string as param', function () {
                expect(cmUtil.bytesToStr('huhu')).toBe('n/a')
            })

            it('with object as param', function () {
                expect(cmUtil.bytesToStr({'test': 1})).toBe('n/a')
            })

            it('with array as param', function () {
                expect(cmUtil.bytesToStr(['test'])).toBe('n/a')
            })
        })

        describe('should return n/a', function () {
            it('1Bytes', function () {
                expect(cmUtil.bytesToStr(1)).toBe('1 Bytes')
            })

            it('512KB', function () {
                expect(cmUtil.bytesToStr(512 * 1024)).toBe('512 KB')
            })

            it('1MB', function () {
                expect(cmUtil.bytesToStr(1024 * 1024)).toBe('1 MB')
            })

            it('1GB', function () {
                expect(cmUtil.bytesToStr(1024 * 1024 * 1024)).toBe('1 GB')
            })

            it('1TB', function () {
                expect(cmUtil.bytesToStr(1024 * 1024 * 1024 * 1024)).toBe('1 TB')
            })
        })
    })

    describe('compareDate', function(){
        it('should be defined', function () {
            expect(cmUtil.compareDate).toBeDefined()
        })

        it('should be true, if current is newer higher then prev', function(){
            var current = 1409041624000 // 26.08.2014 10:27:04 000
            var prev = 1408955224000 // 25.08.2014 10:27:04 000

            expect(cmUtil.compareDate(current, prev)).toBe(true)
        })

        it('should be true, if prev is undefined', function(){
            var current = 1409041624000 // 26.08.2014 10:27:04 000
            var prev

            expect(cmUtil.compareDate(current, prev)).toBe(true)
        })

        it('should be false, if has no params', function(){
            expect(cmUtil.compareDate()).toBe(false)
        })

        it('should be false, if current and prev are the same', function(){
            var current = 1409041624000 // 26.08.2014 10:27:04 000
            var prev = 1409041624000 // 26.08.2014 10:27:04 000

            expect(cmUtil.compareDate(current, prev)).toBe(false)
        })

        it('should be false, if prev higher then current', function(){
            var current = 1408955224000 // 25.08.2014 10:27:04 000
            var prev = 1409041624000 // 26.08.2014 10:27:04 000

            expect(cmUtil.compareDate(current, prev)).toBe(false)
        })

        describe('test special dates', function(){
            it('should be true at year change', function(){
                var current = 1388534400000 // 1.1.2014 00:00:00 000 1388534400000
                var prev = 1388534399000 // 31.12.2013 23:59:59 000

                expect(cmUtil.compareDate(current, prev)).toBe(true)
            })

            it('should be true at monthly change', function(){
                var current = 1391209200000 // 1.2.2014 00:00:00 000
                var prev = 139120919900 // 31.01.2014 23:59:59 000

                expect(cmUtil.compareDate(current, prev)).toBe(true)
            })

            it('should be true at daily change', function(){
                var current = 1391295600000 // 2.2.2014 00:00:00 000
                var prev = 1388620800000 // 1.2.2014 23:59:59 000

                expect(cmUtil.compareDate(current, prev)).toBe(true)
            })
        })

        describe('test with real date which create a gui error', function(){
            it('test 1 should be true', function(){
                var current = 1411153446045 // 19.09.2014 21:04:06
                var prev = 1411151556026 // 19.09.2014 20:32:36

                expect(cmUtil.compareDate(current, prev)).toBe(false)
            })

            it('test 2 should be true', function(){
                var current = 1411154387354 // 19.09.2014 21:19:47
                var prev = 1411153446045 // 19.09.2014 21:04:06

                expect(cmUtil.compareDate(current, prev)).toBe(false)
            })
        })
    })

    describe('millisecondsToStr', function () {
        it('should be defined', function () {
            expect(cmUtil.millisecondsToStr).toBeDefined()
        })

        describe('should return n/a', function () {
            it('with no params', function () {
                expect(cmUtil.millisecondsToStr()).toBe('n/a')
            })

            it('with object as param', function () {
                expect(cmUtil.millisecondsToStr({'test': 1})).toBe('n/a')
            })

            it('with array as param', function () {
                expect(cmUtil.millisecondsToStr(['test'])).toBe('n/a')
            })
        })

        describe('should return', function () {
            it('< 1s', function () {
                expect(cmUtil.millisecondsToStr(0.1)).toBe('0s')
            })

            it('0s', function () {
                expect(cmUtil.millisecondsToStr(1)).toBe('0s')
            })

            it('1s', function () {
                expect(cmUtil.millisecondsToStr(1000)).toBe('1s')
            })

            it('1m', function () {
                expect(cmUtil.millisecondsToStr(1000 * 60)).toBe('1m')
            })

            it('1m 10s', function () {
                expect(cmUtil.millisecondsToStr(1000 * 70)).toBe('1m 10s')
            })

            it('1h', function () {
                expect(cmUtil.millisecondsToStr(1000 * 60 * 60)).toBe('1h')
            })

            it('1h 21m 40s', function () {
                expect(cmUtil.millisecondsToStr(1000 * 70 * 70)).toBe('1h 21m 40s')
            })

            it('1d', function () {
                expect(cmUtil.millisecondsToStr(1000 * 86400)).toBe('1d')
            })

            it('1y', function () {
                expect(cmUtil.millisecondsToStr(1000 * 86400 * 365)).toBe('1y')
            })
        })
    })

    describe('getType', function () {
        it('should be defined', function () {
            expect(cmUtil.getType).toBeDefined()
        })

        it('String', function () {
            expect(cmUtil.getType('meop')).toBe('String')
        })

        it('Array isnt a real Object', function () {
            var array = ['moep'];
            expect(cmUtil.getType(array)).toBe('')
        })

        it('Object', function () {
            expect(cmUtil.getType({meop: 'meop'})).toBe('Object')
        })

        it('Function Object', function () {
            function moep() {
                this.moep = true;
            }

            expect(cmUtil.getType(new moep())).toBe('Object')
        })
    })

    describe('startsWith', function () {
        it('should be defined', function () {
            expect(cmUtil.startsWith).toBeDefined()
        })

        it('check boolean', function () {
            expect(cmUtil.startsWith()).toBeFalsy()
            expect(cmUtil.startsWith(undefined, 'me')).toBeFalsy()
            expect(cmUtil.startsWith('meop', undefined)).toBeFalsy()

            expect(cmUtil.startsWith('meop', 'me')).toBeTruthy()
            expect(cmUtil.startsWith('meopmeop', 'meop')).toBeTruthy()

            expect(cmUtil.startsWith('meopmeop', 'poem')).toBeFalsy()
        })
    })

    describe('endsWith', function () {
        it('should be defined', function () {
            expect(cmUtil.endsWith).toBeDefined()
        })

        it('check boolean', function () {
            expect(cmUtil.endsWith()).toBeFalsy()
            expect(cmUtil.endsWith(undefined, 'me')).toBeFalsy()
            expect(cmUtil.endsWith('meop', undefined)).toBeFalsy()

            expect(cmUtil.endsWith('meop', 'op')).toBeTruthy()
            expect(cmUtil.endsWith('meopmeop', 'meop')).toBeTruthy()

            expect(cmUtil.endsWith('meopmeop', 'poem')).toBeFalsy()
        })
    })

    describe('isArray', function () {
        it('should be defined', function () {
            expect(cmUtil.isArray).toBeDefined()
        })

        it('should be false', function () {
            expect(cmUtil.isArray()).toBeFalsy()
            expect(cmUtil.isArray(undefined)).toBeFalsy()
            expect(cmUtil.isArray(null)).toBeFalsy()
            expect(cmUtil.isArray('')).toBeFalsy()
            expect(cmUtil.isArray({})).toBeFalsy()
            expect(cmUtil.isArray({'huschi': 'buschi'})).toBeFalsy()
        })

        it('should be true', function () {
            expect(cmUtil.isArray([])).toBeTruthy()
            expect(cmUtil.isArray(['1'])).toBeTruthy()
        })
    })

    describe('isAlphaNumeric', function () {
        it('should be defined', function () {
            expect(cmUtil.isAlphaNumeric).toBeDefined()
        })

        it('should be false', function () {
            expect(cmUtil.isAlphaNumeric()).toBeFalsy()
            expect(cmUtil.isAlphaNumeric(undefined)).toBeFalsy()
            expect(cmUtil.isAlphaNumeric(null)).toBeFalsy()
            expect(cmUtil.isAlphaNumeric('')).toBeFalsy()
            expect(cmUtil.isAlphaNumeric('huschibuschi')).toBeFalsy()
            expect(cmUtil.isAlphaNumeric({})).toBeFalsy()
            expect(cmUtil.isAlphaNumeric({'moep': 'oida'})).toBeFalsy()
            expect(cmUtil.isAlphaNumeric([])).toBeFalsy()
            expect(cmUtil.isAlphaNumeric(['junge'])).toBeFalsy()
        })

        it('should be true', function () {
            expect(cmUtil.isAlphaNumeric('2fsdf4F3ds', 10)).toBeTruthy()
            expect(cmUtil.isAlphaNumeric('eX28xqhS9eYrQyRfpm70')).toBeTruthy()
            expect(cmUtil.isAlphaNumeric('kTqQrwPMlEe1OrmxcSIq', 20)).toBeTruthy()
        })
    })

})
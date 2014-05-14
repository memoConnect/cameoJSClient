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

    describe('function "checkKeyExists"', function(){
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
            it('0.001s', function(){
                expect(cmUtil.millisecondsToStr(1)).toBe('0.001s')
            })

            it('1s', function(){
                expect(cmUtil.millisecondsToStr(1000)).toBe('1s')
            })

            it('1m', function(){
                expect(cmUtil.millisecondsToStr(1000*60)).toBe('1m')
            })

            it('1h', function(){
                expect(cmUtil.millisecondsToStr(1000*60*60)).toBe('1h')
            })

            it('1d', function(){
                expect(cmUtil.millisecondsToStr(1000*86400)).toBe('1d')
            })

            it('1y', function(){
                expect(cmUtil.millisecondsToStr(1000*86400*365)).toBe('1y')
            })
        })
    })
})
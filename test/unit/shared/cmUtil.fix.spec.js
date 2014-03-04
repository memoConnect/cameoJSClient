define([
    'angular-mocks',
    'cmUtil'
], function () {
    'use strict';

    var cmUtil;
    
    describe('cmUtil', function(){

        beforeEach(module("cmUtil"))

        beforeEach(inject(function(_cmUtil_) {
            cmUtil = _cmUtil_;
        }))

        it('should exists', function(){
            expect(cmUtil).toBeDefined();
        })

        describe('validateInt', function(){
            it('should be defined', function(){
                expect(cmUtil.validateInt).toBeDefined();
            })

            it('should be true, if param is an integer', function(){
                expect(cmUtil.validateInt(2)).toBeTruthy();
            })

            it('should be wrong, if param is a string', function(){
                expect(cmUtil.validateInt('moep')).toBeFalsy();
            })

            it('should be wrong, if param is a float', function(){
                expect(cmUtil.validateInt('1.2')).toBeFalsy();
            })
        });

        describe('validateString', function(){
            it('should be defined', function(){
                expect(cmUtil.validateString).toBeDefined();
            })

            it('should be true, if param is alphanumeric', function(){
                expect(cmUtil.validateString('moep123moep')).toBeTruthy();
            })

            it('should be wrong, if param is contains special characters and whitespace', function(){
                expect(cmUtil.validateString('moep sdvdsv')).toBeFalsy(); // whitespace
                expect(cmUtil.validateString('moep$3fewe')).toBeFalsy(); // $
                expect(cmUtil.validateString('moep_')).toBeFalsy(); // _
                expect(cmUtil.validateString('moep*')).toBeFalsy(); // *
                expect(cmUtil.validateString('moep@')).toBeFalsy(); // @
                expect(cmUtil.validateString('moep+')).toBeFalsy(); // +
                expect(cmUtil.validateString('moep-')).toBeFalsy(); // -
                expect(cmUtil.validateString('moep/')).toBeFalsy(); // /
                expect(cmUtil.validateString('moep\\')).toBeFalsy(); // \
            })
        })

        describe('handleLimitOffset', function(){
            it('should be defined', function(){
                expect(cmUtil.handleLimitOffset).toBeDefined();
            })

            it('should return nothing', function(){
                expect(cmUtil.handleLimitOffset()).toBe('');
            })

            it('should return ?limit=10', function(){
                expect(cmUtil.handleLimitOffset(10)).toBe('?limit=10');
            })

            it('should return ?limit=10&offset=2', function(){
                expect(cmUtil.handleLimitOffset(10,2)).toBe('?limit=10&offset=2');
            })

            it('if wrong param type, should return nothing', function(){
                expect(cmUtil.handleLimitOffset('dfvfdvdf',2)).toBe('');
            })
        })

        describe('checkKeyExists', function(){
            it('should be defined', function(){
                expect(cmUtil.checkKeyExists).toBeDefined();
            })

            it('should return true if key exists in object/ associative array', function(){
                var object = {moep: 4, data: 'test'};
                expect(cmUtil.checkKeyExists(object, 'moep')).toBeTruthy();
            })

            it('should return false if no key is given', function(){
                var object = {moep: 4, data: 'test'};
                expect(cmUtil.checkKeyExists(object)).toBeFalsy();
            })

            it('should return false if no object/array is given', function(){
                expect(cmUtil.checkKeyExists('moep','moep')).toBeFalsy();
                expect(cmUtil.checkKeyExists(123,'moep')).toBeFalsy();
            })

            it('should return false if array is not associative', function(){
                var array = ['moep','data'];
                expect(cmUtil.checkKeyExists(array, 'moep')).toBeFalsy();
            })

            it('should return false if array/object is empty', function(){
                var array = [];
                expect(cmUtil.checkKeyExists(array, 'moep')).toBeFalsy();
            })

            it('should return false if array/object is empty', function(){
                var object = {};
                expect(cmUtil.checkKeyExists(object, 'moep')).toBeFalsy();
            })

            it('should return false if array/object is empty', function(){
                var object = {};
                expect(cmUtil.checkKeyExists(object, 'moep')).toBeFalsy();
            })
        })
    })
})
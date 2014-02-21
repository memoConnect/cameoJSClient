define(['angular-mocks'], function () {
    'use strict';

    var util;

    describe('Util', function(){

        beforeEach(module('Util'));

        beforeEach(inject(function(_Util_){
            util = _Util_
        }));

        it('should exists', function(){
            expect(util).toBeDefined();
        });

        describe('validateInt', function(){
            it('should be defined', function(){
                expect(util.validateInt).toBeDefined();
            });

            it('should be true, if param is an integer', function(){
                expect(util.validateInt(2)).toBeTruthy();
            });

            it('should be wrong, if param is a string', function(){
                expect(util.validateInt('moep')).toBeFalsy();
            });

            it('should be wrong, if param is a float', function(){
                expect(util.validateInt('1.2')).toBeFalsy();
            });
        });

        describe('validateString', function(){
            it('should be defined', function(){
                expect(util.validateString).toBeDefined();
            });

            it('should be true, if param is alphanumeric', function(){
                expect(util.validateString('moep123moep')).toBeTruthy();
            });

            it('should be wrong, if param is contains special characters and whitespace', function(){
                expect(util.validateString('moep sdvdsv')).toBeFalsy(); // whitespace
                expect(util.validateString('moep$3fewe')).toBeFalsy(); // $
                expect(util.validateString('moep_')).toBeFalsy(); // _
                expect(util.validateString('moep*')).toBeFalsy(); // *
                expect(util.validateString('moep@')).toBeFalsy(); // @
                expect(util.validateString('moep+')).toBeFalsy(); // +
                expect(util.validateString('moep-')).toBeFalsy(); // -
                expect(util.validateString('moep/')).toBeFalsy(); // /
                expect(util.validateString('moep\\')).toBeFalsy(); // \
            });
        });

        describe('handleLimitOffset', function(){
            it('should be defined', function(){
                expect(util.handleLimitOffset).toBeDefined();
            });

            it('should return nothing', function(){
                expect(util.handleLimitOffset()).toBe('');
            });

            it('should return ?limit=10', function(){
                expect(util.handleLimitOffset(10)).toBe('?limit=10');
            });

            it('should return ?limit=10&offset=2', function(){
                expect(util.handleLimitOffset(10,2)).toBe('?limit=10&offset=2');
            });

            it('if wrong param type, should return nothing', function(){
                expect(util.handleLimitOffset('dfvfdvdf',2)).toBe('');
            });

        });

        describe('checkKeyExists', function(){
            it('should be defined', function(){
                expect(util.checkKeyExists).toBeDefined();
            });

            it('should return true if key exists in object/ associative array', function(){
                var object = {moep: 4, data: 'test'};
                expect(util.checkKeyExists(object, 'moep')).toBeTruthy();
            });

            it('should return false if no key is given', function(){
                var object = {moep: 4, data: 'test'};
                expect(util.checkKeyExists(object)).toBeFalsy();
            });

            it('should return false if no object/array is given', function(){
                expect(util.checkKeyExists('moep','moep')).toBeFalsy();
                expect(util.checkKeyExists(123,'moep')).toBeFalsy();
            });

            it('should return false if array is not associative', function(){
                var array = ['moep','data'];
                expect(util.checkKeyExists(array, 'moep')).toBeFalsy();
            });

            it('should return false if array/object is empty', function(){
                var array = [];
                expect(util.checkKeyExists(array, 'moep')).toBeFalsy();
            });

            it('should return false if array/object is empty', function(){
                var object = {};
                expect(util.checkKeyExists(object, 'moep')).toBeFalsy();
            });

            it('should return false if array/object is empty', function(){
                var object = {};
                expect(util.checkKeyExists(object, 'moep')).toBeFalsy();
            });

        });

    })
});
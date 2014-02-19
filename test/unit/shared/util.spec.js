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
    })
});
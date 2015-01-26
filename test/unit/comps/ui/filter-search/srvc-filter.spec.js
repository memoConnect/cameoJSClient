'use strict';

describe('Service cmFilter', function(){

    var cmFilter, obj, counter, test, $rootScope

    beforeEach(module('cmCore'))

    beforeEach(module('cmUi'))

    beforeEach(inject(function(_cmFilter_, _$rootScope_){
        $rootScope = _$rootScope_

        cmFilter = _cmFilter_;
        counter = 0;
        obj = {
            callback: function(){
                counter++;
            }
        };
        test = 'moep';
    }))

    describe('1. Test cmFilter API', function(){
        it('service should be defined', function(){
            expect(cmFilter).toBeDefined()
        })

        it('should exists a "clear" method', function(){
            expect(typeof cmFilter.clear).toBe('function')
        })

        it('should exists a "get" method', function(){
            expect(typeof cmFilter.get).toBe('function')
        })

        it('should exists a "set" method', function(){
            expect(typeof cmFilter.set).toBe('function')
        })

        it('should exists a "getResultLength" method', function(){
            expect(typeof cmFilter.getResultLength).toBe('function')
        })

        it('should exists a "onUpdate" method', function(){
            expect(typeof cmFilter.onUpdate).toBe('function')
        })

        it('should exists a "onClear" method', function(){
            expect(typeof cmFilter.onClear).toBe('function')
        })

        it('should exists a "removeOnUpdate" method', function(){
            expect(typeof cmFilter.removeOnUpdate).toBe('function')
        })

        it('should exists a "removeOnClear" method', function(){
            expect(typeof cmFilter.removeOnClear).toBe('function')
        })
    })

    describe('2. Test Setter and Getter Methods', function(){
        it('should be the same "filter string" after set and get', function(){
            expect(cmFilter.get()).toBe('')

            cmFilter.set(test)

            expect(cmFilter.get()).toBe(test)
        })

        it('should be the same "result length" after setResultLength and getResultLength', function(){
            var i= 10

            expect(cmFilter.getResultLength()).toBe(0)

            cmFilter.setResultLength(i)

            expect(cmFilter.getResultLength()).toBe(i)
        })

        it('getResultLength should be "0", when setResultLength Paramater is not a number', function(){
            cmFilter.setResultLength('moep')
            expect(cmFilter.getResultLength()).toBe(0)

            cmFilter.setResultLength({})
            expect(cmFilter.getResultLength()).toBe(0)

            cmFilter.setResultLength([])
            expect(cmFilter.getResultLength()).toBe(0)

            cmFilter.setResultLength(true)
            expect(cmFilter.getResultLength()).toBe(0)
        })
    })

    describe('3. Test onUpdate', function(){
        it('callback function should be called, when cmFilter.onUpdate is called with valid identifier', function(){
            cmFilter.onUpdate('test', obj.callback)
            cmFilter.set(test)
            expect(counter).toBe(1)
        })

        it('callback function should not be called, when cmFilter.set is called with the same string twice', function(){
            cmFilter.onUpdate('test', obj.callback)

            cmFilter.set(test)
            expect(counter).toBe(1)

            cmFilter.set(test)
            expect(counter).toBe(1)
        })

        it('callback function should called only once, because of the same identifier', function(){
            cmFilter.onUpdate('test', obj.callback)
            cmFilter.onUpdate('test', obj.callback)

            cmFilter.set(test)
            expect(counter).toBe(1)
        })

        it('callback function should called twice, because of the different identifier', function(){
            cmFilter.onUpdate('test1', obj.callback)
            cmFilter.onUpdate('test2', obj.callback)

            cmFilter.set(test)
            expect(counter).toBe(2)
        })

        it('callback function should not be called, when cmFilter.onUpdate is called with an invalid identifier', function(){

            cmFilter.onUpdate(null, obj.callback)
            cmFilter.set(test)
            expect(counter).toBe(0)

            cmFilter.clear();
            counter = 0;

            cmFilter.onUpdate('', obj.callback)
            cmFilter.set(test)
            expect(counter).toBe(0)

            cmFilter.clear();
            counter = 0;

            cmFilter.onUpdate({}, obj.callback)
            cmFilter.set(test)
            expect(counter).toBe(0)

            cmFilter.clear();
            counter = 0;

            cmFilter.onUpdate(true, obj.callback)
            cmFilter.set(test)
            expect(counter).toBe(0)

        })

        it('callback function should be not called, after cmFilter.removeOnUpdate()', function(){
            cmFilter.onUpdate('test', obj.callback)

            cmFilter.removeOnUpdate('test');

            cmFilter.set(test)
            expect(counter).toBe(0)
        })
    })

    describe('4. Test onClear', function(){
        it('callback function should be called, when cmFilter.clear is called', function(){
            cmFilter.onClear('test', obj.callback)

            cmFilter.clear()
            expect(counter).toBe(1)
        })

        it('callback function should called only once, because of the same identifier', function(){
            cmFilter.onClear('test', obj.callback)
            cmFilter.onClear('test', obj.callback)

            cmFilter.clear()
            expect(counter).toBe(1)
        })

        it('callback function should called twice, because of the different identifier', function(){
            cmFilter.onClear('test1', obj.callback)
            cmFilter.onClear('test2', obj.callback)

            cmFilter.clear()
            expect(counter).toBe(2)
        })

        it('callback function should be not called, after cmFilter.removeOnClear()', function(){
            cmFilter.onClear('test', obj.callback)

            cmFilter.removeOnClear('test');

            cmFilter.clear()
            expect(counter).toBe(0)
        })
    })

    describe('5. Test $rootScope.$on("logout")', function(){
        it('cmFilter should be clear after event will be triggered, callbacks should not be called, resultLength should be empty', function(){
            // prepare
            cmFilter.set(test)
            cmFilter.setResultLength(3)

            cmFilter.onUpdate('test', obj.callback)
            cmFilter.onClear('test', obj.callback)

            // clear
            $rootScope.$broadcast('logout')
            counter = 0;

            // checks
            cmFilter.set(test)
            cmFilter.clear();
            expect(counter).toBe(0)
        })
    })
})
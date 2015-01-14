'use strict';

describe('Service cmFilter', function(){

    var cmFilter

    beforeEach(module('cmCore'))

    beforeEach(module('cmUi'))

    beforeEach(inject(function(_cmFilter_){
        cmFilter = _cmFilter_
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
            var test = 'moep'

            expect(cmFilter.get()).toBe('')

            cmFilter.set(test)

            expect(cmFilter.get()).toBe(test)
        })

        it('should be the same "result length" after setResultLength and getResultLength', function(){
            var test = 10

            expect(cmFilter.getResultLength()).toBe(0)

            cmFilter.setResultLength(test)

            expect(cmFilter.getResultLength()).toBe(test)
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
        it('callback function should be called, when cmFilter.set is called with valid string', function(){
            var test = 'moep',
                obj = {
                    callback: function(){

                    }
                }

            spyOn(obj,'callback')

            cmFilter.onUpdate('test', obj.callback)

            cmFilter.set(test)

            expect(obj.callback).toHaveBeenCalled()
        })
    })

    describe('4. Test onClear', function(){
        it('callback function should be called, when cmFilter.clear is called', function(){
            var test = 'moep',
                obj = {
                    callback: function(){

                    }
                }

            spyOn(obj,'callback')

            cmFilter.onClear('test', obj.callback)

            cmFilter.clear()

            expect(obj.callback).toHaveBeenCalled()
        })
    })
})
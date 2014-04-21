'use strict';

describe('cmObject', function(){
    var cmObject

    beforeEach(module('cmObject'))
    beforeEach(inject(function(_cmObject_){
        cmObject = _cmObject_
    }))

    it('should provide a function to add event handling', function(){        
        expect(typeof cmObject.addEventHandlingTo).toBe('function')
    })


    describe('event handling', function(){

        it('should privide functions to trigger an listen to events', function(){
            var myObject = {}

            cmObject.addEventHandlingTo(myObject)

            expect(typeof myObject.on).toBe('function')
            expect(typeof myObject.trigger).toBe('function')
            

            myObject
            .on('step_1', function(){
                this.x = 1
            })
            .on('step_2', function(){
                this.x ++
            })
            .on('step_3', function(){
                this.x ++
            })

            myObject.trigger('step_1')
            expect(myObject.x).toBe(1)

            myObject.trigger('step_2')
            expect(myObject.x).toBe(2)

            myObject.trigger('step_3')
            expect(myObject.x).toBe(3)
        })

    })

})
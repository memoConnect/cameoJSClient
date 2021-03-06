'use strict';

describe('cmObject', function(){
    var cmObject, $q, $rootScope

    beforeEach(module('cmCore'))
    beforeEach(inject(function(_cmObject_, _$q_, _$rootScope_){
        cmObject    = _cmObject_
        $q          = _$q_
        $rootScope  = _$rootScope_
    }))

    it('should provide a function to add event handling to an object.', function(){        
        expect(typeof cmObject.addEventHandlingTo).toBe('function')
    })


    describe('event handling', function(){

        it('should provide functions to trigger an listen to events.', function(){
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

        it('should be able to set a limit of trigger times.', function(){
            var myObject = {},
                x        = 0,
                y        = 0,
                z        = 0,
                o        = 0

            cmObject.addEventHandlingTo(myObject)

            //always increase x
            myObject.on('step', function(){ x++ })

            //set y to x, but only three times
            myObject.on('step', function(){ y = x }, 3)            

            //set z to x, two times, but consider call only as successfull if x is even
            myObject.on('step', function(){ z = x; return x%2 == 0 }, 2)

            //set o to x until x == 5
            myObject.on('step', function(){ o = x; return x == 5 })

            myObject
            .trigger('step')
            .trigger('step')
            .trigger('step')            
            .trigger('step')            
            .trigger('step')            
            .trigger('step')

            expect(x).toBe(6)
            expect(y).toBe(3)
            expect(z).toBe(4)
            expect(o).toBe(5)
        })

        it('should provide a function to broadcast events to another object.', function(){
            var myObject        = {},
                myOtherObject   = {},
                x               = 0,
                source          = undefined,
                target          = undefined

            cmObject.addEventHandlingTo(myObject)
            cmObject.addEventHandlingTo(myOtherObject)

            myObject.broadcastEventsTo(myOtherObject)
            myOtherObject.on('hello_world', function(event){
                x = 1
                source = event.source
                target = event.target
            })

            myObject.trigger('hello_world')

            expect(x).toBe(1)
            expect(source).toBe(myObject)
            expect(target).toBe(myOtherObject)
        })

        it('should provide a function to echo events from another object.', function(){
            var myObject        = {},
                myOtherObject   = {},
                x               = 0,
                source          = undefined,
                target          = undefined

            cmObject.addEventHandlingTo(myObject)
            cmObject.addEventHandlingTo(myOtherObject)

            myObject.echoEventsFrom(myOtherObject)
            myObject.on('hello_world', function(event){
                x = 1
                source = event.source
                target = event.target
            })

            myOtherObject.trigger('hello_world')
            expect(source).toBe(myOtherObject)
            expect(target).toBe(myObject)

            expect(x).toBe(1)
        })

    })


    it('should provide a function to add chain handling to an object.', function(){        
        expect(typeof cmObject.addChainHandlingTo).toBe('function')
    })

    describe('chain handling', function(){
        it('should provide a function to handle chains of methods returning promises or values', function(){
            var myObject = {}

            cmObject.addChainHandlingTo(myObject)
            expect(typeof myObject.$chain).toBe('function')


            cmObject.addEventHandlingTo(myObject)

            myObject.function_1 = function(){
                var deferred = $q.defer()

                this.on('step_1', function(){              
                    deferred.resolve(5)
                })

                return deferred.promise
            }

            myObject.function_2 = function(input){
                var deferred = $q.defer()

                this.x = input

                this.on('step_2', function(){   
                    deferred.resolve(input+2)
                })

                return deferred.promise
            }

            myObject.function_3 = function(input){
                this.y = input + 3

                return this.y
            }

            myObject.function_4 = function(input){
                var deferred = $q.defer()

                this.z = input

                deferred.resolve()

                return deferred.promise
            }

            var done = false

            runs(function(){                
                myObject.$chain()
                .function_1()
                .function_2()
                .function_3()
                .function_4('overwrite_result')                
                .then(function(){
                    done = true
                })

                $rootScope.$apply()
                myObject.trigger('step_1')
                $rootScope.$apply()
                myObject.trigger('step_2')                                
                $rootScope.$apply()
            })

            
            waitsFor(function(){
                return done
            }, 'chain to resolve.', 500)

            runs(function(){
                expect(myObject.x).toBe(5)
                expect(myObject.y).toBe(10)
                expect(myObject.z).toBe('overwrite_result')
            })



        })

    })

})
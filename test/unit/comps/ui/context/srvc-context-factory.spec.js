'use strict';

describe('Service cmContextFactory', function() {

    var cmContextFactory, model_1, model_2, model_3

    beforeEach(module('cmConversations'))

    beforeEach(module('cmContacts'))

    beforeEach(module('cmUi'))

    beforeEach(inject(function(_cmContextFactory_){

        cmContextFactory = _cmContextFactory_

        model_1 = {
            type: 'conversation',
            model: {
                id: 'moep_1'
            }
        }

        model_2 = {
            type: 'conversation',
            model: {
                id: 'moep_2'
            }
        }

        model_3 = {
            type: 'conversation',
            model: {
                id: 'moep_3'
            }
        }
    }))

    describe('Check Factory', function(){
        it('Factory should exists', function(){
            expect(cmContextFactory).toBeDefined()
        })

        it('should exists a clear method', function(){
            expect(cmContextFactory.clear).toBeDefined()
        })

        it('should exists a delete method', function(){
            expect(cmContextFactory.delete).toBeDefined()
        })

        it('should exists a validate method', function(){
            expect(cmContextFactory.validate).toBeDefined()
        })

        it('should exists a hasSelection method', function(){
            expect(cmContextFactory.hasSelection).toBeDefined()
        })
    })

    describe('Check validate method', function(){
        it('should return false, if data is undefined', function(){
            expect(cmContextFactory.validate()).toBe(false)
        })

        it('should return false, if data is null', function(){
            expect(cmContextFactory.validate(null)).toBe(false)
        })

        it('should return false, if data is boolean', function(){
            expect(cmContextFactory.validate(false)).toBe(false)
            expect(cmContextFactory.validate(true)).toBe(false)
        })

        it('should return false, if data is string', function(){
            expect(cmContextFactory.validate('moep')).toBe(false)
        })

        it('should return false, if data is number', function(){
            expect(cmContextFactory.validate(23)).toBe(false)
        })

        it('should return true, if object has the right form', function(){
            expect(cmContextFactory.validate(model_1)).toBe(true)
        })

        it('should return false, if type is missing in object', function(){
           var obj = {
                model: {
                    id: 'moep_1'
                }
            }

            expect(cmContextFactory.validate(obj)).toBe(false)
        })

        it('should return false, if model is missing in object', function(){
           var obj = {
               type: 'conversation'
            }

            expect(cmContextFactory.validate(obj)).toBe(false)
        })

        it('should return false, if model in object is null', function(){
           var obj = {
               type: 'conversation',
               model: null
            }

            expect(cmContextFactory.validate(obj)).toBe(false)
        })

        it('should return false, if model in object is a string', function(){
           var obj = {
               type: 'conversation',
               model: 'moep'
            }

            expect(cmContextFactory.validate(obj)).toBe(false)
        })

        it('should return false, if model in object  missing an id', function(){
           var obj = {
               type: 'conversation',
               model: {

               }
            }

            expect(cmContextFactory.validate(obj)).toBe(false)
        })
    })

    describe('Check hasSe1ection method', function(){
        it('should return false, if cmContextFactory has no object', function(){
            expect(cmContextFactory.hasSelection()).toBe(false)
        })

        it('should return true, if cmContextFactory has an object', function(){
            cmContextFactory.create(model_1)

            expect(cmContextFactory.hasSelection()).toBe(true)
        })

        it('should return true, if cmContextFactory has more then an object', function(){
            cmContextFactory.create(model_1)
            cmContextFactory.create(model_2)
            cmContextFactory.create(model_3)

            expect(cmContextFactory.hasSelection()).toBe(true)
        })
    })

    describe('Check clear method', function(){
        it('cmContextFactory should be empty, after clear', function(){
            cmContextFactory.create(model_1)
            cmContextFactory.create(model_2)
            cmContextFactory.create(model_3)

            expect(cmContextFactory.hasSelection()).toBe(true)

            cmContextFactory.clear()

            expect(cmContextFactory.hasSelection()).toBe(false)
        })
    })

    describe('Check delete method', function(){
        it('should call obj delete method, when delete is called', function(){
            var instance = cmContextFactory.create('model_1')

            expect(instance.delete).toBeDefined()

            spyOn(instance,'delete')

            cmContextFactory.delete();

            expect(instance.delete).toHaveBeenCalled()
        })
    })
})
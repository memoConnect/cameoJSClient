'use strict';

describe('Factory/Services cmContextModel', function() {

    var cmContextModel, cmConversationContextModel, cmContactContextModel, model_1, model_2, model_3

    beforeEach(module('cmConversations'))

    beforeEach(module('cmContacts'))

    beforeEach(module('cmUi'))

    beforeEach(inject(function(){

        model_1 = {
            type: 'conversation',
            model: {
                id: 'moep_1'
            }
        }

        model_2 = {
            type: 'contact',
            model: {
                id: 'moep_2'
            }
        }

        model_3 = {
            type: 'moep',
            model: {
                id: 'moep_3'
            }
        }
    }))

    describe('Check Service/Factory', function(){
        beforeEach(inject(function(_cmContextModel_){
            cmContextModel = new _cmContextModel_(model_1)
        }))

        it('Factory should exists', function(){
            expect(cmContextModel).toBeDefined()
        })

        it('should exists a importData method', function(){
            expect(cmContextModel.importData).toBeDefined()
        })

        it('should exists a delete method', function(){
            expect(cmContextModel.delete).toBeDefined()
        })


        it('should exists a type param', function(){
            expect(cmContextModel.type).toBeDefined()
        })

        it('should exists a model method', function(){
            expect(cmContextModel.model).toBeDefined()
        })
    })

    describe('check module context models (implicit importData check)', function(){

        describe('create cmConversationContextModel', function(){
            beforeEach(inject(function(_cmContextModel_, _cmConversationContextModel_){
                cmContextModel = new _cmContextModel_(model_1)
                cmConversationContextModel = _cmConversationContextModel_
            }))

            it('model should be an instance of cmConversationContextModel', function(){
                expect(cmContextModel.model instanceof cmConversationContextModel).toBe(true)
                expect(cmContextModel.id).toBe(model_1.id)
            })

            it('on delete, model delete method should be called', function(){
                expect(typeof cmContextModel.model.delete).toBe('function')

                spyOn(cmContextModel.model,'delete')

                cmContextModel.delete()

                expect(cmContextModel.model.delete).toHaveBeenCalled()
            })

        })

        describe('create cmContactContextModel', function(){
            beforeEach(inject(function(_cmContextModel_, _cmContactContextModel_){
                cmContextModel = new _cmContextModel_(model_2)
                cmContactContextModel = _cmContactContextModel_
            }))

            it('model should be an instance of cmConversationContextModel', function(){
                expect(cmContextModel.model instanceof cmContactContextModel).toBe(true)
                expect(cmContextModel.id).toBe(model_2.id)
            })

            it('on delete, model delete method should be called', function(){
                expect(typeof cmContextModel.model.delete).toBe('function')

                spyOn(cmContextModel.model,'delete')

                cmContextModel.delete()

                expect(cmContextModel.model.delete).toHaveBeenCalled()
            })
        })

        describe('create undefined model', function(){
            beforeEach(inject(function(_cmContextModel_){
                cmContextModel = new _cmContextModel_(model_3)
            }))

            it('model should not have an instance or an type', function(){
                expect(cmContextModel.model).toBe(undefined)
                expect(cmContextModel.id).toBe(undefined)
            })
        })

    })

})
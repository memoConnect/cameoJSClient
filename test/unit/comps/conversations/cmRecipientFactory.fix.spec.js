'use strict';

describe('cmRecipientFactory', function(){
    var cmRecipientFactory,
        tmpInstance_1 = {identityId:'moep_1',identity:{}},
        tmpInstance_2 = {identityId:'moep_2',identity:{}};


    beforeEach(module('cmConversations'));

    beforeEach(inject(function(_cmRecipientFactory_){
        cmRecipientFactory = _cmRecipientFactory_
    }))

    it('should exists', function(){
        expect(cmRecipientFactory).toBeDefined()
    })

    it('should have create function', function(){
        expect(cmRecipientFactory.create).toBeDefined()
    })

    it('should have getQty function', function(){
        expect(cmRecipientFactory.getQty).toBeDefined()
    })

    it('there should be one instance after create one', function(){
        cmRecipientFactory.create(tmpInstance_1);
        expect(cmRecipientFactory.getQty()).toBe(1);
    })

    it('there should be two instances after create two', function(){
        cmRecipientFactory.create(tmpInstance_1);
        cmRecipientFactory.create(tmpInstance_2);
        expect(cmRecipientFactory.getQty()).toBe(2);
    })

    it('there should be two instances after create two and create one of them twice', function(){
        cmRecipientFactory.create(tmpInstance_1);
        cmRecipientFactory.create(tmpInstance_2);
        expect(cmRecipientFactory.getQty()).toBe(2);

        cmRecipientFactory.create(tmpInstance_1);
        expect(cmRecipientFactory.getQty()).toBe(2);
    })
})

'use strict';

describe('cmConversationFactory', function(){
    var cmConversationFactory,
        tmpInstance_1 = {id:'moep_1',data:{}},
        tmpInstance_2 = {id:'moep_2',data:{}};

    beforeEach(function(){
        module(function($provide){
            $provide.constant('cmEnv',{});
        })
    })
    beforeEach(module('cmConversations'));

    beforeEach(inject(function(_cmConversationFactory_){
        cmConversationFactory = _cmConversationFactory_
    }))

    it('should exist', function(){
        expect(cmConversationFactory).toBeDefined()
    })

    it('should have create function', function(){
        expect(cmConversationFactory.create).toBeDefined()
    })

    it('should have getQty function', function(){
        expect(cmConversationFactory.getQty).toBeDefined()
    })

    it('there should be one instance after create one', function(){
        cmConversationFactory.create(tmpInstance_1);
        expect(cmConversationFactory.getQty()).toBe(1);
    })

    it('there should be two instances after create two', function(){
        cmConversationFactory.create(tmpInstance_1);
        cmConversationFactory.create(tmpInstance_2);
        expect(cmConversationFactory.getQty()).toBe(2);
    })

    it('there should be two instances after create two and create one of them twice', function(){
        cmConversationFactory.create(tmpInstance_1);
        cmConversationFactory.create(tmpInstance_2);
        expect(cmConversationFactory.getQty()).toBe(2);

        cmConversationFactory.create(tmpInstance_1);
        expect(cmConversationFactory.getQty()).toBe(2);
    })
})

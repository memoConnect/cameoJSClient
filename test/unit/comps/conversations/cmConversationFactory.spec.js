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

    it('should provide a function .create() to create new conversations.', function(){
        expect(cmConversationFactory.create).toBeDefined()
    })

    it('should have stored one instance after first call of .create().', function(){        
        cmConversationFactory.create(tmpInstance_1)
        expect(cmConversationFactory.length).toBe(1)
    })

    it('should have stored two instances after next call of .create(). with another id.', function(){        
        cmConversationFactory.create(tmpInstance_1)
        cmConversationFactory.create(tmpInstance_2)
        expect(cmConversationFactory.length).toBe(2)
    })

    it('should still have stored only one instance when .create() gets called again with the same data.', function(){
        cmConversationFactory.create(tmpInstance_1)
        expect(cmConversationFactory.length).toBe(1)       
        cmConversationFactory.create(tmpInstance_2)
        expect(cmConversationFactory.length).toBe(2)              
        cmConversationFactory.create(tmpInstance_1)
        expect(cmConversationFactory.length).toBe(2)
    })

    it('should have no instances stroed after call of .reset().', function(){
        cmConversationFactory.reset()
        expect(cmConversationFactory.length).toBe(0)
    })
})

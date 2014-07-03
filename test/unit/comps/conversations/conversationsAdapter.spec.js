'use strict';

describe('ConversationsAdapter', function(){

    var cmConversationsAdapter,
        $httpBackend

    beforeEach(function(){
        module(function($provide){
            $provide.constant('cmEnv',{});
        })
    })

    beforeEach(module('cmConversations'))

    beforeEach(inject(function(_cmConversationsAdapter_){
        cmConversationsAdapter = _cmConversationsAdapter_
    }))

    it('should provide a method "newConversation"".', function(){
        expect(typeof cmConversationsAdapter.newConversation).toBe('function')
    })

    it('should provide a method "getConversations"".', function(){
        expect(typeof cmConversationsAdapter.getConversations).toBe('function')
    })

    it('should provide a method "getConversation"".', function(){
        expect(typeof cmConversationsAdapter.getConversation).toBe('function')
    })

    it('should provide a method "addRecipient"".', function(){
        expect(typeof cmConversationsAdapter.addRecipient).toBe('function')
    })

    it('should provide a method "removeRecipient"".', function(){
        expect(typeof cmConversationsAdapter.removeRecipient).toBe('function')
    })

    it('should provide a method "updateSubject"".', function(){
        expect(typeof cmConversationsAdapter.updateSubject).toBe('function')
    })

    it('should provide a method "sendMessage"".', function(){
        expect(typeof cmConversationsAdapter.sendMessage).toBe('function')
    })


})
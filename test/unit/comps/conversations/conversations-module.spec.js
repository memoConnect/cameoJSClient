'use strict';

describe('cmConversations', function(){

    beforeEach(function(){
        module(function($provide){
            $provide.constant('cmEnv',{});
        })
    })

    beforeEach(module('cmConversations'))

    it('should provide a service "cmConversationsAdapter"', inject(function(cmConversationsAdapter){
        expect(cmConversationsAdapter).toBeDefined()
    }))

    it('should provide a service "cmConversationModel"', inject(function(cmConversationModel){
        expect(cmConversationModel).toBeDefined()
    }))

})
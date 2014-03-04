'use strict';

describe('cmConversations', function(){

    beforeEach(module('cmConversations'))

    it('should provide a service "conversationsAdapter"', inject(function(cmConversationsAdapter){
        expect(cmConversationsAdapter).toBeDefined()
    }))

    it('should provide a service "conversationsModel"', inject(function(cmConversationsModel){
        expect(cmConversationsAdapter).toBeDefined()
    }))

})
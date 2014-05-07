'use strict';

describe('cmConversations', function(){

    beforeEach(module('cmConversations'))

    beforeEach(module('cmFiles'));

    it('should provide a service "cmConversationsAdapter"', inject(function(cmConversationsAdapter){
        expect(cmConversationsAdapter).toBeDefined()
    }))

    it('should provide a service "cmConversationModel"', inject(function(cmConversationModel){
        expect(cmConversationModel).toBeDefined()
    }))

})
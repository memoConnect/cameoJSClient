'use strict';

describe('cmConversations', function(){

    beforeEach(module('cmPhonegap'))
    beforeEach(module('cmConversations'))
    beforeEach(module('cmConfig'))

    it('should provide a service "cmConversationsAdapter"', inject(function(cmConversationsAdapter){
        expect(cmConversationsAdapter).toBeDefined()
    }))

    it('should provide a service "cmConversationModel"', inject(function(cmConversationModel){
        expect(cmConversationModel).toBeDefined()
    }))

})
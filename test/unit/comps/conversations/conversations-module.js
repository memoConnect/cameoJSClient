'use strict';

describe('cmConversations', function(){

    beforeEach(module('cmConversations'))

    it('should provide a service "conversationsAdapter"', function(){
        expect(conversationsAdpaterService).toBeDefined()
    })

})
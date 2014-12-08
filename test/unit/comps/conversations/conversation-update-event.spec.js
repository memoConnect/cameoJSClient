'use strict';

describe('Conversation-Update-Event: ', function(){
    var cmConversationFactory,
        cmConversationsAdapter,
        testConversation,
        testConversationOptions = {
            id: 'moep1337',
            unreadMessages: 12
        },
        testEventData = {
            id: 'moep1337',
            unreadMessages: 0
        }

    beforeEach(function() {
            module('cmCore')
            module('cmConfig')
            module('cmConversations')
            inject(function (_cmConversationFactory_, _cmConversationsAdapter_) {
                cmConversationFactory = _cmConversationFactory_
                cmConversationsAdapter = _cmConversationsAdapter_
            })
        }
    )


    it('should create a conversation with test data', function(){
        testConversation = cmConversationFactory.create(testConversationOptions);

        expect(testConversation.id).toBe(testConversationOptions.id)
        expect(testConversation.unreadMessages).toBe(testConversationOptions.unreadMessages)

        cmConversationsAdapter.trigger('conversation:update', testEventData)

        expect(testConversation.id).toBe(testConversationOptions.id)
        expect(testConversation.unreadMessages).toBe(testEventData.unreadMessages)
    })
})
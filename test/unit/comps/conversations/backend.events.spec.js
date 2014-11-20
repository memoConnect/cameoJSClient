'use strict';

describe('Event chain for Conversations', function(){

    var cmApi,
        cmConversationsAdapter,
        cmConversationFactory,
        $rootScope,
        $httpBackend,

        conversation_data   =   {
                                    "id"            :   "OM9QeJ4RfJcdscyo52g4",
                                    "lastUpdated"   :   1392983491351,
                                    "messages"      :   [
                                                            {
                                                                "id":"0kKqtZmEWKs0ndF03GHp",
                                                                "fromIdentity":"ög9PWZY7xKNbeCO6LPNnx",
                                                                "plain":null,
                                                                "encrypted":null,
                                                                "created":1392983860949
                                                            }
                                                        ],
                                    "numberOfMessages":3,
                                    "aePassphraseList":[]
                                },
        message_data        =   {
                                    "id":"1",
                                    "fromIdentity":"g9PWZY7xKNbeCO6LPNnx",
                                    "plain":null,
                                    "encrypted":null,
                                    "created":1392983860949
                                } 

    beforeEach(module('cmPhonegap'))
    beforeEach(module('cmConversations'))
    beforeEach(module('cmConfig'))

    beforeEach(inject(function(_cmApi_, _cmConversationsAdapter_, _cmConversationFactory_, _$rootScope_, _$httpBackend_){
        cmApi                   = _cmApi_
        cmConversationsAdapter  = _cmConversationsAdapter_
        cmConversationFactory   = _cmConversationFactory_
        $rootScope              = _$rootScope_
        $httpBackend            = _$httpBackend_
    }))

    describe('backend event conversation:new', function(){
        it('should add a new conversation', function(){
            var adapter_triggered,
                number_of_conversations = cmConversationFactory.length

            cmConversationsAdapter.on('conversation:new', function(){ adapter_triggered = true })

            $httpBackend.whenGET('/account').respond(200, {})
            $httpBackend.whenGET('/identity/ög9PWZY7xKNbeCO6LPNnx').respond(200, {})

            cmApi.trigger('conversation:new', conversation_data)

            $rootScope.$apply()

            expect(adapter_triggered).toBe(true)
            expect(cmConversationFactory.length).toBe(number_of_conversations + 1)
        })
    })

    describe('backend event conversation:new-message', function(){

        beforeEach(function(){
            $rootScope.checkConversationRoute = function(){}
        })

        it('should add a new message', function(){

            var adapter_triggered,
                conversation_triggered,
                conversation        = cmConversationFactory.create(conversation_data),
                number_of_messages  = conversation.messages.length

            $httpBackend.whenGET('/account').respond(200, {})
            $httpBackend.whenGET('/identity/ög9PWZY7xKNbeCO6LPNnx').respond(200, {})
            $httpBackend.whenGET('/identity/g9PWZY7xKNbeCO6LPNnx').respond(200, {})

            cmConversationsAdapter.on('message:new', function(){ adapter_triggered = true })
            conversation.on('message:new', function(){ conversation_triggered = true })

            cmApi.trigger('conversation:new-message', {
                conversationId: conversation_data.id,
                message:        message_data
            })

            $rootScope.$apply()

            expect(adapter_triggered).toBe(true)
            expect(conversation_triggered).toBe(true)
            expect(conversation.messages.length).toBe(number_of_messages + 1)
        })
    })
})
'use strict';

angular.module('cmConversations').service('cmConversationsAdapter', [
    'cmApi',
    'cmUtil',
    function (cmApi, cmUtil){
        return {

            newConversation: function(subject) {
                return	cmApi.post({
                    url: 	'/conversation',
                    data:	{
                                subject: subject
                            }
                })
            },

            updateConversation: function(conversation){
                return cmApi.put({
                    url: '/conversation/' + conversation.id,
                    data: conversation
                });
            },

            getConversations: function(limit, offset) {
                return	cmApi.get({
                    url: '/conversations' + cmUtil.handleLimitOffset(limit,offset)
                })
            },

            getConversation: function(id, limit, offset) {
                return 	cmApi.get({
                    url: 	'/conversation/'+ id + cmUtil.handleLimitOffset(limit,offset)
                })
            },

            getConversationSummary: function(id){
                return cmApi.get({
                    url: '/conversation/' + id + '/summary'
                })
            },

            getPurl: function(id){
                return cmApi.get({
                    url:'/purl/' + id
                })
            },

            addRecipient: function(id_converation, id_identity_recipient){
                return	cmApi.post({
                            url:	'/conversation/%1/recipient'.replace(/%1/, id_converation),
                            data:	{
                                        recipients: [id_identity_recipient]
                                    }
                        })
            },

            removeRecipient: function(id, recipient_id){
                return	cmApi.delete({
                            url:	'/conversation/%1/recipient/%2'.replace(/%1/, id).replace(/%2/, recipient_id)
                        })
            },

            updateSubject: function(id, subject){
                return  cmApi.put({
                            url:    '/conversation/%1'.replace(/%1/, id),
                            data:   {
                                        subject: subject
                                    }
                        })
            },

            sendMessage: function(id, message){
                return	cmApi.post({
                            url:	"/conversation/%1/message".replace(/%1/, id),
                            data: 	message
                        })
            },

            updateEncryptedPassphraseList: function(id, encryptedPassphraseList){
                return  cmApi.post({
                            url:    "/conversation/%1/encryptedPassphraseList".replace(/%1/, id),
                            data:   {encryptedPassphraseList : encryptedPassphraseList}
                        })
            },

            getEncryptedPassphraseList: function(id){
                return  cmApi.get({
                            url:    "/conversation/%1/encryptedPassphraseList".replace(/%1/, id)
                        })
            }
        }
    }
])
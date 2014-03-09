'use strict';

function cmConversationsAdapter(cmApi, cmUtil){
    return {

        newConversation: function(subject) {
            return	cmApi.post({
                url: 	'/conversation',
                data:	{
                            subject: subject
                        }
            })
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

        getPurl: function(id){
            return cmApi.get({
                url:'/purl/' + id
            })
        },

        addRecipient: function(id, recipient_id){
            return	cmApi.post({
                        url:	'/conversation/%1/recipient'.replace(/%1/, id),
                        data:	{
                                    recipients: [recipient_id]
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

        sendMessage: function(id, messageBody){
            return	cmApi.post({
                        url:	"/conversation/%1/message".replace(/%1/, id),
                        data: 	{
                                    messageBody: messageBody
                                }
                    })
        }
    }
}
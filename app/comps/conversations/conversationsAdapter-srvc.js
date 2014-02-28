/*
define([
    'app',

    'cmApi',
    'cmAuth',
    'cmCrypt',
    'cmLogger',
    'cmContacts',
    'util-base64',
    'util-passchk-fast',    
   	'_v/captcha/captchagen/captchagen'
], function (app) {
*/    
    'use strict';

//	var cmConversations = angular.module('cmConversations', ['cmApi', 'cmLogger', 'cmCrypt', 'cmContacts']);

console.log('adapter')

function cmConversationsAdapter($q, cmApi){
    return {

        newConversation: function(subject) {
            return	cmApi.post({
                        url: 	'/conversation',
                        data:	{
                                    subject: subject
                                }
                    })
        },

        getConversations: function(offset, limit) {
            return	cmApi.get({
                        url: 	'/conversations',
                        data:	{
                                    offset:	offset,
                                    limit:	limit
                                }
                        //exp_ok:	'messages'
                    })
        },

        getConversation: function(id, offset, limit) {
            return 	cmApi.get({
                        url: 	'/conversation/'+id,
                        data:	{
                                    offset:	offset,
                                    limit:	limit
                                }
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
/*
    return app;

});
*/
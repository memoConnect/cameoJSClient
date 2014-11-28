'use strict';

angular.module('cmConversations').service('cmConversationsAdapter', [
    'cmApi',
    'cmUserModel',
    'cmObject',
    'cmUtil',
    'cmLogger',
    function (cmApi, cmUserModel, cmObject, cmUtil, cmLogger){
        var adapter = {

            newConversation: function(data) {
                return cmApi.post({
                    path: 	'/conversation',
                    data:	data
                })
            },

            _updateConversation: function(conversation){
                return cmApi.put({
                    path: '/conversation/' + conversation.id,
                    data: conversation
                });
            },

            getConversations: function(limit, offset){
                //cmLogger.debug('getConversations');
                var queryString = cmUtil.handleLimitOffset(limit,offset);

                if(queryString == ''){
                    queryString += '?' + cmUserModel.getLocalKeyIdsForRequest();
                } else {
                    queryString += cmUserModel.getLocalKeyIdsForRequest();
                }

                return cmApi.get({
                    path: '/conversations' + queryString
                })
            },

            getConversation: function(id, limit, offset, timeLimit){
                //cmLogger.debug('getConversation');
                var queryString = cmUtil.handleLimitOffset(limit,offset, timeLimit);

                if(queryString == ''){
                    queryString += '?' + cmUserModel.getLocalKeyIdsForRequest();
                } else {
                    queryString += cmUserModel.getLocalKeyIdsForRequest();
                }

                return cmApi.get({
                    path: '/conversation/'+ id + queryString
                })
            },

            getConversationSummary: function(id){
                //cmLogger.warn('cmConversationAdapter: .getConversationSummary is deprecated; use .getConversation(id, 1, 0) instead')
                //return this.getConversation(id, 1, 0)
                return cmApi.get({
                    path: '/conversation/' + id + '/summary' + '?' +  cmUserModel.getLocalKeyIdsForRequest()
                })
            },

            getConversationMessages: function(id, limit, offset, timeLimit) {
                var queryString = cmUtil.handleLimitOffset(limit,offset,timeLimit);

                if(queryString == ''){
                    queryString += '?' + cmUserModel.getLocalKeyIdsForRequest();
                } else {
                    queryString += cmUserModel.getLocalKeyIdsForRequest();
                }

                return cmApi.get({
                    path: '/conversation/'+ id + '/messages' + queryString
                })
            },


            getPurl: function(id){
                return cmApi.get({
                    path:'/purl/' + id + '?' +  cmUserModel.getLocalKeyIdsForRequest()
                })
            },

            addRecipient: function(id_conversation, id_identity_recipient){
                return	cmApi.post({
                            path:	'/conversation/%1/recipient'.replace(/%1/, id_conversation),
                            data:	{
                                        recipients: [id_identity_recipient]
                                    }
                        })
            },

            removeRecipient: function(id, recipient_id){
                return	cmApi.delete({
                            path:	'/conversation/%1/recipient/%2'.replace(/%1/, id).replace(/%2/, recipient_id)
                        })
            },

            updateSubject: function(id, subject){
                return  cmApi.put({
                            path:    '/conversation/%1'.replace(/%1/, id),
                            data:   {
                                        subject: subject
                                    }
                        })
            },

            updateCaptcha: function(id, idFile){
                return  cmApi.put({
                            path:    '/conversation/'+id,
                            data:   {
                                        passCaptcha: idFile
                                    }
                        })
            },

            sendMessage: function(id, message){
                return	cmApi.post({
                            path:	"/conversation/%1/message".replace(/%1/, id),
                            data: 	message
                        })
            },

            sendReadStatus: function(idConversation, idMessage){
                return	cmApi.post({
                    path:	"/conversation/" + idConversation + "/message/" + idMessage + "/read"
                })
            },

            updateEncryptedPassphraseList: function(id, aePassphraseList){
                return  cmApi.post({
                            path:    "/conversation/%1/aePassphrases".replace(/%1/, id),
                            data:   {aePassphraseList : aePassphraseList}
                        })
            }
        };

        cmObject.addEventHandlingTo(adapter);
       
        cmApi.on('conversation:new-message', function(event, data){
            adapter.trigger('message:new', data)
        });

        cmApi.on('conversation:new', function(event, data){
            adapter.trigger('conversation:new', data)
        });

        cmApi.on('conversation:update', function(event, data){
            adapter.trigger('conversation:update', data)
        });

        cmApi.on('rekeying:finished', function(event, data){
            cmLogger.debug('cmConversationsAdapter.on rekeying:finished');
            adapter.trigger('passphrases:updated', data);
        });

        cmApi.on('subscriptionId:changed', function(){
            //cmLogger.debug('cmConversationsAdapter.on subscriptionId:changed');
            adapter.trigger('subscriptionId:changed');
        });

        return adapter
    }
])
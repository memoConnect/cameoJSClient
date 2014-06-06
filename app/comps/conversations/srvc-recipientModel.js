'use strict';

/**
 * @deprecated
 */
angular.module('cmConversations').factory('cmRecipientModel',[
    'cmConversationsAdapter',
    'cmUserModel',
    'cmIdentityFactory',
    'cmLogger',
    function (cmConversationsAdapter, cmUserModel, cmIdentityFactory, cmLogger){

        function RecipientModel(identity){
            cmLogger.debug('RecipientModel deprecated!!!!');

            var self = cmIdentityFactory.create(identity);

            self.addTo = function(conversation){
                conversation.addRecipient(self);
                return self;
            };

            self.sendTo = function(conversationId){
                if(conversationId != ''){
                    cmConversationsAdapter.addRecipient(conversationId, self.id);
                }

                return self;
            };

            self.removeFrom = function(conversationId){
                if(conversationId != ''){
                    cmConversationsAdapter.removeRecipient(conversationId, self.id);
                }

                return self;
            };

            return self;
        }

        return RecipientModel;
    }
]);
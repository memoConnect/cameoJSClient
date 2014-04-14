function cmRecipientModel (cmConversationsAdapter, cmUserModel){
    var RecipientModel = function(identity){
        var self = identity;

        self.addTo = function(conversation){
            conversation.addRecipient(self);
            return self;
        }

        self.sendTo = function(conversationId){
            if(conversationId != ''){
                cmConversationsAdapter.addRecipient(conversationId, self.id);
            }

            return self;
        }

        self.removeFrom = function(conversationId){
            if(conversationId != ''){
                cmConversationsAdapter.removeRecipient(conversationId, self.id);
            }

            return self;
        }

        return identity
    }

    return RecipientModel;
}
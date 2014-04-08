function cmRecipientModel (cmConversationsAdapter, cmUserModel){
    var RecipientModel = function(identity){
        var self = this;

        this.addTo = function(conversation){
            conversation.addRecipient(self);
            return this;
        }

        this.sendTo = function(conversationId){
            if(conversationId != ''){
                cmConversationsAdapter.addRecipient(conversationId, this.id);
            }

            return this;
        }

        this.removeFrom = function(conversationId){
            if(conversationId != ''){
                cmConversationsAdapter.removeRecipient()(conversationId, this.id);
            }

            return this;
        }

        this.init = function(identity){
            angular.extend(this, identity);
        }

        this.init(identity);
    }

    return RecipientModel;
}
function cmRecipientModel (cmConversationsAdapter, cmUserModel){
    var RecipientModel = function(identity){
        var self = this;

        this.addTo = function(conversation){
            conversation.addRecipient(self);
            return this;
        }

        this.sendTo = function(conversationId){

        }

        this.removeFrom = function(conversationId){
            cmConversationsAdapter.removeRecipient()(conversationId, this.id);
        }

        this.init = function(identity){
            angular.extend(this, identity);
        }

        this.init(identity);
    }

    return RecipientModel;
}
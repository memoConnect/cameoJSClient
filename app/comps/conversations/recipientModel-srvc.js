function cmRecipientModel (cmConversationsAdapter, cmUserModel){
    var RecipientModel = function(identity){
        var self = this;

        this.addTo = function(conversationId){

        }

        this.sendTo = function(conversationId){

        }

        this.init = function(identity){
            angular.extend(this, identity);
        }

        this.init(identity);
    }

    return RecipientModel;
}
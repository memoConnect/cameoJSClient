'use strict';

function cmRecipientModel (cmConversationsAdapter){
    var Recipient = function(data){
        this.id = '';
        this.displayName = '';

        var self = this;

        this.addTo = function (conversation) {
            return  cmConversationsAdapter.addRecipient(conversation.id, this.id)
                .then(function () {
                    conversation.addRecipient(self)
                });
        };

        this.removeFrom = function (conversation) {
            return    cmConversationsAdapter.removeRecipient(conversation.id, this.id)
                .then(function () {
                    conversation.removeRecipient(self)
                });
        };

        this.init = function (identity_data) {
            this.id = identity_data.id
            this.displayName = identity_data.cameoId || identity_data.displayName || identity_data.id
        };

        this.init(data);
    };

    return Recipient;
}
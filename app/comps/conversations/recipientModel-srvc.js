'use strict';

function cmRecipientModel (cmConversationsAdapter, cmUserModel, cmIdentity, cmAuth){
    var Recipient = function(id, data){
        this.id = '';
        this.displayName = '';
        this.cameoId = '';
        this.publicKey = '';

        var self = this,
            check = false;

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

        this.init = function (id, identity_data) {
            if(typeof id !== 'undefined'){
                this.id = id;
                if(id == cmUserModel.data.id){
                    this.displayName = cmUserModel.data.displayName || cmUserModel.data.cameoId ||  cmUserModel.data.id;
                } else {
                    if(typeof identity_data !== 'undefined'){
                        this.displayName = identity_data.displayName || identity_data.cameoId ||  identity_data.id;
                    } else {
                        cmAuth.getIdentity(this.id).then(
                            function(data){
                                self.displayName = data.cameoId || data.displayName || data.id
                            }
                        )
                    }
                }
            }
        };

        this.init(id, data);
    };

    return Recipient;
}
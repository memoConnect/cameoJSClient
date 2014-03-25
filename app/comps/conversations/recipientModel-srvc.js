'use strict';

function cmRecipientModel (cmConversationsAdapter, cmUserModel, cmIdentity){
    
    var Recipient = function(data){
        var self = this;

        this.addTo = function (conversation) {
            return  cmConversationsAdapter.addRecipient(conversation.id, this.identity.id)
                    .then(function () {
                        conversation.addRecipient(self)
                    });
        };

        this.removeFrom = function (conversation) {
            return cmConversationsAdapter.removeRecipient(conversation.id, this.identity.id)
                .then(function () {
                    conversation.removeRecipient(self)
                });
        };

        //@ TODO cmUserModel umbauen
        this.init = function (data) {
            if(typeof data !== 'undefined'){
                if(typeof data === 'string'){
                    if(data == cmUserModel.data.id){
                        this.identity = cmUserModel.data;
                    } else {
                        this.identity = cmIdentity.create(data);
                    }
                } else {
                    this.identity = cmIdentity.create(data.identity.id);
                }

//                angular.extend(this, data);
//
//                if(data.identity.id == cmUserModel.data.id){
//                    this.identity = cmUserModel.data;
//
//                } else {
//                    this.identity = cmIdentity.create(data.identity.id);
//                }
            }
        };

        this.init(data);
    };

    return Recipient;
}
'use strict';

function cmMessageModel (cmConversationsAdapter,cmCrypt){
    var Message = function(data){
        //Attributes:
        this.id = '';
        this.body = '';
        this.decryptedBody = '';
        this.from = '';
        this.status = '';
        this.lastUpdated = '';
        this.created = '';
        this.lastMessage = '';

        var self = this;

        this.encryptWith = function (passphrase) {
            this.body = cmCrypt.encryptWithShortKey(passphrase, this.body)
            return this;
        }

        this.decryptWith = function (passphrase) {
            var decrypted_text = cmCrypt.decrypt(passphrase, this.body)
            this.decryptedBody = decrypted_text || this.body
            return !!decrypted_text;
        }

        this.sendTo = function (conversation) {
            return  cmConversationsAdapter.sendMessage(conversation.id, {
                        body: self.body
                    })
                    .then(function (message_data) {
                        conversation.addMessage(new Message(message_data))
                    })
        }

        this.init = function (message_data) {
            this.id = message_data.id;
            this.body = message_data.body;
            this.decryptedBody = message_data.messageBody;
            this.fromIdentity = message_data.fromIdentity;
            this.status = message_data.messageStatus;
            this.lastUpdated = message_data.lastUpdated;
            this.created = message_data.created;
            this.lastMessage = message_data.lastMessage;
        }

        this.init(data);
    };

    return Message;
}
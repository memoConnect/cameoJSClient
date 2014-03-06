'use strict';

function cmConversationModel (cmConversationsAdapter, cmMessageFactory, cmRecipientFactory){
    var ConversationModel = function(data){
        //Attributes:
        this.id = '';
        this.subject = '';
        this.messages = [];
        this.recipients = [];
        this.passphrase = '';
        this.count = 0;
        this.lastMessage = undefined;

        var self = this;

        this.init = function (conversation_data) {
            this.id             = conversation_data.id;
            this.subject        = conversation_data.subject;
            this.count          = conversation_data.numberOfMessages;

            // register all messages as Message objects
            if (conversation_data.messages) {
                conversation_data.messages.forEach(function (message_data) {
                    self.addMessage(cmMessageFactory.create(message_data));
                })
            }

            // register all recipients as Recipient objects
            if (conversation_data.recipients) {
                conversation_data.recipients.forEach(function (recipient_data) {
                    if (typeof recipient_data == 'string') {
                        cmAuth.getIdentity(recipient_data)
                            .then(function (identity) {
                                self.addRecipient(cmRecipientFactory.create(identity))
                            });
                    } else {
                        self.addRecipient(new cmRecipientFactory(recipient_data));
                    }
                })
            }
        };

        this.addMessage = function (message) {
            this.messages.push(message);
            this.lastMessage = message;
            if (this.passphrase) message.decryptWith(this.passphrase);
            return this
        };

        this.addRecipient = function (recipient) {
            this.recipients.push(recipient);
            return this;
        };

        this.removeRecipient = function (recipient) {
            var i = this.recipients.length;

            while (i) {
                i--;
                if (this.recipients[i] == recipient) this.recipients.splice(i, 1);
            }
            return this;
        };

        this.updateSubject = function (subject) {
            cmConversationsAdapter.updateSubject(this.id, subject)
                .then(function(){
                    self.subject = subject
                })
        };

        this.newMessage = function (message_data) {
            var message_data = (typeof message_data == 'string' ? {messageBody: message_data} : message_data )
            return new Message(message_data)
        };

        this.newRecipient = function (identity_data) {
            var identity_data = (typeof identity_data == 'string' ? {id: identity_data} : identity_data )
            return new Recipient(identity_data);
        };

        this.setPassphrase = function (passphrase) {
            this.passphrase = passphrase
            return this;
        };

        this.decrypt = function () {
            if (this.passphrase) {
                this.messages.forEach(function (message) {
                    message.decryptWith(self.passphrase);
                })
            }
        };

        this.passphraseValid = function () {
            return !this.messages[0] || this.messages[0].decryptWith(this.passphrase)
        };

        this.update = function () {
            cmConversationsAdapter.getConversation(this.id)
                .then(function(data){
                    self.init(data)
                });

            return this;
        };

        this.newestMessage = function(){
            if(this.lastMessage !== undefined){
                return this.lastMessage;
            }
            return false;
        }

        this.init(data);
    }

    return ConversationModel;
}
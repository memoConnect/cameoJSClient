'use strict';

function cmConversationModel (cmConversationsAdapter, cmMessageFactory, cmRecipientFactory){
    var ConversationModel = function(data){
        //Attributes:
        this.id = '';
        this.subject = '';
        this.messages = [];
        this.recipients = [];
        this.passphrase = '';
        this.created = '';
        this.lastUpdated = '';
        this.count = 0;
        this.lastMessage = undefined;

        var self = this;

        this.init = function (conversation_data) {            
            this.id             = conversation_data.id;
            this.subject        = conversation_data.subject;
            this.count          = conversation_data.numberOfMessages;
            this.lastUpdated    = conversation_data.lastUpdated;

            // register all messages as Message objects
            if (conversation_data.messages) {
                conversation_data.messages.forEach(function (message_data) {
                    self.addMessage(cmMessageFactory.create(message_data));
                })
            }

            // register all recipients as Recipient objects
            if (conversation_data.recipients) {
                conversation_data.recipients.forEach(function (recipient_data) {
                    self.addRecipient(cmRecipientFactory.create(recipient_data));
                })
            }
        };


        /**
         * Message Handling
         */

        /**
         * add Message to Conversation
         * @param message
         * @returns {cmConversationModel.ConversationModel}
         */
        this.addMessage = function (message) {
            if(this.messages.length == 0){
                this.messages.push(message);
            } else {
                var i = 0;
                var check = false;
                    while(i < this.messages.length){
                    if(message.id == this.messages[i].id){
                        check = true;
                        break;
                    }
                    i++;
                }

                if(check !== true){
                    this.messages.push(message);
                }
            }

            this.lastMessage = message;
            if (this.passphrase) message.decryptWith(this.passphrase);
            return this
        };

        this.newMessage = function (message_data, passphrase) {
            var message_data = (typeof message_data == 'string' ? {body: message_data} : message_data )

            var message = cmMessageFactory.create(message_data);

            if(typeof passphrase !== 'undefined' && passphrase != ''){
                message.encryptWith(passphrase);
            }

            return message//.sendTo(this);
        };

        this.getLastMessage = function(){
            if(this.lastMessage !== undefined){
                return this.lastMessage;
            }
            return false;
        }

        /**
         * Recipient Handling
         */

        this.hasRecipient = function(recipient){
            var check = false;

            console.log('in: '+recipient.identity.id)

            this.recipients.forEach(function(r){
                console.log('test: '+r.identity.id)
                check = check || (recipient.identity.id == r.identity.id)
            })
            
            return check
        }

        this.addRecipient = function (recipient) { 
        console.log(recipient)                                   
            recipient && !this.hasRecipient(recipient)
            ?   this.recipients.push(recipient)
            :   console.warn('Recipient already added.') //@ Todo
            return this;
        };

        this.newRecipient = function (identity_data) {
            return (
                identity_data
                ?   cmRecipientFactory.create(identity_data).addTo(this)
                :   null
            )
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

        this.setPassphrase = function (passphrase) {
            this.passphrase = passphrase
            return this;
        };

        this.decrypt = function () {
            var success = true
            if (this.passphrase) {
                this.messages.forEach(function (message) {
                    success = success && message.decrypt(self.passphrase); //@TODO
                })
            }
            return success
        };

        this.passphraseValid = function () {
            return !this.messages[0] || this.messages[0].decrypt(this.passphrase)
        };

        this.update = function () {
            cmConversationsAdapter.getConversation(this.id)
                .then(function(data){
                    self.init(data)
                });

            return this;
        };

        this.init(data);

    }

    return ConversationModel;
}
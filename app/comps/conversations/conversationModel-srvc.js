'use strict';

function cmConversationModel (cmConversationsAdapter, cmMessageFactory, cmIdentityFactory){
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
                conversation_data.recipients.forEach(function (item) {                    
                    self.addRecipient(cmIdentityFactory.create(item.identityId));
                })
            }
        };

        /**
         * @TODO with timestamp
         * @returns {string}
         */
        this.getLastUpdate = function(){
            return this.lastUpdated;
        }

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
            }else {
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

            if (this.passphrase) message.decrypt(this.passphrase);
            return this
        };

        this.getLastMessage = function(){
            if(this.messages.length > 0){
                return this.messages[(this.messages.length - 1)];
            }
            return cmMessageFactory.createDummy();
        }

        /**
         * Recipient Handling
         */

        this.hasRecipient = function(identity){
            var check = false;          

            this.recipients.forEach(function(recipient){
                check = check || (identity.id == recipient.id)
            })
            
            return check
        }

        this.addRecipient = function (identity) {
            if(identity && !this.hasRecipient(identity)){
                this.recipients.push(identity)
                cmConversationsAdapter.addRecipient(this.id, identity.id)
            }else{
                console.warn('Recipient already present.') //@ Todo
            }
            return this;
        };

        this.removeRecipient = function (identity) {
            var i = this.recipients.length;

            while (i) {
                i--;
                if (this.recipients[i] == identity){
                    this.recipients.splice(i, 1);
                    cmConversationsAdapter.remoceRecipient(this.id, identity.id)
                }
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

        this.getRecipientList = function(){
            var list = []

            this.recipients.forEach(function(recipient){
                list.push(recipient.getDisplayName())
            })

            return list.join(', ')
        }

        this.getSubjectLine = function(){
            var lastMessage = this.getLastMessage();
            return     this.subject
                    || (lastMessage ? lastMessage.from.getDisplayName() : false)
                    || this.getRecipientList()
        }

        this.getSavetyLevel = function(){
            return this.passphraseValid() && !this.passphrase ? 0 : 1     
        }

        this.init(data);

    }

    return ConversationModel;
}
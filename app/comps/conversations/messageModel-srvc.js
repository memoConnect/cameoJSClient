'use strict';

function cmMessageModel (cmConversationsAdapter,cmCrypt,cmIdentity){
    var Message = function(data){
        //Attributes:
        var self = this;

        //secret data:
        this.secret =   ['text', 'fileIds', 'from'],

        //public data
        this.public =   [] 
   

        this.encrypt = function (passphrase) {

            //merge secret_data into json string:

            var secret_data = {}

            this.secret.forEach(function(key){
                data[key] = self[key]
            })

            var secret_JSON = JSON.stringify(this.secret_data)

            this.encryptedData = cmCrypt.encryptWithShortKey(passphrase, secret_JSON) //@ TODO!!!!
            return this;
        }

        this.decrypt = function (passphrase) {
            var decrypted_data = cmCrypt.decrypt(passphrase, this.encryptedData)

            //expose data on message Object
            angular.extend(self, decrypted_data)
        }

        this.sendTo = function (conversation) {

            return  cmConversationsAdapter.sendMessage(conversation.id, {
                        body: self.encryptedData
                    })
                    .then(function (message_data) {
                        conversation.addMessage(new Message(message_data))
                    })
        }

        this.init = function (message_data) {            
            this.secret.decryptedData = undefined

            this.id         = message_data.id;            
            this.from       = cmIdentity.create(message_data.fromIdentity);
            this.created    = message_data.created;
            this.text       = undefined
            this.fileIds    = message_data.fileIds;

            this.encryptedData = message_data.body;            
        }

        this.init(data);
    };

    return Message;
}
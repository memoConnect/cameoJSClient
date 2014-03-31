'use strict';

function cmMessageModel (cmConversationsAdapter, cmCrypt, cmIdentityFactory, cmUserModel){
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
                if(self[key]) secret_data[key] = self[key]
            })

            var secret_JSON = JSON.stringify(secret_data)

            this.encryptedData = cmCrypt.encryptWithShortKey(passphrase, secret_JSON) //@ TODO!!!!
            
            return this;
        }

        this.decrypt = function (passphrase) {
            var decrypted_data = JSON.parse(cmCrypt.decrypt(passphrase, this.encryptedData))

            //expose data on message Object
            angular.extend(self, decrypted_data)

            return !!decrypted_data
        }

        this.sendTo = function (conversation) { 
            self.fromIdentity = cmUserModel.data.identity                     
            return  cmConversationsAdapter.sendMessage(conversation.id, { body: this.encryptedData })
                    .then(function (message_data) {
                        conversation.addMessage(self)   //maybe replace self with new cmMessageModel(message_data) for more metadata
                                                        //cant use cmMassageFactory here, because cmMessageFactory dependes on cmMessageModel
                    })
        }

        this.isOwn = function(){
            return (cmUserModel.data.id == this.fromIdentity.id)
        }

        this.init = function (message_data) {            
            this.secret.decryptedData = undefined

            this.id             = message_data.id;            
            this.fromIdentity   = cmIdentityFactory.create(message_data.fromIdentity);
            this.created        = message_data.created;
            this.text           = message_data.body;
            this.fileIds        = message_data.fileIds;

            this.encryptedData = message_data.body;   
        }

        this.init(data);
    };

    return Message;
}
'use strict';

function cmMessageModel (cmConversationsAdapter, cmCrypt, cmIdentityFactory, cmUserModel){
    var Message = function(data){
        //Attributes:
        var self = this;

        //secret data:
        this.secret =   ['text', 'fileIds'],

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
            angular.extend(self, decrypted_data) // watch out: this only work for simply properties, "from" will break

            return !!decrypted_data
        }

        this.sendTo = function (conversation) {
            return  cmConversationsAdapter.sendMessage(conversation.id, { body: this.encryptedData })
                    .then(function (message_data) {
                        self.init(message_data)
                        conversation.addMessage(self)   //maybe replace self with new cmMessageModel(message_data) for more metadata
                                                        //cant use cmMassageFactory here, because cmMessageFactory dependes on cmMessageModel

                    })
        }

        this.isOwn = function(){
            return (cmUserModel.data.id == this.from.id)
        }

        this.init = function (message_data) {
            this.secret.decryptedData = undefined;


            if(message_data.dummy && message_data.dummy !== false){
                this.from = cmIdentityFactory.createDummy();

            } else {
                this.id         = message_data.id;
                this.from       = (!message_data.fromIdentity) ? cmUserModel.data.identity : cmIdentityFactory.create(message_data.fromIdentity);
                this.created    = message_data.created;
                this.text       = message_data.body;
                this.fileIds    = message_data.fileIds;

                this.encryptedData = message_data.body;
            }
        }

        this.init(data);
    };

    return Message;
}
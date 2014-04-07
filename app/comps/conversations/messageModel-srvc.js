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
            angular.extend(self, decrypted_data) // watch out: this only work for simple properties, "from" will break

            return !!decrypted_data
        }

        /**
         * add to local conversation object
         * @param conversation
         * @returns {cmMessageModel.Message}
         */
        this.addTo = function(conversation){
            conversation.addMessage(self);

            return this;
        }

        /**
         * send message to backend object
         * @param conversation
         * @returns {*|Promise|!Promise.<RESULT>}
         */
        this.sendTo = function (conversationId) {
            return  cmConversationsAdapter.sendMessage(conversationId, { body: this.encryptedData })
                    .then(function (message_data) {
                        self.init(message_data)
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
                this.text       = this.text || message_data.body;
                this.fileIds    = message_data.fileIds;

                this.encryptedData = message_data.body;
            }

            this.decrypt('');
        }

        this.init(data);
    };

    return Message;
}
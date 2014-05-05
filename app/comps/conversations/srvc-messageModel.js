'use strict';

angular.module('cmConversations').factory('cmMessageModel',[
    'cmConversationsAdapter',
    'cmCrypt',
    'cmIdentityFactory',
    'cmUserModel',
    function (cmConversationsAdapter, cmCrypt, cmIdentityFactory, cmUserModel){

        var Message = function(data){
            //Attributes:
            var self = this;


            //secret data:
//            this.secret = ['text', 'fileIds'];
            this.secret = ['text'];

            //public data
            this.public = ['files'];

            //files
            this.files = [];


            //sets which data should not be encrypted
            this.setPublicData = function(data){
                //data may be a string or an array
                data = typeof data == 'string' ? [data] : data


                //set keys for all data to secret:
                var all_the_data =  this.secret.concat(this.public)
                                    .filter(function(elem, pos, arr) {
                                        return arr.indexOf(elem) == pos;
                                    })

                this.secret = all_the_data
                this.public = []

                //set keys for selected data to public
                data.forEach(function(key){
                    var secret_pos = self.secret.indexOf(key)
                    if( secret_pos != -1) self.secret.splice(secret_pos, 1)

                    self.public.push(key)
                })

                return this
            }

            this.setText = function(text){
                this.text = text
                return this
            }

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
                angular.extend(self, decrypted_data) // watch out: this only works for simple properties, "from" will break

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
             * add Assets to Message
             * @param array
             */
            this.addAssets = function(array){
                if(typeof array !== 'undefined'){
                    angular.forEeach(array, function(asset){
                        self.files.push(asset.id);
                    });

                }

                return this;
            }

            /**
             * send message to backend object
             * @param conversation
             * @returns {*|Promise|!Promise.<RESULT>}
             */
            this.sendTo = function (conversationId) {
                var public_data = {}    

                this.public.forEach(function(key){
                    if(self[key]) public_data[key] = self[key]
                })


                this.publicData = public_data

                return  cmConversationsAdapter.sendMessage(conversationId, {
                            encrypted:  this.encryptedData,
                            plain:      this.publicData
                        })
                        .then(function (message_data) {
                            self.init(message_data)
                        })
            }

            this.isOwn = function(){
                return (!this.from || cmUserModel.data.id == this.from.id)
            }

            this.init = function (message_data) {
                if(!message_data) return this

                this.secretData = undefined;
                this.publicData = undefined;

                if(message_data.dummy && message_data.dummy !== false){
                    this.from = cmIdentityFactory.createDummy();

                } else {
                    this.id         = message_data.id;
                    this.from       = (!message_data.fromIdentity) ? cmUserModel.data.identity : cmIdentityFactory.create(message_data.fromIdentity);
                    this.created    = message_data.created;

                    this.plainData      = message_data.plain 
                    this.encryptedData  = message_data.encrypted
                }

                for(var key in this.plainData){
                    self[key] = self[key] || message_data.plain[key] 
                }

            }

            this.init(data);
        };

        return Message;
    }
]);
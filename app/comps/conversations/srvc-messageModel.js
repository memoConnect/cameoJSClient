'use strict';

angular.module('cmConversations').factory('cmMessageModel',[
    'cmConversationsAdapter',
    'cmCrypt',
    'cmIdentityFactory',
    'cmFileFactory',
    'cmUserModel',
    'cmObject',
    'cmLogger',
    '$rootScope',
    function (cmConversationsAdapter, cmCrypt, cmIdentityFactory, cmFileFactory, cmUserModel, cmObject, cmLogger, $rootScope){

        var Message = function(data){
            // attributes
            var self = this;

            cmObject.addEventHandlingTo(this);

            // secret data
            this.secret = ['text','fileIds'];

            // public data
            this.public = [];

            // files
            this.files = [];
            this.fileIds = [];

            $rootScope.$on('logout', function(){
                self.files = [];
                self.fileIds = [];
            });

            // sets which data should not be encrypted
            this.setPublicData = function(data){
                // data may be a string or an array
                data = typeof data == 'string' ? [data] : data;

                // set keys for all data to secret:
                var all_the_data = this.secret
                                    .concat(this.public)
                                    .filter(function(elem, pos, arr) {
                                        return arr.indexOf(elem) == pos;
                                    });

                this.secret = all_the_data;
                this.public = [];

                // set keys for selected data to public
                data.forEach(function(key){
                    var secret_pos = self.secret.indexOf(key);
                    if( secret_pos != -1) self.secret.splice(secret_pos, 1);

                    self.public.push(key);
                });

                return this;
            };

            this.setText = function(text){
                this.text = text;
                return this;
            };

            this.encrypt = function (passphrase) {
                // merge secret_data into json string:
                var secret_data = {};

                this.secret.forEach(function(key){
                    if(self[key]) secret_data[key] = self[key]
                });

                var secret_JSON = JSON.stringify(secret_data);

                this.encryptedData = cmCrypt.encryptWithShortKey(passphrase, secret_JSON);
                //@ TODO!!!!

                return this;
            };

            this.decrypt = function (passphrase) {
                var decrypted_data = JSON.parse(cmCrypt.decrypt(passphrase, this.encryptedData));

                // expose data on message Object
                angular.extend(self, decrypted_data);
                // watch out: this only works for simple properties, "from" will break

                this.initFiles();

                if(!!decrypted_data){
                    this.trigger('decrypt:success');
                }

                return !!decrypted_data
            };

            /**
             * add to local conversation object
             * @param conversation
             * @returns {cmMessageModel.Message}
             */
            this.addTo = function(conversation){
                conversation.addMessage(self);

                return this;
            };

            /**
             * add cmFile Object to Message Object
             * checks if cmFile Object still added or not
             * @param file
             * @private
             */
            this._addFile = function(file){
                var i = 0,
                    check = false;

                /**
                 * Array of cmFiles Objects
                 */
                if(this.files.length == 0){
                    this.files.push(file);
                } else {

                    while(i < this.files.length){
                        if(this.files[i].id == file.id){
                            check = true;
                            break;
                        }
                        i++;
                    }

                    if(check !== true){
                        this.files.push(file);
                    }
                }

                /**
                 * Array of cmFiles Objects
                 */
                if(this.fileIds.length == 0){
                    this.fileIds.push(file.id);
                } else {
                    if(this.fileIds.indexOf(file.id) == -1){
                        this.fileIds.push(file.id);
                    }
                }

                return this;
            };

            /**
             * add cmFiles to Message Wrapper Function for Arrays
             * @param array of cmFileObjects
             * @returns {cmMessageModel.Message}
             */
            this.addFiles = function(array){
                if(typeof array !== 'undefined' && array.length > 0){
                    angular.forEach(array, function(file){
                        self._addFile(file);
                    });
                }

                return this;
            };

            /**
             * send message to backend object
             * @param conversation
             * @returns {*|Promise|!Promise.<RESULT>}
             */
            this.sendTo = function (conversationId){
                var public_data = {};

                this.public.forEach(function(key){
                    if(self[key])
                        public_data[key] = self[key]
                });

                this.publicData = public_data;

                return cmConversationsAdapter.sendMessage(conversationId, {
                    encrypted: this.encryptedData,
                    plain: this.publicData
                })
                .then(function (message_data) {
                    self.init(message_data);
                    self.trigger('message:send');
                });
            };

            this.isOwn = function(){
                return (!this.from || cmUserModel.data.id == this.from.id);
            };

            /**
             * Handle Upload from new Files
             * @returns {cmMessageModel.Message}
             */
            this.uploadFiles = function(){
                if(this.files.length > 0){
                    angular.forEach(this.files, function(file){
                        file.uploadChunks();
                    });
                }

                return this;
            };

            /**
             * initialize Files from Message Data (fileIds)
             * @returns {Message}
             */
            this.initFiles = function(){
                if(this.fileIds.length > 0){
                    angular.forEach(this.fileIds, function(id){
                        self._addFile(cmFileFactory.create(id));
                    });
                    this.trigger('init:files');
                }

                return this;
            };

            this.decryptFiles = function(passphrase){
//                cmLogger.debug('cmMessageModel:decryptFiles');
                angular.forEach(this.files, function(file){
                    file
                        .setPassphrase(passphrase)
                        .downloadStart();
                });

                return this;
            };

            /**
             * Initialize Message Object
             * @param message_data
             * @returns {Message}
             */
            this.init = function (message_data) {
                if(!message_data) return this;

                this.secretData = undefined;
                this.publicData = undefined;

                if(message_data.dummy && message_data.dummy !== false){
                    this.from = cmIdentityFactory.createDummy();
                } else {
                    this.id         = message_data.id;
                    this.from       = (!message_data.fromIdentity) ? cmUserModel.data.identity : cmIdentityFactory.create(message_data.fromIdentity);
                    this.created    = message_data.created;

                    this.plainData      = message_data.plain;
                    this.encryptedData  = message_data.encrypted;
                }
                // compare plain to this
                for(var key in this.plainData){
                    this[key] = message_data.plain[key] || this[key];
                }

                this.initFiles();
            };

            this.init(data);

            /**
             * Event Handling
             */
            this.on('message:send', function(){
                self.uploadFiles();
            });
        };

        return Message;
    }
]);
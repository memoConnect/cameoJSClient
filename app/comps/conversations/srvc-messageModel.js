'use strict';

angular.module('cmConversations').factory('cmMessageModel',[
    'cmConversationsAdapter',
    'cmCrypt',
    'cmIdentityFactory',
    'cmFileFactory',
    'cmUserModel',
    'cmObject',
    'cmStateManagement',
    'cmUtil',
    'cmLogger',
    '$rootScope',
    function (cmConversationsAdapter, cmCrypt, cmIdentityFactory, cmFileFactory, cmUserModel, cmObject, cmStateManagement, cmUtil, cmLogger, $rootScope){

        /**
         * @constructor
         * @description
         * Represents a Message.
         * Events
         *  - init:finished
         *  - update:finished
         *  - load:failed
         * Stats
         *  - new
         *  - loading
         *  - decrypted
         *
         *
         * @param {Object} [data] - The conversation data as received from the backend.
         */
        function Message(data){
            // attributes
            var self = this,
                conversation = undefined;

            cmObject.addEventHandlingTo(this);

            this.id = undefined;
            this.created = undefined;
            this.from = undefined;

            // secret data
            this.secret = ['text','fileIds'];

            // public data
            this.public = [];

            // files
            this.files = [];
            this.fileIds = [];

            this.state = new cmStateManagement(['new','decrypted','loading']);

            /**
             * Initialize Message Object
             * @param message_data
             * @returns {Message}
             */
            function init(data){
                if(typeof data == 'object' && ('conversation' in data)){
                    conversation = data.conversation;

                    if(cmUtil.objLen(data) > 1){
                        self.importData(data);
                    } else {
                        self.state.set('new');
                    }
                } else {
                    // fail ??
                    self.state.set('new');
                }
            }

            /**
             * @name importData
             * @description import data
             */
            this.importData = function(data){
                this.id         = data.id || this.id;

                this.from       = data.fromIdentity ? cmIdentityFactory.create(data.fromIdentity) : cmUserModel.data.identity;
                this.created    = data.created || this.created;

                this.plainData  = data.plain || this.plainData;

                // compare plain to this
                for(var key in this.plainData){
                    this[key] = this.plainData[key] || this[key];
                }

                this.text       = data.text || this.text;
                this.fileIds    = data.fileIds || this.fileIds;

                this.encryptedData  = data.encrypted || this.encryptedData;

                this.initFiles();

                this.trigger('update:finished');

                this.state.unset('new');

                return this;
            };

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

            this.isEncrypted = function(){
                if(!this.state.is('new')) {
                    return (this.encryptedData != false)
                }
            };

            this.encrypt = function (passphrase) {
                // merge secret_data into json string:
                var secret_data = {};

                this.secret.forEach(function(key){
                    if(self[key]) secret_data[key] = self[key]
                });

                var secret_JSON = JSON.stringify(secret_data);

                //this.encryptedData = cmCrypt.base64Encode(cmCrypt.encryptWithShortKey(passphrase, secret_JSON));
                if(conversation.getPassphrase() !== null)
                    this.encryptedData = cmCrypt.encrypt(conversation.getPassphrase(), secret_JSON);
                //@ TODO!!!!

                return this;
            };

            this.decrypt = function () {
                if(this.state.is('decrypted') !== true){
                    /**
                     * @deprecated
                     * Workaround for old Messages in dev and stage
                     */
                    if(typeof this.encryptedData == 'string' && this.encryptedData != '' && this.encryptedData.charAt(0) != '{'){
                        this.encryptedData = cmCrypt.base64Decode(this.encryptedData);
                    }

                    var decrypted_data = JSON.parse(cmCrypt.decrypt(conversation.getPassphrase(),this.encryptedData));

                    this.importData(decrypted_data);

                    if(!!decrypted_data){
                        this.state.set('decrypted');
                        this.trigger('decrypt:success');
                    }

                    return !!decrypted_data
                }

                return true;
            };

            /**
             * send message to backend object
             * @param conversation
             * @returns {*|Promise|!Promise.<RESULT>}
             */
            this.save = function (){
                var public_data = {};

                this.public.forEach(function(key){
                    if(self[key])
                        public_data[key] = self[key]
                });

                this.publicData = public_data;

                return cmConversationsAdapter.sendMessage(conversation.id, {
                    encrypted: this.encryptedData,
                    plain: this.publicData
                })
                    .then(function (message_data) {
                        self.importData(message_data);
                        self.trigger('message:saved');
                    });
            };

            this.isOwn = function(){
                return (!this.from || cmUserModel.data.id == this.from.id);
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
             * @todo  file factory?
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
                angular.forEach(this.files, function(file){
                    if(file.state == 'exists') {
                        file
                            .setPassphrase(passphrase)
                            .downloadStart();
                    }
                });

                return this;
            };

            /**
             * Event Handling
             */
            $rootScope.$on('logout', function(){
                self.files = [];
                self.fileIds = [];
            });

            this.on('message:saved', function(){
                self.uploadFiles();
            });

            init(data);
        }

        return Message;
    }
]);
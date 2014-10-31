'use strict';

angular.module('cmConversations')
    .factory('cmMessageModel',[
    'cmConversationsAdapter',
    'cmCrypt',
    'cmIdentityFactory',
    'cmFileFactory',
    'cmFilesAdapter',
    'cmUserModel',
    'cmObject',
    'cmStateManagement',
    'cmUtil',
    'cmLogger',
    '$rootScope',
    '$q',
    function (cmConversationsAdapter, cmCrypt, cmIdentityFactory, cmFileFactory,
              cmFilesAdapter, cmUserModel, cmObject, cmStateManagement, cmUtil, cmLogger,
              $rootScope, $q){

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

            this.state = new cmStateManagement(['new','decrypted','loading', 'incomplete', 'sending', 'waitForFiles']);

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
                        self.from = cmUserModel.data.identity;
                        self.state.set('new');
                    }
                } else {
                    // fail ??
                    self.state.set('new');
                    self.from = cmUserModel.data.identity;
                }                
            }

            /**
             * reset object
             */
            function reset(){
                //cmLogger.debug('cmMessageModel.reset');
                self.files = [];
                self.fileIds = [];
            }

            /**
             * @name importData
             * @description import data
             */
            this.importData = function(data){
                //cmLogger.debug('cmMessageModel.importData');
                this.id         = data.id || this.id;

                if('fromIdentity' in data){
                    this.from       = cmIdentityFactory.create(data.fromIdentity);
                }

                this.created    = data.created || this.created;

                this.plainData  = data.plain || this.plainData;

                // compare plain to this
                for(var key in this.plainData){
                    this[key] = this.plainData[key] || this[key];
                }

                this.text       = data.text || this.text;
                this.fileIds    = data.fileIds || this.fileIds;

                this.encryptedData  = data.encrypted || this.encryptedData;

                this.state.set('incomplete')
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
                    return (this.encryptedData == undefined) ? false : (this.encryptedData != false)
                }
            };

            this.encrypt = function (passphrase) {
                // merge secret_data into json string:
                var secret_data = {};

                this.secret.forEach(function(key){
                    if(self[key]) secret_data[key] = self[key]
                });

                var secret_JSON = JSON.stringify(secret_data);

                this.encryptedData = cmCrypt.encrypt(passphrase, secret_JSON);

                return this;
            };

            this.decrypt = function (passphrase) {
                //cmLogger.debug('cmMessageModel.decrypt');

                if(this.state.is('decrypted') !== true){

                    if(typeof this.encryptedData == 'string' && this.encryptedData.length > 0){
                        /**
                         * @deprecated
                         * Workaround for old Messages in dev and stage
                         */
                        if(this.encryptedData.charAt(0) != '{'){
                            this.encryptedData = cmCrypt.base64Decode(this.encryptedData);
                        }

                        var decrypted_data = JSON.parse(cmCrypt.decrypt(passphrase,this.encryptedData));

                        if(decrypted_data){
                            this.importData(decrypted_data);
                            this.state.set('decrypted');
                            this.trigger('decrypt:success');
                        }

                        return !!decrypted_data
                    }
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

                // Check if the message is alright to be send to the backend:
                var proper_public_data      =       (typeof this.publicData == 'object')
                                                &&  Object.keys(this.publicData).length > 0,
                    proper_encrypted_data   =       (typeof this.encryptedData == 'string')
                                                &&  this.encryptedData.length > 0

                if(!proper_public_data && !proper_encrypted_data) {
                    var defer = $q.defer();
                    cmLogger.error('cmMessageModel: Message improper; saving aborted.');
                    defer.reject();
                    return defer.promise;
                }

                // If we got this far evrything seems alright; send the message to the backend:
                return cmConversationsAdapter.sendMessage(conversation.id, {
                    encrypted: this.encryptedData,
                    plain: this.publicData
                })
                .then(function (message_data) {
                    //Since this message is our own message,
                    //we already know the original data, thus it actually is decrypted and wont need further decryption.
                    self.state.set('decrypted') 
                    self.importData(message_data);
                    self.trigger('message:saved');
                });
            };

            this.isOwn = function(){
//                return (!this.from || cmUserModel.data.id == this.from.id);
                return (cmUserModel.data.id == this.from.id);
            };

            /**
             * Handle Upload from new Files
             * @returns {cmMessageModel.Message}
             */
            this.uploadFiles = function(){
                if(this.files.length > 0){
                    self.state.unset('incomplete');
                    self.state.set('uploading');
                    angular.forEach(this.files, function(file){
                        file
                            .setOnCompleteId(self.id)
                            .uploadChunks();
                    });
                }

                return this;
            };

            /**
             * initialize Files from Message Data (fileIds)
             * @returns {Message}
             */
            this.initFiles = function(){
                if(self.state.is('uploading')){
                    this.state.unset('incomplete');
                    return this;
                }

                if(this.fileIds.length > 0){
                    angular.forEach(this.fileIds, function(id){
                        self._addFile(cmFileFactory.create(id));
                    });
                    this.trigger('init:files');
                } else {
                    console.log('buh');
                    this.state.unset('incomplete')
                }

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

            this.decryptFiles = function(passphrase){
                angular.forEach(this.files, function(file){
                    if(file.state.is('onlyFileId')) {
                        file
                            .setPassphrase(passphrase)
                            .downloadStart();

                        file.on('importFile:incomplete',function(event, file){
                            self.state.set('incomplete');
                            // add to queue
                            self.incompleteFiles.push(file);
                        });

                        file.on('importFile:finish', function(event, file){
                            self.state.unset('incomplete');
                            // clear from queue
                            var index = self.incompleteFiles.indexOf(file);
                            self.incompleteFiles.splice(index,1);
                        });
                    }
                });

                return this;
            };

            /**
             * Event Handling
             */
            $rootScope.$on('logout', function(){ reset(); });
            $rootScope.$on('identity:switched', function(){ reset(); });

            this.on('message:saved', function(){
                self.uploadFiles();
            });

            init(data);

            // if files are incomplete wait for message:new backend event to reinit
            this.incompleteFiles = [];
            if(conversation != undefined && ('on' in conversation)) {
                conversation.on('message:reInitFiles', function () {
                    console.log('self.state.is(incomplete)', self.state.is('incomplete'))
                    if (self.state.is('incomplete')) {
                        console.log('moep2')
                        self.incompleteFiles.forEach(function (file) {
                            file.importFile();
                        });
                    }
                });
            }
        }

        return Message;
    }
]);
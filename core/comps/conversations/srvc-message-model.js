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
            this.reveal_signatures = false // encrypt signatures

            // public data
            this.public = [];

            // files
            this.files = [];
            this.fileIds = [];

            this.state = new cmStateManagement(['new','decrypted','loading', 'incomplete', 'sending', 'waitForFiles', 'authentic', 'bogus', 'signed']);

            this.authenticity = {
                                    publicData : null,
                                    secretData : null,
                                    signatures : null,

                                    setPublicData : function(data){
                                        this.publicData = data
                                        return this
                                    },

                                    setSecretData : function(data){
                                        this.secretData = data
                                        return this
                                    },
                                    setSignatures : function(signatures){
                                        this.signatures = signatures
                                        return this
                                    },
                                    getToken : function(){

                                        if(this.publicData == null)
                                            return $q.reject('plain data missing.')

                                        if(typeof this.secretData == null)
                                            return $q.reject('secret data missing.')

                                        var self =  this,
                                            data =  {
                                                        'public': self.publicData || {},
                                                        'secret': self.secretData || {}
                                                    }

                                        return  $q.when(cmCrypt.hashObject(data))
                                    },

                                    newSignatures : function(){
                                        var self = this

                                        return  $q.when()
                                                .then(function(){
                                                    return self.getToken()
                                                })
                                                .then(function(token){
                                                    return cmUserModel.signData(token)
                                                })
                                                .then(function(signatures){
                                                    self.signatures = signatures
                                                    return $q.when(signatures)
                                                })
                                    },

                                    verify : function(identity){
                                        var self = this

                                        if(this.signatures == null)
                                            return $q.reject('signatures missing.')
                                        
                                        return  this.getToken()
                                                .then(function(token){
                                                    return  identity.keys.reduce(function(last_try_key, key){
                                                                return last_try_key.catch(function(reason){
                                                                    return self.signatures.reduce(function(last_try_signature, signature){
                                                                        return  signature.keyId == key.id
                                                                                ?   key.verify(token, signature.content, true)
                                                                                :   $q.reject('keys dont match.')
                                                                    }, $q.reject('missing signatures.'))
                                                                })
                                                            }, $q.reject('missing keys.'))
                                                })
                                    }
                                }


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

                if('signatures' in data){

                    this.state.set('signed')

                    if('plain' in data.signatures)
                        this.authenticity.setSignatures(data.signatures.plain)
                }

                this.created    = data.created || this.created;

                this.plainData      = data.plain        || this.plainData       || {}
                this.encryptedData  = data.encrypted    || this.encryptedData

                // compare plain to this
                for(var key in this.plainData){
                    this[key] = this.plainData[key] || this[key];
                }

                this.authenticity.setPublicData(this.plainData)

                this.text       = data.text     || this.text;
                this.fileIds    = data.fileIds  || this.fileIds;

                this.signatures = data.signatures || this.signatures


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
                var all_the_data =  this.secret
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

            this.revealSignatures = function(){
                this.reveal_signatures = true
                return this
            }

            this.setText = function(text){
                this.text = text;
                return this;
            };

            this.isEncrypted = function(){
                if(!this.state.is('new')) {
                    return (this.encryptedData == undefined) ? false : (this.encryptedData != false)
                }
            }

            this.getPublicData = function(){
                var public_data = {};

                this.public.forEach(function(key){
                    if(self[key]) public_data[key] = self[key]
                });

                return public_data
            }

            this.getSecretData = function(){
                var secret_data = {};

                this.secret.forEach(function(key){
                    if(self[key]) secret_data[key] = self[key]
                });

                return secret_data

            }

            this.getSignatures = function(){
                return  this.authenticity
                        .setPublicData(self.getPublicData())
                        .setSecretData(self.getSecretData())
                        .newSignatures()
                        .then(function(signatures){
                            self.signatures = self.signatures || {}
                            self.signatures.plain = signatures
                            return $q.when(self.signatures.plain)
                        })
            }

            this.verifySignatures = function(){
                return this.authenticity.verify(this.from)
            }


            this.encrypt = function (passphrase) {
                return  $q.when()
                        .then(function(){
                            
                            if(self.signatures && self.signatures.plain)
                                self.signatures.encrypted = cmCrypt.encrypt(passphrase, JSON.stringify(self.signatures.plain))

                            return  $q.when(self.signatures.encrypted)
                        })
                        .then(function(){                            
                            var secret_data     = self.getSecretData()
                            self.encryptedData  = cmCrypt.encrypt(passphrase, JSON.stringify(secret_data))

                            return  $q.when(self.encryptedData)
                        })
            }

            this.decrypt = function (passphrase) {
                //cmLogger.debug('cmMessageModel.decrypt');
                if(this.state.is('decrypted') !== true || this.state.is('incomplete')){

                    if(typeof this.encryptedData == 'string' && this.encryptedData.length > 0){
                        /**
                         * @deprecated
                         * Workaround for old Messages in dev and stage
                         */
                        if(this.encryptedData.charAt(0) != '{'){
                            this.encryptedData = cmCrypt.base64Decode(this.encryptedData);
                        }

                        if(this.signatures && this.signatures.encrypted){
                            var signatures = JSON.parse(cmCrypt.decrypt(passphrase,this.signatures.encrypted))
                            this.authenticity.setSignatures(signatures) 
                        }

                        var decrypted_data = JSON.parse(cmCrypt.decrypt(passphrase,this.encryptedData))


                        if(decrypted_data){
                            this.authenticity.setSecretData(decrypted_data)

                            this.verifySignatures()
                            .then(
                                function(){
                                    self.state.set('authentic')
                                },
                                function(reason){
                                    self.state.set('bogus')
                                }
                            )

                            this.importData(decrypted_data);


                            if(!this.hasFiles()){
                                self.state.set('decrypted');
                                self.trigger('decrypt:success');
                            } else {
                                this.allFilesReady().then(function(){
                                    self.state.set('decrypted');
                                    self.trigger('decrypt:success');
                                });
                            }
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
                $q.when()
                .then(function(){
                    var publicData      = self.getPublicData(),
                        encryptedData   = self.encryptedData



                    // Check if the message is alright to be send to the backend:
                    var proper_public_data      =       (typeof publicData == 'object')
                                                    &&  Object.keys(publicData).length > 0,
                        proper_encrypted_data   =       (typeof encryptedData == 'string')
                                                    &&  encryptedData.length > 0

                    if(proper_public_data == false && proper_encrypted_data == false )
                        return $q.reject('Message improper.')
                    
                    //everything is alright:

                    return  self.reveal_signatures !== true
                            ?   $q.when({
                                    plain:      publicData,
                                    encrypted:  encryptedData,
                                    signatures: {
                                                    encrypted:  self.signatures.encrypted
                                                }
                                })
                            :   $q.when({
                                    plain:      publicData,
                                    encrypted:  encryptedData,
                                    signatures: {
                                                    plain:      self.signatures.plain
                                                }
                                })
                })
                .then(function(data){
                    return  cmConversationsAdapter.sendMessage(conversation.id, data)
                })
                // If we got this far everything seems alright; send the message to the backend:
                .then(function(message_data) {
                    //Since this message is our own message,
                    //we already know the original data, thus it actually is decrypted and wont need further decryption.
                    self.state.set('decrypted');
                    self.importData(message_data);
                    self.trigger('message:saved');

                    return $q.when(message_data)
                })
                .catch(function(reason){
                    cmLogger('cmMessage: saving failed:' + reason)
                })
            };

            this.isOwn = function(){
//                return (!this.from || cmUserModel.data.id == this.from.id);
                return (cmUserModel.data.id == this.from.id);
            };

            this.hasFiles = function(){
                return this.files.length > 0;
            };

            this.allFilesReady = function(){
                var defered = $q.defer(),
                    filesReady = [];

                angular.forEach(this.files, function(file){
                    var filePromise = $q.defer();
                    if(file.state.is('onlyFileId')) {
                        filesReady.push(filePromise.promise);
                        file.one('importFile:finish', function(event, file){
                            filePromise.resolve();
                        });
                    }
                });

                $q.all(filesReady)
                .then(function(){
                    defered.resolve();
                });

                return defered.promise;
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
                    this.state.unset('incomplete');
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

                angular.forEach(this.files, function(file, index){
                    if(file.state.is('onlyFileId')) {
                        file
                            .setPassphrase(passphrase)
                            .downloadStart();

                        file.one('importFile:incomplete',function(event, file){
                            self.state.set('incomplete');
                            // add to queue
                            self.incompleteFiles.push(file);
                        });

                        file.one('importFile:finish', function(event, file){
                            // clear from queue
                            var index = self.incompleteFiles.indexOf(file);
                            self.incompleteFiles.splice(index,1);
                        });
                    }
                });

                this.allFilesReady().then(function(){
                    self.state.unset('incomplete');
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
                    if (self.state.is('incomplete')) {
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
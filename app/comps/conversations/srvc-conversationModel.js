'use strict';

/**
 * @ngdoc object
 * @name cmConversationModel
 * @constructor
 * @description
 * Represents a Conversation.
 * # Events
 *  - init:finished
 *  - update:finished
 *  - load:failed
 *  - message:new
 *  - message:added
 *  - save:failed
 *  - save:finished
 * # States
 *  - new
 *  - loading
 *
 * @param {Object} [data] The conversation data as received from the backend.
 */

angular.module('cmConversations').factory('cmConversationModel',[
    'cmConversationsAdapter',
    'cmMessageModel',
    'cmIdentityFactory',
    'cmIdentityModel',
    'cmFileFactory',
    'cmCrypt',
    'cmUserModel',
    'cmFactory',
    'cmStateManagement',
    'cmNotify',
    'cmObject',
    'cmLogger',
    'cmPassphrase',
    'cmSecurityAspectsConversation',
    'cmUtil',
    '$q',
    '$rootScope',
    function (cmConversationsAdapter, cmMessageModel, cmIdentityFactory, cmIdentityModel, cmFileFactory, cmCrypt, cmUserModel, cmFactory, cmStateManagement, cmNotify, cmObject, cmLogger, cmPassphrase, cmSecurityAspectsConversation, cmUtil, $q, $rootScope){

        function ConversationModel(data){
            var self        = this,
                passphrase  = new cmPassphrase();

            this.id                 = undefined;
            
            this.recipients         = new cmFactory(cmIdentityModel);      //list of cmIdentityModel objects
            this.messages           = new cmFactory(cmMessageModel);        //list of MessageModel objects
            //--> meta

            this.timeOfCreation     = 0;          //timestamp of the conversation's creation
            //--> meta
            this.timeOfLastUpdate   = 0;          //timestamp of the conversations's last Update
            this.subject            = '';         //subject
            this.securityAspects    = cmSecurityAspectsConversation.setTarget(this);
            this.meta               = {};         //stores meta data, not yet implemented, TODO
            this.password           = undefined;
            this.state              = new cmStateManagement(['new','loading']);

            //rethink, mabye backend should deliver array of message ids
            this.numberOfMessages   = 0

            /*maybe REFACTOR TODO*/
            this.passCaptcha = undefined;
            this.tmpPassCaptcha = '';

            cmObject.addEventHandlingTo(this);

            this.localPWHandler = {
                localKey: 'pw',
                set: function(id_conversation, password){
                    var pw_list = this.getAll();

                    pw_list[id_conversation] = password;

                    cmUserModel.storageSave(this.localKey, pw_list);
                },
                get: function(id_conversation){
                    var pw_list = this.getAll(),
                        password = undefined;

                    if(typeof pw_list == 'object' && Object.keys(pw_list).indexOf(id_conversation)!= -1){
                        password = pw_list[id_conversation];
                    }

                    return password;
                },
                getAll: function(){
                    return cmUserModel.storageGet(this.localKey) || {};
                }
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name init
             * @description
             * Function to initialize the conversation. Should never be called from the outside.
             *
             * @param {Object} data The conversation data as required by .importData(), see below.
             */
            function init(data){
//                cmLogger.debug('cmConversationModel:init');
                if(typeof data == 'string' && data.length > 0){
                    self.id = data;
                    self.load();
                } else if(typeof data == 'object' && ('id' in data)){
                    self.id = data.id;

                    if(cmUtil.objLen(data) < 2){
                        self.load();
                    } else {
                        self.importData(data);
                    }
                } else {
                    self.state.set('new');
                }

                self.trigger('init:finished');
            }

            /**
             * @todo !!!!
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name checkConsistency
             * @description
             * Checks Conversation Settings and User Opinions
             *
             * @param {Boolean} bool Return true or false
             */
            function checkConsistency(){
                return false;
            }

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name importData
             * @description
             * Function to import data as received from the backend.
             *
             * @param {Object} data The conversation data as recieved from the backend.
             */
            this.importData = function(data){
//                cmLogger.debug('cmConversationModel:importData');
                if(typeof data !== 'object'){
                    cmLogger.debug('cmConversationModel:import:failed - no data!');
                    return this;
                }

                //There is no invalid data, importData looks for everything useable in data; if it finds nothing it wont update anything
                this.id                      = data.id                  || this.id;
                this.timeOfCreation          = data.created             || this.timeOfCreation;
                this.timeOfLastUpdate        = data.lastUpdated         || this.timeOfLastUpdate;
                this.subject                 = data.subject             || this.subject;
                this.numberOfMessages        = data.numberOfMessages    || this.numberOfMessages;
                // getting locally saved pw for conversation
                if(this.password == undefined)
                    this.password = this.localPWHandler.get(this.id);

                if('sePassphrase' in data)
                    passphrase.importSymmetricallyEncryptedPassphrase(data.sePassphrase)

                if('aePassphraseList' in data)
                    passphrase.importSymmetricallyEncryptedPassphrase(data.aePassphraseList)

                this.initPassCaptcha(data);

                var messages = data.messages || [];
                messages.forEach(
                    function(message_data) {
                        message_data.conversation = self;
                        self.messages.create(message_data);
                    }
                );

                var recipients = data.recipients || [];
                recipients.forEach(
                    function(recipient_data){
                        self.addRecipient(cmIdentityFactory.create(recipient_data.identityId));
                    }
                );

                this.state.unset('new');
                this.trigger('update:finished');

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name  disableEncryption
             * @description 
             * Disables the encryption for the conversation. Works only if the conversation is new (state).
             * 
             * @returns {cmConversationModel} this  Returns itself for chaining.
             */
            this.disableEncryption = function(){
                if(this.state.is('new'))
                    passphrase.disable();

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name  EnableEncryption
             * @description 
             * Enables the encryption for the conversation. Works only if the conversation is new (state) and no proper passphrase is set.
             * 
             * @returns {cmConversationModel} this  Returns itself for chaining.
             */
            this.enableEncryption = function(){
                if(this.state.is('new') && !passphrase.get())
                    passphrase.generate();

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name exportData
             * @description
             * Function to export conversation data for api call
             *
             * @param {Object} data Object with conversation data
             */
            this.exportData = function(){
                var data = {};

                if(typeof this.subject == 'string' &&  this.subject != '')
                    data.subject = this.subject;

                var passphrase_data =   passphrase
                                        .setPassword(this.password)
                                        .setIdentities(this.recipients)
                                        .exportData();
                
                data.sePassphrase       =   passphrase_data.sePassphrase
                data.aePassphraseList   =   passphrase_data.aePassphraseList

                data.recipients         =   this.recipients.map(function(recipient){ return recipient.id })

                return data;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name load
             * @description
             * get Conversation Data from API
             *
             * @returns {ConversationModel} this Returns ConversationModel
             */
            this.load = function(){
                if(typeof this.id == 'string'
                    && this.id.length > 0
                    && this.state.is('loading') === false)
                {

                    this.state.set('loading');

                    cmConversationsAdapter.getConversation(this.id).then(
                        function(conversation_data){
                            self.importData(conversation_data);

                            self.state.unset('loading');
                        },
                        function(){
                            self.state.unset('loading');
                            self.trigger('load:failed');
                        }
                    );
                } else {
                    cmLogger.debug('cmConversationModel:load:failed - no Conversation Id');
                    this.trigger('load:failed');
                }

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name save
             * @description
             * send conversation to api
             *
             * @returns {Promise} for async handling
             */
            this.save = function(){
                if(this.state.is('new')){
                    /**
                     * @todo
                     * 02.06.2014 current mock bs
                     */
                    if(checkConsistency()){
                        // do something
                    }

                    cmConversationsAdapter.newConversation( this.exportData() ).then(
                        function (conversation_data) {
                            self
                            .importData(conversation_data)
                            .savePassCaptcha();                          

                            self.state.unset('new');
                            self.trigger('save:finished');
                        },

                        function(){
                            self.trigger('save:failed');
                        }
                    )
                }

                return this;
            };

            this.update = function(conversation_data){
                var offset = 0;
                var clearAllMessages = true;

                if(this.id){
                    if(typeof conversation_data !== 'undefined'){
                        if(this.messages.length < conversation_data.numberOfMessages) {
                            if (this.messages.length > 1) {
                                offset = this.messages.length;
                                clearAllMessages = false;
                            }
                            var limit = conversation_data.numberOfMessages - offset;
                            this._updateConversation(limit, offset, clearAllMessages);
                        }
                    } else {
                        cmConversationsAdapter.getConversationSummary(this.id).then(
                            function(data){
                                if(self.messages.length < data.numberOfMessages){
                                    if(self.messages.length > 1){
                                        offset = self.messages.length;
                                        clearAllMessages = false;
                                    }
                                    var limit = data.numberOfMessages - offset;

                                    self._updateConversation(limit, offset, clearAllMessages);
                                }
                            }
                        )
                    }
                }

                return this;
            };

            /**
             * @param limit
             * @param offset
             * @param clearMessages
             */
            this._updateConversation = function(limit, offset, clearMessages){
                cmConversationsAdapter.getConversation(this.id, limit, offset).then(
                    function(data){

                        /**
                         * Message Handling
                         */
                        if(typeof clearMessages !== 'undefined' && clearMessages !== false){
                            self.messages.reset();
                        }

                        self.importData(data);
                    }
                )
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name decrypt
             * @description
             * starts decrypting oh messages
             *
             * @returns {Boolean} succees Returns Boolean
             */
            this.decrypt = function () {
//                cmLogger.debug('cmConversationModel:decrypt');
                
                var passphrase  =   this.getPassphrase(),
                    success     =   passphrase && this.messages.reduce(function (success, message){
                                        return success && message.decrypt();
                                    }, true);

                if (success) {
                    this.trigger('decrypt:ok');

                    // save password to localstorage
                    if (this.password && passphrase) {
                        this.localPWHandler.set(this.id, this.password);
                    }
                } else {
                    this.trigger('decrypt:fail');
                }

                return success;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name getEncryptionType
             * @description
             * return encryption type from conversation
             *
             * @returns {String} encryptionType look at encryptedPassphraseList
             */
            this.getKeyTransmission = function(){
                return passphrase.getKeyTransmission();
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name getPassphrase
             * @description
             * Function get the passphrase of the conversation, in order to use it for e.g. file encryption before upload.
             *
             * @returns {String} passphrase Returns the passphrase
             */
            this.getPassphrase = function(){
                return  passphrase
                        .setPassword(this.password)
                        .setIdentities(this.recipients)
                        .get();
            }

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name passphraseValid
             * @description
             * #1 true if there is no  message.
             * #2 true if provided passphrase decrypts the first message or that message is not encrypted at all.             
             * #3 false in any other case
             *
             * Passphrase data from the API is irrelevant for this check, because it might be corrupt. Corrupt passphrase data tough must never lead to valid check.
             *
             * @returns {boolean} for the passphrase validation
             */
            this.passphraseValid = function () {                                
                return      passphrase.disabled()
                        ||  this.messages.length == 0
                        ||  this.messages[0].isEncrypted()
                        ||  this.messages[0].decrypt(passphrase.get())

            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name initPassCaptcha
             * @description
             * Initialize PassCaptcha Handling in Conversation
             * creates a cmFile Object
             *
             *
             * @param {Object} conversation_data Data from API Call
             * @returns {ConversationModel} this returns ConversationModel
             */
            this.initPassCaptcha = function(conversation_data){
                if(typeof conversation_data.passCaptcha !== 'undefined' && conversation_data.passCaptcha != '' && this.passCaptcha == undefined){
                    this.passCaptcha = cmFileFactory.create(conversation_data.passCaptcha);
                    this.passCaptcha
//                        .setPassphrase()
                        .downloadStart();
                }

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name savePassCaptcha
             * @description
             *
             * @returns {ConversationModel} this ConversationModel
             */
            this.savePassCaptcha = function(){
                if(this.tmpPassCaptcha != ''){
                    this.passCaptcha = cmFileFactory.create();
                    this.passCaptcha.name = this.passCaptcha.encryptedName = 'captcha';

                    this.passCaptcha
                        .setPassphrase('')
                        .importBase64(this.tmpPassCaptcha)
                        .prepareForUpload().then(
                        function(){
                            self.passCaptcha.uploadChunks();
                        }
                    );

                    this.passCaptcha.on('upload:finish', function(){
                        cmConversationsAdapter.updateCaptcha(self.id, self.passCaptcha.id);
                    });
                }

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name addRecipient
             * @description
             * Function to add a recipient to a conversation. Will not update the backend.
             *
             * @param {Object} identityModel identityModel
             * @returns {cmConversationModel} this cmConversationModel
             */
            this.addRecipient = function(identityModel){
                this.recipients.register(identityModel);

                identityModel.on('update', function(){
                    self.trigger('recipient:update'); //Todo: noch nicht gelöst =/
                });
                this.trigger('recipient-added');

                return this;
            };

            this.hasRecipient = function(identity){
                var check = false;

                this.recipients.forEach(function(recipient){
                    check = check || (identity.id == recipient.id);
                });

                return check;
            };

            this.saveRecipient = function(){
                // @ todo save new recipients to api
            }

            this.removeRecipient = function (identity) {
                this.trigger('before-remove-recipient', identity)

                var i = this.recipients.length;

                while (i) {
                    i--;
                    if (this.recipients[i] == identity){
                        this.recipients.splice(i, 1);
                        //identity.removeFrom ... that's the api call
                    }
                }

                this.trigger('after-remove-recipient', identity)
                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name getSafetyLevel
             * @description
             * return safety level
             *
             * @deprecated
             *
             * @returns {number} level Safety Level
             */
            this.getSafetyLevel = function(){
                var levels =    {
                                'asymmetric'    : 2,
                                'symmetric'     : 1,
                                'mixed'         : 1,
                                'none'          : 0  
                            }

                return levels[passphrase.getKeyTransmission()];
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name getSafetyLevelClass
             * @description
             * returns String
             *
             * @deprecated
             *
             * @param {String} addon String
             * @returns {string} String String
             */
            this.getSafetyLevelClass = function(addon){
                var level = this.getSafetyLevel();
                var className = '';
                switch(level){
                    case 0: className = 'unsafe'; break;
                    case 1: className = 'safe'; break;
                    case 2: className = 'safer'; break;
                }
                return 'safetylevel-'+className+addon;
            };

            this.saveEncryptedPassphraseList = function(){
//                this.encryptedPassphraseList = security.getEncryptedPassphraseList(this.password)
//
//                if(this.encryptedPassphraseList && this.encryptedPassphraseList.length !=0){
//                    return cmConversationsAdapter.updateEncryptedPassphraseList(this.id, this.encryptedPassphraseList)
//                } else {
//                    return $q.when(true)
//                }
            };

            /**
             * Event Handling
             */

            passphrase.on('passphrase:changed', function(){
//                self.decrypt();
            });

            this.on('update:finished', function(){
                self.decrypt();
            });

            this.on('feedback:decrypt:fail', function(){
                cmNotify.warn('CONVERSATION.WARN.PASSWORD_WRONG',{ttl:2000})
            });

            //Todo: fire event on factory and delegate to conversation or something
            this.on('message:new', function(event, message_data){
                message_data.conversation = self //todo
                
                self.messages.create(message_data).decrypt()
            });

            this.recipients.on('register', function(event, recipient){
                // do something, if new recipient is added to conversation
            });

            // after events!!!
            init(data);


            /*** Alt Lasten ***/



            /**
             * @name addMessage
             * @description
             * Function to add a message to a conversation. Will not update the backend.
             *
             * @deprecated
             *
             * @param {MessageModel} message
             * @returns {cmConversationModel} this returns cmConversationModel
             */  
            this.addMessage = function(message){
                cmLogger.warn('cmConversation: .addMessage() is deprecated.')
                if(this.messages.indexOf(message) == -1){
                    this.messages.register( message )
                    this.trigger('update')
                } else {
                    cmLogger.warn('conversationModel: unable to add message; duplicate detected. (id:'+message.id+')')
                }

                return this;
            }


            /* COVERSATION REFACTORING todo:
            //Mock;
    
            this.update = function(){ cmLogger.warn('cmModel: .update() is deprecated.'); return this}
            this.getEncryptionType = function(){return null}






            //Attributes:
            this.passphrase = '',
            this.created = '',
            this.lastUpdated = '',
            this.numberOfMessages = 0,
            this.encryptedPassphraseList = [];
            this.encryptionType = 'none'; // 'none' || 'symmetric' || 'asymmetric'
            this.keyTransmission = 'asymmetric' || 'symmetric';
            this.passCaptcha = undefined;
            this.tmpPassCaptcha = '';
            var self = this;


            $rootScope.$on('logout', function(){
                self.messages = [];
                self.recipients = [];
            });

            /**
             * Conversation Handling
             */

            /**
             * @name init
             * @description
             * initialize ConversationModel
             *
             * @deprecated
             *
             * @param {Object} conversation_data Date from API Call
             * @returns {ConversationModel} this returns cmConversationModel
             */
            /*this.init = function (conversation_data) {

                cmLogger.warn('conversationModel: .init() is deprecated, please use .importData().')

                this.importData(conversation_data)
                return this;


                if(typeof conversation_data !== 'undefined'){
                    this.id                 = conversation_data.id;
                    this.subject            = conversation_data.subject;
                    this.numberOfMessages   = conversation_data.numberOfMessages;
                    this.lastUpdated        = conversation_data.lastUpdated;

                    this.encryptedPassphraseList = this.encryptedPassphraseList.concat(conversation_data.encryptedPassphraseList || []);
                    this.setEncryptionType();

                    // register all recipients as Recipient objects
                    if (conversation_data.recipients) {
                        conversation_data.recipients.forEach(function (item) {
    //                        new cmRecipientModel(cmIdentityFactory.create(item.identityId)).addTo(self);
                            self.addRecipient(new cmRecipientModel(cmIdentityFactory.create(item.identity)));
                        })
                    }

                    // register all messages as Message objects
                    if (conversation_data.messages) {
                        conversation_data.messages.forEach(function (message_data) {
                            self.addMessage(cmMessageFactory.create(message_data));
                        })
                    }

                    this.decrypt(); //Todo: maybe this is too much

                    this.initPassCaptcha(conversation_data);

                    this.on('after-add-recipient', function(){
                        //@ TODO: solve rekeying another way:
                        this.$chain()
                        .encryptPassphrase()
                        .saveEncryptedPassphraseList()

                    })
                }

            }*/

            /*
            this.setEncryptionType = function(){
                var check = false;
                if(this.encryptedPassphraseList.length == 0){
                    this.encryptionType = 'none';
                } else if(this.encryptedPassphraseList.length > 0) {
                    if(this.encryptedPassphraseList[0].keyId == '_passwd'){
                        check = true;
                    }

                    if(check !== false){
                        this.encryptionType = 'symmetric';
                    } else {
                        this.encryptionType = 'asymmetric';
                    }
                }
            };

            this.getEncryptionType = function(){
                return this.encryptionType;
            };

            */
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
            
            this.getLastMessage = function(){
//                cmLogger.debug('cmConversationModel: getLastMessage is deprecated.')
                if(this.messages.length > 0){
                    return this.messages[(this.messages.length - 1)];
                }
                return null
            };

            /**
             * Recipient Handling
             */
            this.getRecipientList = function(){
                cmLogger.debug('cmConversationModel: .getRecipientList() is deprecated.')
                return this.recipients.map(function(recipient){
                    return recipient.displayName || 'CONTACT.ERROR.MISSING_DISPLAYNAME'
                }).join(', ');
            };

            /**
             * Subject Handling
             */

            this.updateSubject = function (subject) {
                if(this.id != ''){
                    cmConversationsAdapter.updateSubject(this.id, subject)
                        .then(function(){
                            self.subject = subject
                        })
                } else {
                    this.subject = subject;
                }
            };
        }

        return ConversationModel;
    }
]);
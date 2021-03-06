'use strict';

/**
 * @ngdoc object
 * @name cmConversationModel
 *
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
 *  - decrypted
 */

angular.module('cmConversations')
.factory('cmConversationModel',[

    'cmBoot',
    'cmConversationsAdapter',
    'cmMessageModel',
    'cmIdentityFactory',
    'cmIdentityModel',
    'cmFileFactory',
    'cmCrypt',
    'cmUserModel',
    'cmFactory',
    'cmStateManagement',
    'cmBrowserNotifications',
    'cmNotify',
    'cmObject',
    'cmLogger',
    'cmPassphraseVault',
    'cmSecurityAspectsConversation',
    'cmUtil',
    'cmFilesAdapter',
    'cmSettings',
    'cmKeyStorageService',
    '$q',
    '$rootScope',

    function (cmBoot, cmConversationsAdapter, cmMessageModel, cmIdentityFactory, cmIdentityModel, cmFileFactory,
              cmCrypt, cmUserModel, cmFactory, cmStateManagement, cmBrowserNotifications, cmNotify, cmObject, cmLogger, cmPassphraseVault,
              cmSecurityAspectsConversation, cmUtil, cmFilesAdapter, cmSettings, cmKeyStorageService,
              $q, $rootScope){

        function ConversationModel(data){
            var self                = this,
                passphraseVault     = undefined,
                encryption_disabled = undefined,
                limit               = 10,
                moep                = undefined;


            cmObject.addEventHandlingTo(self);

            this.id                 = undefined;

            this.recipients         = new cmFactory(cmIdentityModel);      //list of cmIdentityModel objects
            this.inactiveRecipients = [];
            this.messages           = new cmFactory(cmMessageModel);       //list of MessageModel objects

            this.timeOfCreation     = 0;          //timestamp of the conversation's creation
            //--> meta
            this.timeOfLastUpdate   = 0;          //timestamp of the conversations's last Update
            this.subject            = '';         //subject
            this.securityAspects    = new cmSecurityAspectsConversation(this);
            this.meta               = {};         //stores meta data, not yet implemented, TODO
            this.password           = undefined;
            this.state              = new cmStateManagement(['new','loading','decrypted','missingTrustedKeysChecked']);
            this.keyTransmission    = '';

            this.lastMessage        = this.messages.new(); //fallback

            this.missingAePassphrases = {};

            //rethink, mabye backend should deliver array of message ids
            this.numberOfMessages   = 0;
            this.unreadMessages     = 0;

            this.options            = {
                'hasCaptcha'    : false,
                'hasPassword'   : false,
                'showKeyInfo'   : false
            };

            /**
             * GUI Variable
             * @type {{level: string, class: string}}
             */

            this.lockStatus = {
                'level': 2,
                'class': 'safer'
            };

            /* maybe REFACTOR TODO */
            this.passCaptcha = undefined;
            this.tmpPassCaptcha = '';


            this.localPWHandler = new cmKeyStorageService('pw');

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

                // via id
                if(typeof data == 'string' && data.length > 0){
                    self.id = data;
                    self.load();
                    // via data.id
                } else if(typeof data == 'object' && ('id' in data)){
                    self.id = data.id;
                    if(cmUtil.objLen(data) < 2){
                        self.load();
                    } else {
                        self.importData(data);
                    }
                } else {
                    self.state.set('new');
                    self.enableEncryption(); // have to be there!!! BS klären mit AP 18.06.2014
                    self.addRecipient(cmUserModel.data.identity)
                }

                self.trigger('init:finished');
            }

            this.userHasPrivateKey = function(){
                return  cmUserModel.hasLocalKeys()
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name checkConsistency
             * @description
             * Checks Conversation Settings and User Opinions
             *
             * @param {Boolean} bool Return true or false
             *
             * @todo: what is todo??
             */
            this.checkConsistency = function (){
                if(this.passwordRequired() && !this.password){
                    self.trigger('password:missing');
                    return false
                }

                if((this.recipients.length == 1) && !this.solitary && this.state.is('new')){
                    self.trigger('recipients:missing')
                    return false
                }

                return true;
            };

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
                //cmLogger.debug('cmConversationModel:importData');

                if(typeof data !== 'object'){
                    cmLogger.debug('cmConversationModel:import:failed - no data!');
                    return this;
                }

                //There is no invalid data, importData looks for everything useable in data; if it finds nothing it wont update anything
                this.id                     = data.id                   || this.id;
                this.timeOfCreation         = data.created              || this.timeOfCreation;
                this.timeOfLastUpdate       = data.lastUpdated          || this.timeOfLastUpdate;
                this.subject                = data.subject              || this.subject;
                this.numberOfMessages       = data.numberOfMessages     || this.numberOfMessages;
                this.unreadMessages         = data.unreadMessages       || this.unreadMessages;
                // special if unreadMessages == 0
                if('unreadMessages' in data && typeof data.unreadMessages == 'number' && data.unreadMessages == 0){
                    this.unreadMessages = 0;
                }
                this.missingAePassphrases   = data.missingAePassphrases || this.missingAePassphrases;
                this.keyTransmission        = data.keyTransmission      || this.keyTransmission;

                //Create passphraseVault:
                if(data.sePassphrase || data.aePassphraseList){

                    var recipients = [];

                    if(typeof data.inactiveRecipients != 'undefined'){
                        recipients = data.recipients.concat(data.inactiveRecipients)
                    } else {
                        recipients = data.recipients;
                    }

                    passphraseVault =   cmPassphraseVault.create({
                        sePassphrase:       data.sePassphrase,
                        aePassphraseList:   data.aePassphraseList,
                        signatures:         data.conversationSignatures,
                        recipientKeyList:   recipients
                    })
                }

                /**
                 * Important for none encrypted Conversations
                 */
                if(!this.state.is('new') && this.keyTransmission == 'none')
                    self.disableEncryption();

                // getting locally saved pw for conversation
                if(this.password == undefined)
                    this.password = this.localPWHandler.get(this.id)

                this.initPassCaptcha(data);

                var messages = data.messages || [];
                messages.forEach(
                    function(message_data) {
                        message_data.conversation = self;
                        self.messages.create(message_data).decrypt();
                    }
                );

                var recipients = data.recipients || [];
                recipients.forEach(
                    function(recipient_data){
                        self.addRecipient(cmIdentityFactory.create(recipient_data.identityId));
                    }
                );

                this.inactiveRecipients = data.inactiveRecipients || this.inactiveRecipients;

                if(this.userHasPrivateKey() == false){
                    this.options.showKeyInfo = true;
                }

                /*
                 if(!this.state.is('new') && this.keyTransmission == 'mixed' && this.isUserInPassphraseList() == false){
                 this.options.hasPassword = true;
                 }
                 */

                this.state.unset('new');
                this.trigger('update:finished');

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

                var passphrase_data =   passphraseVault
                    ?   passphraseVault.exportData()
                    :   { keyTransmission: 'none' }

                data.sePassphrase           =   passphrase_data.sePassphrase        || undefined;
                data.aePassphraseList       =   passphrase_data.aePassphraseList    || undefined;
                data.keyTransmission        =   passphrase_data.keyTransmission
                data.conversationSignatures =   passphrase_data.signatures

                data.recipients             =       passphrase_data.recipientKeyList
                ||  this.recipients.map(function(recipient){
                    return  {
                        identityId:     recipient.id ,
                        keys:          []
                    }
                });

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
             * @returns {Object} this Returns ConversationModel
             */
            this.load = function(){
//                cmLogger.debug('cmConversationModel:load');
                if(typeof this.id == 'string'
                    && this.id.length > 0
                    && this.state.is('loading') === false)
                {
                    this.state.set('loading');

                    cmConversationsAdapter.getConversation(this.id, limit, self.messages.length).then(
                        function(conversation_data){
                            self.importData(conversation_data);

                            self.state.unset('loading');
                        },
                        function(response){
                            self.state.unset('loading');
                            self.trigger('load:failed');

                            if(response.status && response.status == 404){
                                self.trigger('notFound',self);
                            }
                        }
                    );
                } else if(this.state.is('loading') === false) {
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

                if(!this.state.is('new'))
                    return $q.reject();

                return  $q.when(
                    this.isEncrypted()
                        ?   cmPassphraseVault.encryptPassphrase({
                        passphrase:         undefined,   // will be generated
                        password:           this.password,
                        identities:         this.recipients,
                        restrict_to_keys:   undefined   // encrypt for all recipient keys
                    })
                        :   undefined
                )
                    .then(function(pv){
                        passphraseVault = pv;
                        return cmConversationsAdapter.newConversation(self.exportData())
                    })
                    .then(
                    function (conversation_data) {
                        self
                            .importData(conversation_data)
                            .savePassCaptcha();

                        if(typeof self.password == 'string' && self.password.length > 0){
                            self.localPWHandler.set(conversation_data.id, self.password);
                        }

                        self.state.unset('new');
                        self.trigger('save:finished');

                        return conversation_data;
                    },

                    function(){
                        self.trigger('save:failed');
                        return $q.reject();
                    }
                )
            };

            this.update = function(conversation_data, fromDrtvInit){
                var offset = 0,
                    clearAllMessages = false;

                // unbind load prev messages but scroll to last message
                if(fromDrtvInit && self.messages.length >= limit){
                    $rootScope.$broadcast('scroll:to');
                    return this;
                }

                if(this.id){
                    if(typeof conversation_data !== 'undefined'){
                        if(this.messages.length < conversation_data.numberOfMessages) {
                            this._updateConversation(limit, self.messages.length, clearAllMessages);
                        }
                    } else {
                        self._updateConversation(limit, self.messages.length, clearAllMessages);
                    }
                }

                // after update scroll to last message
                if(fromDrtvInit) {
                    this.one('update:finished', function() {
                        $rootScope.$broadcast('scroll:to');
                    });
                }

                return this;
            };

            this.loadLatestMessages = function(){
                //cmLogger.debug('cmConversationModel.loadLatestMessages');

                if(typeof this.lastMessage.created == 'number'){
                    cmConversationsAdapter.getConversationMessages(this.id, null, null, this.lastMessage.created).then(
                        function(data){

                            self.state.set('loadedMessages');

                            /**
                             * Message Handling
                             */
                            if(typeof clearMessages !== 'undefined' && clearMessages !== false){
                                self.messages.reset();
                            }

                            self.importData(data);
                        }
                    )
                } else {
                    this.update();
                }

            };

            this.sendMessage = function(message, files, force){
                if(!(message instanceof cmMessageModel)){
                    return $q.reject('message no message-model');
                }

                return  this.getPassphrase()
                    .catch(function(){
                        return  self.isEncrypted()
                            ?   $q.reject('access denied')
                            :   $q.when(null);
                        //Todo: null for 'not encrypted' old convention
                    })
                    .then(
                    function(passphrase) {
                        return self.isEncrypted()
                            ? message
                            .addFiles(files)
                            .getSignatures()
                            .then(function () {
                                return message.encrypt(passphrase)
                            })
                            .then(function () {
                                return message.save()
                            })

                            : message
                            .addFiles(files)
                            .setPublicData(['text', 'fileIds'])
                            .revealSignatures()
                            .getSignatures()
                            .then(function () {
                                return message.save()
                            })
                    },
                    function(){
                        if(typeof force == 'boolean' && force === true){
                            return  message
                                .addFiles(files)
                                .setPublicData(['text', 'fileIds'])
                                .revealSignatures()
                                .getSignatures()
                                .then(function () {
                                    return message.save()
                                })
                        }
                    }
                )
            };

            /**
             * @param {Number} limit
             * @param {Number} offset
             * @param {Boolean} clearMessages
             */
            this._updateConversation = function(limit, offset, clearMessages){
                cmConversationsAdapter.getConversationMessages(this.id, limit, offset).then(
                    function(data){

                        self.state.set('loadedMessages');

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
             * @name disableEncryption
             * @description
             * Disables the encryption for the conversation. Works only if the conversation is new (state).
             *
             * @returns {Object} this Returns itself for chaining.
             */
            this.disableEncryption = function(){
//                cmLogger.debug('cmConversationModel:disableEncryption');

                if(this.state.is('new')){
                    encryption_disabled = true;
                    this.password = '';
                    this.trigger('encryption:disabled');
                }

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name enableEncryption
             * @description
             * Enables the encryption for the conversation. Works only if the conversation is new (state) and no proper passphrase is set.
             *
             * @returns {Object} this Returns itself for chaining.
             */
            this.enableEncryption = function(){
//                cmLogger.debug('cmConversationModel:enableEncryption');

                if(this.state.is('new')){
                    encryption_disabled = false;
                    this.trigger('encryption:enabled')
                }

                return this;
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name isEncrypted
             * @description
             * Returns encryption state of passphrase object which is similar of the encryption state of the conversation
             *
             * @returns {Boolean} bool Returns true if Conversation is encrypted.
             *
             * @todo
             */
            this.isEncrypted = function(){
//                cmLogger.debug('cmConversationModel.isEncrypted');

                return this.state.is('new')
                    ?   !encryption_disabled
                    :   this.keyTransmission != "none";
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name decrypt
             * @description
             * starts decrypting oh messages
             */
            this.decrypt = function () {
                //cmLogger.debug('cmConversationModel.decrypt', + this.subject);

                function run(){
                    self.getPassphrase()
                        .then(function (passphrase) {
                            return $q.all(self.messages.map(function (message) {
                                return message.decrypt(passphrase)
                            }))
                        })
                        .then(
                        function () {
                            self.trigger('decrypt:success');

                            // save password to localstorage
                            if (typeof self.password == 'string' && self.password.length > 0){
                                self.localPWHandler.set(self.id, self.password);
                            }

                            return $q.when()

                        },
                        function (reason) {
                            self.trigger('decrypt:failed');
                            return $q.reject(reason);
                        }
                    );
                }

                if(this.isEncrypted() && this.messages.some(function(message){return !message.state.is('decrypted')})){
                    //cmLogger.debug('conversation has to decrypt!')
                    run();
                }
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name getKeyTransmission
             * @description
             *
             *
             * @returns {String} getKeyTransmissionType
             */
            this.getKeyTransmission = function(){
                //If the conversation is not new:
                if(!this.state.is('new'))
                    return this.keyTransmission


                //Conversation is new, is it encrypted?
                if(!this.isEncrypted())
                    return 'none';

                //Conversation is new and encrypted,
                //is a password required for at least one recipient and if so are there any recipients who wont need a password?
                if(this.passwordRequired())
                    return this.getNiceRecipients() > 0 ? 'mixed' : 'symmetric'

                //Conversation is new, encrypted and there is no need for password:
                return 'asymmetric';
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name getPassphrase
             * @description
             * Function get the passphrase of the conversation, in order to use it for e.g. file encryption before upload.
             *
             * @returns {Promise} Returns a promise to resolve with passphrase
             */
            this.getPassphrase = function(){

                if(!this.isEncrypted())
                    return $q.reject('not encrypted.')

                if(!this.state.is('new') && !passphraseVault)
                    return $q.reject('new but passphrasevault missing.')

                if(!passphraseVault)
                    return $q.reject('passphrase vault missing.')

                return passphraseVault.get(this.password)
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name verifyAuthenticity
             * @description
             * Tries to verify the authenticity of the recipient list an the key transmission type.
             *
             * @returns {Promise} Returns a promise resolved if successful and rejected on failure
             */
            this.verifyAuthenticity = function(){
                return  passphraseVault
                    ?   passphraseVault.verifyAuthenticity()
                    :   $q.reject('cmConversationModel: missing passphraseVault')
            }

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name passwordRequired
             * @description
             * Checks if the conversation requires a password
             *
             * @returns {Boolean} returns true or false
             */
            this.passwordRequired = function(){
//                cmLogger.debug('cmConversationModel:passwordRequired');

                if(this.state.is('new')){
                    return  this.isEncrypted()
                        &&  (
                        this.getBadRecipients().length != 0
                        ||  !this.userHasPrivateKey()
                        || this.hasPassword()
                        )

                } else {
                    return this.hasPassword() && (!this.userHasPrivateKey() || !this.userHasAccess())
                }
            }

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name hasPassword
             * @description
             * Helper Function which checks if Conversation has as Password
             *
             * @returns {Boolean} boolean Returns a Boolean
             */
            this.hasPassword = function(){
//                cmLogger.debug('cmConversationModel:hasPassword');
                if(this.state.is('new')){
                    return (this.options.hasPassword == true)
                } else {
                    return passphraseVault && ['symmetric', 'mixed'].indexOf(passphraseVault.getKeyTransmission()) != -1;
                }
            };

            //TODO:
            this.userHasAccess = function(){
                return passphraseVault.userHasAccess();
            };

            this.enablePassCaptcha = function(){
//                cmLogger.debug('cmConversationModel.enablePassCaptcha');
                this.options.hasCaptcha = true;
                this.trigger('captcha:enabled');

                return this;
            };

            this.disablePassCaptcha = function(){
//                cmLogger.debug('cmConversationModel.disablePassCaptcha');
                if(!this.state.is('new')) return ;

                this.options.hasCaptcha = false;
                this.tmpPassCaptcha = '';
                this.trigger('captcha:disabled');

                return this;
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
//                cmLogger.debug('cmConversationModel.initPassCaptcha');
                if(typeof conversation_data.passCaptcha !== 'undefined' && conversation_data.passCaptcha != '' && this.passCaptcha == undefined){
                    /**
                     * set Options
                     * @type {boolean}
                     */
                    this.options.hasCaptcha = true;

                    this.passCaptcha = cmFileFactory.create(conversation_data.passCaptcha);
                    this.passCaptcha
                        .downloadStart(true);
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
                    // public passcaptcha
                    this.passCaptcha.setPassphrase(null);

                    this.passCaptcha
                        .importBase64(this.tmpPassCaptcha)
                        .prepareForUpload()
                        .then(function(){
                            self.passCaptcha.uploadChunks();
                        });

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
             * @name getBadRecipients
             * @description
             * Function returns a list of all recipients who have no proper key
             *
             * @returns {Array} recipients Filter
             */
            this.getBadRecipients = function(){
                return this.recipients.filter(function(recipient){
                    return recipient.keys.getWeakestKeySize() <= 2000
                })
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name getNiceRecipients
             * @description
             * Function returns a list of all recipients who have a proper key
             *
             * @returns {Array} recipients Filter
             */
            this.getNiceRecipients = function(){
                return  this.recipients.filter(function(recipient){
                    return recipient.keys.getWeakestKeySize() > 2000
                })
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
//                cmLogger.debug('cmConversationModel.addRecipient');
                this.recipients.register(identityModel);

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

            /**
             * @param identity
             * @returns {cmConversationModel.ConversationModel}
             */
            this.removeRecipient = function (recipient) {
//                cmLogger.debug('cmConversationModel.removeRecipient');
                this.recipients.deregister(recipient);

                return this;
            };

            this.checkPreferences = function(){
                if(this.state.is('new')) {
                    /**
                     * set Default
                     * has Captcha will be set at an other method
                     */
                    this.options.hasPassword = false;
                    this.options.showKeyInfo = false;

                    if (this.isEncrypted()) {
                        if (this.state.is('new') && this.userHasPrivateKey() == false) {
                            this.options.hasPassword = true;
                            this.options.showKeyInfo = true;
                        }

                        /**
                         * check recipients
                         */
                        if (this.getBadRecipients().length > 0) {
                            self.options.hasPassword = true;
                        }
                    }

                    /**
                     * last check for captcha preference
                     */
                    if (this.hasPassword() == false) {
                        this.options.hasCaptcha = false;
                    }
                }
            };

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name updateLockStatus
             * @description
             * update lock status for gui
             *
             * @returns {cmConversationModel} this cmConversationModel
             */
            this.updateLockStatus = function(){
//                cmLogger.debug('cmConversationModel.updateLockStatus');

                var levels =    {
                    'asymmetric'    : 2,
                    'symmetric'     : 1,
                    'mixed'         : 1,
                    'none'          : 0
                };
                var className = '',
                    allRecipientsHasKeys = true;


                if(this.state.is('new')){

                    if(this.isEncrypted() !== false){
                        this.lockStatus.level = levels.mixed;

                        this.recipients.forEach(function(recipient){
                            if(recipient.keys.getWeakestKeySize() == 0){
                                allRecipientsHasKeys = false;
                            }
                        });

                        if(allRecipientsHasKeys !== false && this.hasPassword() !== true){
                            this.lockStatus.level = levels.asymmetric;
                        }
                    } else {
                        this.lockStatus.level = levels.none;
                    }


                } else {
                    this.lockStatus.level = levels[this.keyTransmission];
                }

                switch(this.lockStatus.level){
                    case 0: className = 'unsafe'; break;
                    case 1: className = 'safe'; break;
                    case 2: className = 'safer'; break;
                }

                this.lockStatus.class = 'safetylevel-'+className;

                return this;
            };

            this.setLastMessage = function(){
//                cmLogger.debug('cmConversationModel.setLastMessage!');

                if(this.messages.length > 0){

                    this.lastMessage = this.messages.reduce(function(value, message){
                        return value != undefined ? ( (value.created > message.created) ? value : message) : message;
                    });
                }

                return this;
            };

            this.checkMissingTrustedKeys = function(){
                if(this.state.is('decrypted')){
                    // check ob trusted keys in pasephraselist fehlen
                    // special call ans BE?
                }
            };

            /**
             * Event Handling
             */

            $rootScope.$on('logout', function(){
                self.messages.reset();
                self.recipients.reset();
            });

            $rootScope.$on('identity:switched', function(){
                self.messages.reset();
                self.recipients.reset();
            });

            this.on('update:finished', function(){
//                cmLogger.debug('cmConversationModel:on:update:finished');
                self.setLastMessage();
                self.decrypt();
                self.updateLockStatus();
            });

            this.on('encryption:enabled', function(){
//                cmLogger.debug('cmConversationModel:on:encryption:enabled');
                self.checkPreferences();
                self.updateLockStatus();
            });

            this.on('encryption:disabled', function(){
//                cmLogger.debug('cmConversationModel:on:encryption:disabled');
                self.checkPreferences();
                self.updateLockStatus();
            });

            //Todo: fire event on factory and delegate to conversation or something
            this.on('message:new', function(event, data){
                if(typeof data == 'object'){
                    if('message' in data) {
                        //console.log(self.timeOfLastUpdate,message_data.created)
                        if ('created' in data.message) {
                            self.timeOfLastUpdate = data.message.created;
                        }

                        var message = self.messages.find(data.message);
                        if (message == null) {
                            data.message.conversation = self;
                            self.numberOfMessages++;
                            message = self.messages.create(data.message);
                        } else {
                            message.importData(data.message);
                        }

                        self.decrypt();
                        self.setLastMessage();

                        if(!message.state.is('notified')){
                            message.state.set('notified');

                            cmBrowserNotifications.showNewMessage(message.from, self.id);
                        }


                        self.trigger('message:reInitFiles');
                    }

                    if('unreadMessages' in data){
                        self.unreadMessages = data.unreadMessages;
                    }
                }
            });

            this.recipients.on(['register', 'update:finished', 'deregister'], function(){
                //cmLogger.debug('cmConversationModel:recipients.on');
                self.updateLockStatus();
            });

            this.on('captcha:enabled captcha:disabled', function(){
//                cmLogger.debug('cmConversationModel:on:captcha:enabled');
                self.updateLockStatus();
            });

            this.messages.on('message:saved', function(){
                self.numberOfMessages ++;
                self.setLastMessage();
            });

            this.messages.on('decrypt:success', function(){
                self.state.set('decrypted');
                self.setLastMessage();

                //self.checkMissingTrustedKeys();
            });

            this.messages.on('last-message:read', function(event, message){
                // TODO: if last my own unread will never set back
                /*
                 * message.from.id != cmUserModel.data.identity.id
                 &&
                 */

                if(message.id == '#new_message')
                    return false;

                if((
                    !message.isEncrypted()
                    || message.state.is('decrypted')
                    || message.state.is('incomplete')
                    )
                    && self.unreadMessages > 0
                    && cmSettings.get('enableUnreadMessages')
                ){
                    self.unreadMessages = 0;
                    cmConversationsAdapter.sendReadStatus(self.id, message.id)
                }
            });

            cmUserModel.on('key:stored key:removed', function(){
                self.checkPreferences();
                self.updateLockStatus();
            });

            // after events!!!
            init(data);
        }

        return ConversationModel;
    }
]);
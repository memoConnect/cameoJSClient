'use strict';

angular.module('cmConversations').factory('cmConversationModel',[
    'cmConversationsAdapter',
    'cmMessageModel',
    'cmIdentityFactory',
    'cmFileFactory',
    'cmCrypt',
    'cmUserModel',
    'cmRecipientModel',
    'cmFactory',
    'cmStateManagement',
    'cmNotify',
    'cmObject',
    'cmLogger',
    'cmPassphraseList',
    'cmSecurityAspectsConversation',
    'cmUtil',
    '$q',
    '$rootScope',
    function (cmConversationsAdapter, cmMessageModel, cmIdentityFactory, cmFileFactory, cmCrypt, cmUserModel, cmRecipientModel, cmFactory, cmStateManagement, cmNotify, cmObject, cmLogger, cmPassphraseList, cmSecurityAspectsConversation, cmUtil, $q, $rootScope){

        /**
         * @TODO Auslagern?!??! - Keylist Handling & Passphrase Handling
         * @deprecated
         *
         * Outsourced security handling for conversations
         * @param {cmConversationModel} conversation to be managed
         */
        function SecurityManagement(conversation){
            var conversation               = conversation,
                passphrase                 = '';

            var self = this;

            this.getPassphrase = function(){
                return passphrase;
            };

            this.generatePassphrase = function(){
                if(!conversation.state.is('new')){
                    cmLogger.error('cmConversation: unable to generate passphrase; passphrase may only be generated before the conversation has been submitted.')
                    return false
                }else{
                    if(passphrase) cmLogger.warn('cmConversation: passphrase already present, generated new one.')
                    passphrase = cmCrypt.generatePassphrase() //TODO: Passphrase generation crappy!!
                }
                return this
            }

            this.getEncryptedPassphraseList = function(password){
                var eps = [] //encrypted passphrase list

                if(!this.checkConsistency()) return [];

                if(conversation.preferences.keyTransmission == 'symmetric' && password){
                    eps =   [{
                                keyId: '_passwd', 
                                encryptedPassphrase: cmCrypt.base64Encode(cmCrypt.encryptWithShortKey(password, passphrase))
                            }]
                }

                if(conversation.preferences.keyTransmission == 'asymmetric'){
                    eps = conversation.recipients.reduce(function(list, recipient){
                        return list.concat(recipient.encryptPassphrase(passphrase))
                    }, [])
                }
                return eps;
            };

            this.decryptPassphrase = function(encryptedPassphraseList, password){
                return this
                passphrase = encryptedPassphraseList.reduce(function(passphrase, item){
                    var returnSchmu;

                    if(passphrase) {
                        returnSchmu = passphrase;
                    } else if((item.keyId == "_passwd" && password)) {
                        returnSchmu = cmCrypt.decrypt(password, cmCrypt.base64Decode(item.encryptedPassphrase)) || ''
                    } else {
                        returnSchmu = cmUserModel.decryptPassphrase(item.encryptedPassphrase, item.keyId) || ''
                    }

                    return returnSchmu;

                    },'');
                return this
            };

            this.checkConsistency = function(){
                //TODO: refactor
                var result = true;

//                console.log('moep' ,conversation.preferences.encryption
//                && conversation.preferences.keyTransmission == 'asymmetric'
//                && this.getWeakestKeySize() == 0)

                if(
                       conversation.preferences.encryption
                    && conversation.preferences.keyTransmission == 'asymmetric'
                    && this.getWeakestKeySize() == 0
                ){
                    cmNotify.warn('CONVERSATION.WARN.PUBLIC_KEY_MISSING')
                    result = false
                }

                if(
                       conversation.preferences.encryption
                    && conversation.preferences.keyTransmission == 'asymmetric' 
                    && !cmUserModel.hasPrivateKey()
                ){
                    cmNotify.warn('CONVERSATION.WARN.PRIVATE_KEY_MISSING')
                    result = false
                }

                if(
                       conversation.preferences.encryption
                    && conversation.preferences.keyTransmission == 'symmetric' 
                    && !conversation.password
                ){
//                  cmNotify.warn('CONVERSATION.WARN.PASSWORD_MISSING')
                    conversation.trigger('password:missing');
                    result = false
                }

                return result
            }


            /**
             * @TODO mit AP klären, BS!!!
             * @returns {*|number}
             */
             this.getWeakestKeySize = function(){
                return  conversation.recipients.reduce(function(size, recipient){
//                            return size != undefined ? Math.min(recipient.getWeakestKeySize(), size) : recipient.getWeakestKeySize()
                            return size != undefined ? Math.min(recipient.getWeakestKeySize(), size.getWeakestKeySize()) : recipient.getWeakestKeySize()
                        }) || 0
            }
        }

        /**
         * @constructor
         * @description
         * Represents a Conversation.
         * Events
         *  - init:finished
         *  - update:finished
         *  - load:failed
         *  - message:new
         *  - message:added
         *  - save:failed
         *  - save:finished
         * Stats
         *  - new
         *  - loading
         *
         *
         * @param {Object} [data] The conversation data as received from the backend.
         */
        function ConversationModel(data){
            var self = this,
                encryptedPassphraseList = new cmPassphraseList();

            this.id                 = undefined;
            //--> factory
            this.recipients         = new cmFactory(cmRecipientModel);      //list of RecipientModel objects
            //--> factory
            this.messages           = new cmFactory(cmMessageModel);        //list of MessageModel objects
            //--> meta
            this.timeOfCreation     = 0;          //timestamp of the conversation's creation
            //--> meta
            this.timeOfLastUpdate   = 0;          //timestamp of the conversations's last Update
            this.subject            = '';            //subject
            this.securityAspects    = cmSecurityAspectsConversation.setTarget(this);
            this.meta               = {};          //stores meta data, not yet implemented, TODO
            this.password           = undefined;
            this.state              = new cmStateManagement(['new','loading']);

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
             * @param {Object} [data] The conversation data as required by .importData(), see below.
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
                    cmLogger.debug('cmConversationModel:import:failed - no Data!');
                    return this;
                }

                //There is no invalid data, importData looks for everything useable in data; if it finds nothing it wont update anything
                this.id                      = data.id           || this.id;
                this.timeOfCreation          = data.created      || this.timeOfCreation;
                this.timeOfLastUpdate        = data.lastUpdated  || this.timeOfLastUpdate;
                this.subject                 = data.subject      || this.subject;

                if('sePassphrase' in data) {
                    data.aePassphraseList = data.aePassphraseList || []
                    data.aePassphraseList.push({keyId: '_passwd', 'encryptedPassphrase': data.sePassphrase});
                }

                encryptedPassphraseList.importData(data.aePassphraseList);

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
                        /**
                         * @todo maybe refactor?
                         */
                        self.addRecipient(cmRecipientModel(cmIdentityFactory.get(recipient_data.identityId)))
                    }
                );

                // getting local saved pw for conversation
                if(this.password == undefined)
                    this.password = this.localPWHandler.get(this.id);

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

                if(this.subject != '')
                    data.subject = this.subject;

//                if(this.password != ''){
//                    data.sePassphrase = encryptedPassphraseList.getPassphrase();
//                }

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
             * @returns {*}
             */
            this.save = function(){
                var promises = [],
                    data = {};

                if(this.state.is('new')){
                    /**
                     * @todo
                     * 02.06.2014 current mock bs
                     */
                    if(checkConsistency()){
                        deferred.reject();
                        return deferred.promise;
                    }

                    cmConversationsAdapter.newConversation(this.exportData()).then(
                        function (conversation_data) {
                            self
                                .importData(conversation_data)
                                .savePassCaptcha();

                            var i = 0;
                            while(i < self.recipients.length){
                                if(self.recipients[i].id != cmUserModel.data.identity.id){
                                    promises.push(cmConversationsAdapter.addRecipient(self.id, self.recipients[i].id));
                                }
                                i++;
                            }

                            /**
                             * @todo - neu verschlüsselung - anders!
                             */
                            if(encryptedPassphraseList.isEncrypted()){
                                encryptedPassphraseList.generatePassphrase();

                                self.saveEncryptedPassphraseList(); //todo
                            }

                            $q.all(promises).then(function(){
                                self.state.unset('new');
                                self.trigger('save:finished');
                            });
                             // -> add recipeints -> message verschicken
                        },
                        function(){
                            self.trigger('save:failed');
                        }
                    )
                }

                return this;
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
                cmLogger.debug('cmConversationModel:decrypt');

                if(encryptedPassphraseList.getEncryptionType() == 'none')
                    return true;

                var passphrase = this.getPassphrase(),
                    passphrase_valid_form = (typeof passphrase == 'string' && passphrase.length > 0);

                var success = passphrase_valid_form && this.messages.reduce(function (success, message){
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
            this.getEncryptionType = function(){
                return encryptedPassphraseList.getEncryptionType();
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
                return encryptedPassphraseList.getPassphrase(this.password);
            }

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
             * @returns {ConversationModel} this returns ConversationModel
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
             * @param {Object} recipient RecipientModel
             * @returns {cmConversationModel} this returns cmConversationModel
             */
            this.addRecipient = function(recipient){
                if(this.recipients.indexOf(recipient) == -1){
                    this.recipients.push(recipient)

                    //self.recipients.create(cmRecipientModel(recipient))

                    recipient.on('update', function(){
                        self.trigger('recipient:update') //Todo: noch nicht gelöst =/
                    })
                    this.trigger('recipient-added')
                } else {
                    if(cmUserModel.data.id != recipient.id){
                        cmLogger.debug('conversationModel: unable to add recipient; duplicate detected. (id:'+recipient.id+')')
                    }
                }
                return this;
            }

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
                var level = 0;

                if(encryptedPassphraseList.isEncrypted() == true){
                    switch(encryptedPassphraseList.getEncryptionType()){
                        case "asymmetric":
                                level = 2;
                            break;
                        case "symmetric":
                                level = 1;
                            break;
                        case "mixed":
                                level = 1;
                            break;

                    }
                }

//                if(this.encryptedPassphraseList.length >= 1 && this.encryptedPassphraseList[0].keyId != "_passwd"){
//                    level = 2
//                }else{
//                    if(this.encryptedPassphraseList.length == 1 && this.encryptedPassphraseList[0].keyId == "_passwd"){
//                        level = 1
//                    }else{
//                        level = 0
//                    }
//                }

                return level;
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

            /**
             * @ngdoc method
             * @methodOf cmConversationModel
             *
             * @name passphraseValid
             * @description
             * #1 true = for none encryption
             * #2 true = none messages
             * #3 true = decryption on first message succeed
             * #4 false = decryption on first message failed
             *
             * @returns {boolean}
             */
            this.passphraseValid = function () {
                //!this.preferences.encryption || !this.messages[0] || (security.getPassphrase() && this.messages[0].decrypt(security.getPassphrase()));
                //(encryptedPassphraseList.getPassphrase(this.password) && this.messages[0].decrypt(encryptedPassphraseList.getPassphrase(this.password))

                var boolean = true;

                if( this.messages.length > 0 &&
                    encryptedPassphraseList.isEncrypted() &&
                    !this.messages[0].decrypt())
                {
                    boolean = false;
                }

                console.log('passphraseValid', 'return '+boolean)

                return boolean;
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

            encryptedPassphraseList.on('passphrase:changed', function(){
//                self.decrypt();
            });

            this.on('update:finished', function(){
                self.decrypt();
            });

            this.on('feedback:decrypt:fail', function(){
                cmNotify.warn('CONVERSATION.WARN.PASSWORD_WRONG',{ttl:2000})
            });

            this.on('message:added', function(event, message){
                message.decrypt(self.security.passphrase);
            });

            //Todo: fire event on factory and delegate to conversation or something
            this.on('message:new', function(event, message_data){
                self.messages.create(message_data).decrypt(self.getPassphrase())
            });

            /*
             cmConversationsAdapter
             .on('message:new', function(event, message_data){ self.addMessage(cmMessageFactory.get(message_data)) })
             */

            /*
             self
             .on('message-added recipient-added subject-updated', function(event, data){ self.updateTagLine() })
             */

            //Todo:
            this.on('message-added', function(){ self.numberOfMessages++ });

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

            this.sync = function(){
                //cmConversationsAdapter.addRecipient(this.id, identity.id)
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

                        this.initPassCaptcha(conversation_data);
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

                                    self.initPassCaptcha(data);
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
                         * passCaptcha Handling
                         */
                        self.initPassCaptcha(data);

                        /**
                         * Message Handling
                         */
                        if(typeof clearMessages !== 'undefined' && clearMessages !== false){
                            self.messages.reset();
                        }

                        data.messages.forEach(function(message_data) {
                            self.messages.create(message_data).decrypt(self.getPassphrase());
                        });
                    }
                )
            };

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

            this.hasRecipient = function(identity){
                var check = false;

                this.recipients.forEach(function(recipient){
                    check = check || (identity.id == recipient.id);
                });

                return check;
            };

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

            /**
             * Crypt Handling
             */
            this.setKeyTransmission = function(mode){
                this.preferences.keyTransmission(mode);
                security.checkConsistency();
            };
        }

        return ConversationModel;
    }
]);
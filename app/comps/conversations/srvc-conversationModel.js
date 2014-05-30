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
    'cmSecurityAspectsConversation',
    '$q',
    '$rootScope',

    function (cmConversationsAdapter, cmMessageModel, cmIdentityFactory, cmFileFactory, cmCrypt, cmUserModel, cmRecipientModel, cmFactory, cmStateManagement, cmNotify, cmObject, cmLogger, cmSecurityAspectsConversation,$q, $rootScope){


        /**
         * Outsourced security handling for conversations
         * @param {cmConversationModel} conversation to be managed
         */
        function SecurityManagement(conversation){
            var conversation               = conversation,
                passphrase                 = ''

            var self = this

            this.getPassphrase = function(){
                return passphrase 
            }

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

                if(!this.checkConsistency()) return []

                if(conversation.preferences.keyTransmission == 'asymmetric'){
                    eps =   conversation.recipients.reduce(function(list, recipient){
                                return list.concat(recipient.encryptPassphrase(passphrase))
                            }, [])
                }

                if(conversation.preferences.keyTransmission == 'symmetric' && password){
                    eps =   [{
                                keyId: '_passwd', 
                                encryptedPassphrase: cmCrypt.base64Encode(cmCrypt.encryptWithShortKey(password, passphrase))
                            }]
                }

                return eps
            }


            this.decryptPassphrase = function(encryptedPassphraseList, password){
                passphrase  =   encryptedPassphraseList.reduce(function(passphrase, item){
                                    return      passphrase
                                            ||  (item.keyId == "_passwd" && password)
                                                //TODO check return value when password == ''
                                                ?   cmCrypt.decrypt(password, cmCrypt.base64Decode(item.encryptedPassphrase)) || ''
                                                :   cmUserModel.decryptPassphrase(item.encryptedPassphrase, item.keyId) || ''
                                },'')
                return this
            }



            this.checkConsistency = function(){
                //TODO: refactor
                var result = true

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
             * @TODO mit AP klären, BS
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
        * Represents a Conversation.
        * @constructor
        * @param {Object} [fdata] - The conversation data as received from the backend.
        */
       
        function ConversationModel(data){

            this.id                 = undefined

            //--> factory
            this.recipients         = []            //list of RecipientModel objects
            //--> factory
            this.messages           = new cmFactory(cmMessageModel)            //list of MessageModel objects

            //--> meta
            this.timeOfCreation     = 0             //timestamp of the conversation's creation
            //--> meta
            this.timeOfLastUpdate   = 0             //timestamp of the conversations's last Update

            this.subject            = ''            //subject

            this.encryptedPassphraseList = []

            this.securityAspects    = cmSecurityAspectsConversation.setTarget(this)

            this.meta               =   {           //stores meta data, not yet implemented, TODO
                                        }

            this.preferences        =   {           //settings the user can change
                                            keyTransmission:    'symmetric',
                                            encryption:         true

                                        }

            this.password           = undefined

            this.state              = new cmStateManagement(['new'])

            var self        = this,
                security    = new SecurityManagement(this)

            /*maybe REFACTOR TODO*/
            this.passCaptcha = undefined;
            this.tmpPassCaptcha = '';


            /**
             * Function to initialize the conversation. Should never be called from the outside.
             * @param {Object} [data] - The conversation data as required by .importData(), see below.
             */

            this._init = function(data){
                // Add event and chain handling to the Conversation:

                cmObject
                .addEventHandlingTo(this)
                .addChainHandlingTo(this)
                
                if(!data || !data.id) self.state.set('new') 

                this.importData(data)



                /*
                cmConversationsAdapter
                .on('message:new', function(event, message_data){ self.addMessage(cmMessageFactory.get(message_data)) })
                */
               

                //Todo: fire event on factory and delegate to conversation or something
                self.on('message:new', function(event, message_data){
                    self.messages.create( message_data).decrypt(self.getPassphrase())
                })

                /*
                self
                .on('message-added recipient-added subject-updated', function(event, data){ self.updateTagLine() })                
                */

                //Todo:
                self.on('message-added', function(){ self.numberOfMessages++ })

                this.trigger('init', data)
            }


            /**
             * Function to import data as received from the backend.
             * @param {Object} data -  The conversation data as recieved from the backend.
             */

            this.importData = function(data){

                if(!data) return this

                //There is no invalid data, importData looks for everything useable in data; if it finds nothing it wont update anything
                this.id                      = data.id           || this.id
                this.timeOfCreation          = data.created      || this.timeOfCreation
                this.timeOfLastUpdate        = data.lastUpdated  || this.timeOfLastUpdate
                this.subject                 = data.subject      || this.subject

                Array.prototype.push.apply(this.encryptedPassphraseList, data.encryptedPassphraseList || [] )

                security.decryptPassphrase(this.encryptedPassphraseList, this.password)

                /**
                 * muss bleiben, aktuelle falsche stelle, sollte in die init
                 */
                this.setEncryptionType();
                this.initPassCaptcha(data);

                var messages = data.messages || []
                messages.forEach(
                    function(message_data) { self.messages.create(message_data) }
                )

                var recipients = data.recipients || []
                recipients.forEach(
                    function(recipient_data){ self.addRecipient(cmRecipientModel(cmIdentityFactory.get(recipient_data.identity))) }
                )

                return this
            }

            //TODO: this.exportData() !

            /**
             * Function to add a message to a conversation. Will not update the backend.
             * @param {MessageModel} message.
             */  
            this.addMessage = function(message){
                cmLogger.warn('cmConversation: .addMessage() is deprecated.')
                if(this.messages.indexOf(message) == -1){
                    this.messages.register( message )
                    this.trigger('update')
                } else {
                    cmLogger.warn('conversationModel: unable to add message; duplicate detected. (id:'+message.id+')')
                }

                return this
            }



            /**
             * Function to add a recipient to a conversation. Will not update the backend.
             * @param {RecipientModel} recipient.
             */
            

            this.addRecipient = function(recipient){
                if(this.recipients.indexOf(recipient) == -1){
                    this.recipients.push( recipient )

                    //self.recipients.create(cmRecipientModel(recipient))

                    recipient.on('update', function(){
                        self.trigger('recipient:update') //Todo: noch nicht gelöst =/
                    })
                    this.trigger('recipient-added')
                } else {
                    cmLogger.error('conversationModel: unable to add recipient; duplicate detected. (id:'+recipient.id+')')
                }
                return this
            }

            /**
             * Function get the passphrase of the conversation, in order to use it for e.g. file encryption before upload.
             * @return {String} Returns the passphrase
             */
            this.getPassphrase = function(){
                return security.getPassphrase()
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

            this.init = function (conversation_data) {

                cmLogger.warn('conversationModel: .init() is deprecated, please use .importData().')

                this.importData(conversation_data)
                return this;

                /*
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
                */
            }

            this.sync = function(){
                //cmConversationsAdapter.addRecipient(this.id, identity.id)
            };

            this.save = function(){
                var deferred = $q.defer();


                if(this.state.is('new')){
                    if(!security.checkConsistency()){
                        deferred.reject()
                        return deferred.promise
                    }

                    cmConversationsAdapter.newConversation((this.subject || '')).then(
                        function (conversation_data) {
                            self
                            .importData(conversation_data)
                            .savePassCaptcha()

                            var i = 0;
                            while(i < self.recipients.length){
                                cmConversationsAdapter.addRecipient(self.id, self.recipients[i].id);
                                i++;
                            }

                            if(self.preferences.encryption){
                                security
                                .generatePassphrase()

                                self
                                .saveEncryptedPassphraseList() //todo

                            }

                            self.state.unset('new')

                            deferred.resolve();
                        },

                        function(){
                            deferred.reject();
                        }
                    )
                } else {
                    deferred.resolve();
                }

                return deferred.promise;
            };

            this.initPassCaptcha = function(conversation_data){
                if(typeof conversation_data.passCaptcha !== 'undefined' && conversation_data.passCaptcha != '' && this.passCaptcha == undefined){
                    this.passCaptcha = cmFileFactory.create(conversation_data.passCaptcha);
                    this.passCaptcha
                        .setPassphrase('')
                        .downloadStart();
                }
            };

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
                            self.messages.create(message_data);
                        });
                    }
                )
            };

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
            
            /*
            this.addMessage = function (message, encrypt_passphrase) {

                if(this.messages.length == 0){
                    this.messages.push(message); // kunstgriff, eine neue conversation, hat erstmal nur eine message, da is der id abgleich egal
                }else {
                    var i = 0;
                    var check = false;
                    while(i < this.messages.length){
                        if(message.id == this.messages[i].id){
                            check = true;
                            break;
                        }
                        i++;
                    }

                    if(check !== true){
                        this.messages.push(message);
                    }
                }

                message.decrypt(this.passphrase);

                return this
            };
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
                this.preferences.keyTransmission(mode)
                security.checkConsistency()             
             }

            this.saveEncryptedPassphraseList = function(){
                this.encryptedPassphraseList = security.getEncryptedPassphraseList(self.password)                
                if(
                       this.encryptedPassphraseList
                    && this.encryptedPassphraseList.length !=0
                ){
                    return cmConversationsAdapter.updateEncryptedPassphraseList(this.id, this.encryptedPassphraseList)
                }else{
                    return $q.when(true)
                }
            }

            this.decrypt = function (feedback) {
                if(!this.preferences.encryption) return null

                //Todo:
                security.decryptPassphrase(this.encryptedPassphraseList, this.password)

                var passphrase = security.getPassphrase()
                
//                if(!passphrase) cmLogger.error('cmConversation: unable to decrypt, passphrase missing.')
                if(!passphrase) cmLogger.debug('cmConversation: unable to decrypt, passphrase missing.')

                var success =   passphrase
                                &&
                                this.messages.reduce(function (success, message) {
                                        return success && message.decrypt(passphrase); //@TODO
                                }, true)

                if(success){
                    this.trigger('decrypt:ok');
                } else {
                    if(typeof feedback === 'boolean' && feedback !== false){
                        this.trigger('feedback:decrypt:fail');
                    }
                }

                return success
            };

            this.passphraseValid = function () {
                return !this.preferences.encryption || !this.messages[0] || (security.getPassphrase() && this.messages[0].decrypt(security.getPassphrase()))
            };


            this.getSafetyLevel = function(){
                var level = 0; 

                if(this.encryptedPassphraseList.length >= 1 && this.encryptedPassphraseList[0].keyId != "_passwd"){
                    level = 2
                }else{
                    if(this.encryptedPassphraseList.length == 1 && this.encryptedPassphraseList[0].keyId == "_passwd"){
                        level = 1
                    }else{
                        level = 0
                    }
                }

                return level
            };

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

            //this.init(data);

            this._init(data)

            /**
             * Event Handling
             */
            this.on('feedback:decrypt:fail', function(){
                cmNotify.warn('CONVERSATION.WARN.PASSWORD_WRONG',{ttl:2000})
            });

            this.on('message:added', function(event, message){
                if(self.security.passphrase != ''){
                    message.decrypt(self.security.passphrase);
                }
            });
        }

        return ConversationModel;
    }
])
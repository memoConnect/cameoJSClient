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
            this.conversation               = conversation

            this.passphrase                 = ''
            this.encryptedPassphraseList    = []
            this.keyTransmission            = undefined //symmetric, asymmetric
            this.password                   = ''

            self = this

            this.generatePassphrase = function(){
                if(this.conversation.is('new')){
                    cmLogger.error('cmConversation: unable to generate passphrase; passphrase may only be generated before the conversation has not been submitted.')
                    return false
                }else{
                    if(this.passphrase) cmLogger.warn('cmConversation: passphrase already present, generated new one.')
                    this.passphrase = cmCrypt.generatePassphrase() //TODO: Passphrase generation crappy!!
                }
            }

            //Todo: do we need this?
            this.tryPassphrase = function(passphrase){
                return this.conversation.decrypt(passphrase) && (this.passphrase = passphrase) && true
            }


            //TODO:
            this.decryptPassphrase = function(){
                this.passphrase =   this.encryptedPassphraseList.reduce(function(passphrase, item){
                                        console.log(passphrase)
                                        return      passphrase
                                                ||  item.keyId == "_passwd"
                                                    ?   cmCrypt.decrypt(self.password, cmCrypt.base64Decode(item.encryptedPassphrase)) || ''
                                                    :   cmUserModel.decryptPassphrase(item.encryptedPassphrase, item.keyId) || ''
                                    },'')

                console.log('PW:'+this.password)
                console.log(this.passphrase)
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

            this.passphrase         = ''

            this.securityAspects    = cmSecurityAspectsConversation.setTarget(this)

            this.meta               =   {           //stores meta data, not yet implemented, TODO
                                        }

            this.preferences        =   {           //settings the user can change

                                        }

            this.security           = new SecurityManagement(this)    //encryption handling, see above

            this.state              = new cmStateManagement(['new'])


            var self = this

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
                
                this.state.set('new')
                this.importData(data)



                /*
                cmConversationsAdapter
                .on('message:new', function(event, message_data){ self.addMessage(cmMessageFactory.get(message_data)) })
                */
               

                //Todo: fire event on factory and delegate to conversation or something
                self.on('message:new', function(event, message_data){
                    self.messages.create( message_data )
                })

                /*
                self
                .on('message-added recipient-added subject-updated', function(event, data){ self.updateTagLine() })                
                */

                //Todo:
                self.on('message-added', function(){ self.numberOfMessages++ })

                this.trigger('init')
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

                //Todo, maybe move to setup?
                this.security.encryptedPassphraseList = this.encryptedPassphraseList.concat(data.encryptedPassphraseList || [])
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
                        self.trigger('recipient:update') //Todo: noch icht gelöst =/
                    })
                    this.trigger('recipient-added')
                } else {
                    cmLogger.error('conversationModel: unable to add recipient; duplicate detected. (id:'+recipient.id+')')
                }
                return this
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
                this.encryptPassphrase()

                var deferred = $q.defer();


                if(!this.id){
                    if(!this.checkKeyTransmission()){
                        deferred.reject()
                        return deferred.promise
                    }

                    cmConversationsAdapter.newConversation((this.subject || '')).then(
                        function (conversation_data) {
                            self
                            .init(conversation_data)
                            .savePassCaptcha();

                            var i = 0;
                            while(i < self.recipients.length){
                                cmConversationsAdapter.addRecipient(self.id, self.recipients[i].id);
                                i++;
                            }

                            if(self.passphrase && self.checkKeyTransmission()){
                                self
                                .encryptPassphrase()
                                .saveEncryptedPassphraseList()
                                //self.passphrase
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
                            self.messages = [];
                        }

                        data.messages.forEach(function(message_data) {
                            self.addMessage(cmMessageFactory.create(message_data));
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
            }


            /**
             * Recipient Handling
             */

            
            this.getRecipientList = function(){
                cmLogger.debug('cmConversationModel: .getRecipientList() is deprecated.')
  

                return this.recipients.map(function(recipient){ 
                                                return recipient.displayName || 'CONTACT.ERROR.MISSING_DISPLAYNAME' 
                                            }).join(', ')
            }

            this.hasRecipient = function(identity){
                var check = false;

                this.recipients.forEach(function(recipient){
                    check = check || (identity.id == recipient.id)
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

            this.checkKeyTransmission = function(){
                var result = true

                if(this.keyTransmission == 'asymmetric' && this.getWeakestKeySize() == 0){
                    cmNotify.warn('CONVERSATION.WARN.PUBLIC_KEY_MISSING')
                    result = false
                }

                if(this.keyTransmission == 'asymmetric' && !cmUserModel.hasPrivateKey()){
                    cmNotify.warn('CONVERSATION.WARN.PRIVATE_KEY_MISSING')
                    result = false
                }

                if(this.keyTransmission == 'symmetric' && this.passphrase && !this.password && this.id != ''){
//                    cmNotify.warn('CONVERSATION.WARN.PASSWORD_MISSING')
                    this.trigger('password:missing');
                    result = false
                }

                return result
            }

            this.setKeyTransmission = function(mode){
                var old_mode = this.keyTransmission;

                this.keyTransmission = mode;

                if(this.checkKeyTransmission()){
                    return true;
                } else {
                    //this.keyTransmission = old_mode
                    return false;
                }

                //this.decryptPassphrase()
                //this.decrypt()
             };

            this.encryptPassphrase = function(){
                this.encryptedPassphraseList = [];

                if(!this.checkKeyTransmission()) return this

                if(this.keyTransmission == 'asymmetric'){
                    this.recipients.forEach(function(recipient){
                        var key_list = recipient.encryptPassphrase(self.passphrase)
                        self.encryptedPassphraseList = self.encryptedPassphraseList.concat(key_list)
                    })
                }

                if(this.keyTransmission == 'symmetric' && self.password){
                    self.encryptedPassphraseList = [{keyId: '_passwd', encryptedPassphrase: cmCrypt.base64Encode(cmCrypt.encryptWithShortKey(self.password, self.passphrase))}]
                }

                return this
            }

            this.saveEncryptedPassphraseList = function(){  
                if(
                       this.encryptedPassphraseList
                    && this.encryptedPassphraseList.length !=0
                ){
                    return cmConversationsAdapter.updateEncryptedPassphraseList(this.id, this.encryptedPassphraseList)
                }else{
                    return $q.when(true)
                }
            }

            this.decryptPassphrase = function(){
                cmLogger.warn('cmConversation: .decryptPassphrase() is deprecated; use security.decryptPassphrase instead.')
                this.security.decryptPassphrase()
                this.passphrase = this.security.passphrase
                return this;
            };

            this.setPassphrase = function (passphrase) {
                cmLogger.warn('cmConversation: .setPassphrase() is deprecated. Try conversation.security.tryPassphrase() or conversation.security.generatePassphrase() instead.')
                if(passphrase == undefined){
                    //this.security.generatePassphrase()
                    this.passphrase = this.passphrase || cmCrypt.generatePassphrase()
                }else{
                    //this.securityTryPassphrase(passphrase)
                    this.passphrase = passphrase
                }
                return this;
            }

            this.decrypt = function (feedback) {
                //Todo:
                if(!this.security.passphrase) cmLogger.error('cmConversation: unable to decrypt, passphrase missing, try conversation.security.decryptPassphrase() first.')

                var success =   this.security.passphrase
                                &&
                                this.messages.reduce(function (success, message) {
                                        return success && message.decrypt(self.passphrase); //@TODO
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
                return !this.messages[0] || this.messages[0].decrypt(this.passphrase)
            };

            this.getWeakestKeySize = function(){
                var size = undefined
                this.recipients.forEach(function(recipient){

                    size = size != undefined ? Math.min(recipient.getWeakestKeySize(), size) : recipient.getWeakestKeySize()
                })

                size = size || 0
                return size
            }

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
                if(self.passphrase != ''){
                    message.decrypt(self.passphrase);
                }
            });
        }

        return ConversationModel;
    }
])
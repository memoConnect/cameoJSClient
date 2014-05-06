'use strict';

angular.module('cmConversations').factory('cmConversationModel',[
    'cmConversationsAdapter',
    'cmMessageFactory',
    'cmIdentityFactory',
    'cmCrypt',
    'cmUserModel',
    'cmRecipientModel',
    'cmNotify',
    'cmObject',
    '$q',
    '$rootScope',
    function (cmConversationsAdapter, cmMessageFactory, cmIdentityFactory, cmCrypt, cmUserModel, cmRecipientModel, cmNotify, cmObject, $q, $rootScope){
        var ConversationModel = function(data){
            //Attributes:
            this.id = '',
            this.subject = '',
            this.messages = [],
            this.recipients = [],
            this.passphrase = '',
            this.created = '',
            this.lastUpdated = '',
            this.numberOfMessages = 0,
            this.encryptedPassphraseList = [];
            this.keyTransmission = 'asymmetric' || 'symmetric'
            var self = this;


            cmObject
            .addEventHandlingTo(this)
            .addChainHandlingTo(this)

            $rootScope.$on('logout', function(){
                self.messages = [];
                self.recipients = [];
            });

            /**
             * Conversation Handling
             */

            this.init = function (conversation_data) {

                if(typeof conversation_data !== 'undefined'){
                    this.id                 = conversation_data.id;
                    this.subject            = conversation_data.subject;
                    this.numberOfMessages   = conversation_data.numberOfMessages;
                    this.lastUpdated        = conversation_data.lastUpdated;


                    this.encryptedPassphraseList = this.encryptedPassphraseList.concat(conversation_data.encryptedPassphraseList || [])

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
                }
            }

            this.sync = function(){
                //cmConversationsAdapter.addRecipient(this.id, identity.id)
            }

            this.save = function(){

                var deferred = $q.defer();


                if(this.id == ''){
                    if(!this.checkKeyTransmission()){
                        deferred.reject()
                        return deferred.promise
                    }

                    cmConversationsAdapter.newConversation((this.subject || '')).then(
                        function (conversation_data) {

                            self.init(conversation_data);

                            var i = 0;
                            while(i < self.recipients.length){
                                cmConversationsAdapter.addRecipient(self.id, self.recipients[i].id);
                                i++;
                            }

                            if(self.passphrase && self.checkKeyTransmission()){
                                self.encryptPassphrase()
                                self.saveEncryptedPassphraseList()
                                self.passphrase
                            }

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
            }

            this.update = function(conversation_data){
                var offset = 0;
                var clearAllMessages = true;

                if(this.id != ''){
                    if(typeof conversation_data !== 'undefined'){
                        if(this.messages.length > 1){
                            offset = this.messages.length;
                            clearAllMessages = false;
                        }
                        var limit = conversation_data.numberOfMessages - offset;
                        this.updateMessages(limit, offset, clearAllMessages);
                    } else {
                        cmConversationsAdapter.getConversationSummary(this.id).then(
                            function(data){
                                if(self.messages.length < data.numberOfMessages){
                                    if(self.messages.length > 1){
                                        offset = self.messages.length;
                                        clearAllMessages = false;
                                    }
                                    var limit = data.numberOfMessages - offset;

                                    self.updateMessages(limit, offset, clearAllMessages);
                                }
                            }
                        )
                    }
                }

                return this;
            }

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

                //message.decrypt(this.passphrase);

                return this
            };

            this.getLastMessage = function(){
                if(this.messages.length > 0){
                    return this.messages[(this.messages.length - 1)];
                }
                return null
            }

            this.updateMessages = function(limit, offset, clearMessages){
                cmConversationsAdapter.getConversation(this.id, limit, offset).then(
                    function(data){
                        if(typeof clearMessages !== 'undefined' && clearMessages !== false){
                            self.messages = [];
                        }

                        data.messages.forEach(function(message_data) {
                            self.addMessage(cmMessageFactory.create(message_data));
                        });
                    }
                )
            }

            /**
             * Recipient Handling
             */

            this.getRecipientList = function(){
                var list = []

                this.recipients.forEach(function(recipient){
                    list.push(recipient.getDisplayName())
                })

                return list.join(', ')
            }

            this.hasRecipient = function(identity){
                var check = false;

                this.recipients.forEach(function(recipient){
                    check = check || (identity.id == recipient.id)
                })

                return check
            }

            this.addRecipient = function (identity) {
                this.trigger('before-add-recipient', identity)

                if(identity && !this.hasRecipient(identity)){
                    this.recipients.push(cmRecipientModel(identity));
                }else{
                    console.warn('Recipient already present.') //@ Todo
                }

                this.trigger('after-add-recipient', identity)
                return this;
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

            this.getSubjectLine = function(){
                var lastMessage = this.getLastMessage();
                return     this.subject
                        || (lastMessage ? lastMessage.from.getDisplayName() : false)
                        || this.getRecipientList()
            }

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

                if(this.keyTransmission == 'symmetric' && this.passphrase && !this.password){
                    cmNotify.warn('CONVERSATION.WARN.PASSWORD_MISSING')
                    result = false
                }

                return result
            }


            this.setKeyTransmission = function(mode){
                var old_mode = this.keyTransmission

                this.keyTransmission = mode

                if(this.checkKeyTransmission()){
                    return true
                } else {
                    //this.keyTransmission = old_mode
                    return false
                }

                //this.decryptPassphrase()
                //this.decrypt()
             }

            this.encryptPassphrase = function(){
                this.encryptedPassphraseList = [];

                if(!this.checkKeyTransmission()) return this

                if(this.keyTransmission == 'asymmetric'){
                    this.recipients.forEach(function(recipient){
                        var key_list = recipient.encryptPassphrase(self.passphrase)
                        self.encryptedPassphraseList = self.encryptedPassphraseList.concat(key_list)
                    })
                }

                if(this.keyTransmission == 'symmetric'){
                    self.encryptedPassphraseList = [{keyId: '_passwd', encryptedPassphrase: cmCrypt.encryptWithShortKey(self.password, self.passphrase)}]
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
                    return $q.defer().resolve().promise
                }
            }

            this.decryptPassphrase = function(){
                this.passphrase = ''
                this.encryptedPassphraseList.forEach(function(item){
                    if(!self.passphrase){
                        self.passphrase = cmUserModel.decryptPassphrase(item.encryptedPassphrase) || ''
                        if(item.keyId == "_passwd"){
                            self.passphrase = cmCrypt.decrypt(self.password, item.encryptedPassphrase) || ''
                        }
                    }
                })

                return this
            }

            this.setPassphrase = function (passphrase) {
                if(passphrase == undefined){
                    this.passphrase = this.passphrase || cmCrypt.generatePassphrase()
                }else{
                    this.passphrase = passphrase
                }
                return this;
            }

            this.decrypt = function () {
                this.decryptPassphrase()
                var success = true
                if (this.passphrase) {
                    this.messages.forEach(function (message) {
                        if(typeof self.passphrase !== "undefined"){
                            success = success && message.decrypt(self.passphrase); //@TODO
                        } else {
                            success = false
                        }
                    })
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
            }


            this.init(data);

        }

        return ConversationModel;
    }
])
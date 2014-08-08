'use strict';

angular.module('cmCore')
.factory('cmAuthenticationRequestModel', [
    'cmObject', 'cmStateManagement', 'cmCrypt', 'cmKey', 'cmUtil', 'cmAuth',
    'cmUserModel', 'cmLogger', 'cmContactsModel',
    function(cmObject, cmStateManagement, cmCrypt, cmKey, cmUtil, cmAuth,
             cmUserModel, cmLogger, cmContactsModel){
        function authenticationRequestModel(requestData){
            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = new cmStateManagement(['outgoing','incoming']);

            this.id = undefined;
            this.created = undefined;
            this.encryptedTransactionSecret = undefined;
            this.reencryptedTransactionSecret = undefined;
            this.signature = undefined;

            this.fromKeyId = undefined;
            this.fromKeyFingerprint = undefined;
            this.fromKey = {};

            this.toKeyId = undefined;
            this.toKeyFingerprint = undefined;
            this.toKey = {};

            //default is the current user's id
            this.toIdentityId   = cmUserModel.data.identity.id
            this.fromIdentityId = cmUserModel.data.identity.id


            function init(data){
//                cmLogger.debug('cmAuthenticationRequestModel.init');

                if(typeof data !== 'object' || !("id" in data)){
                    self.id = cmCrypt.hash(cmCrypt.random() + new Date());
                }

                if(typeof data == 'object'){
                    self.importData(data);
                }
            }

            this.importData = function(data){
//                cmLogger.debug('cmAuthenticationRequestModel.importData');

                if(typeof data !== 'object'){
                    cmLogger.debug('authenticationRequestModel.importData:failed - no data!');
                    return this;
                }

                this.id                             = data.id || this.id;
                this.created                        = data.created || this.created;
                this.encryptedTransactionSecret     = data.encryptedTransactionSecret || this.encryptedTransactionSecret;
                this.reencryptedTransactionSecret   = data.reencryptedTransactionSecret || this.reencryptedTransactionSecret;
                this.signature                      = data.signature || this.signature;
                this.fromKeyId                      = data.fromKeyId || this.fromKeyId;
                this.fromKeyFingerprint             = data.fromKeyFingerprint || this.fromKeyFingerprint;
                this.toKeyId                        = data.toKeyId || this.toKeyId;
                this.toKeyFingerprint               = data.toKeyFingerprint || this.toKeyFingerprint;
                this.toIdentityId                   = data.toIdentityId || this.toIdentityId
                this.fromIdentityId                 = data.fromIdentityId || this.fromIdentityId

                return this;
            };

            this.exportData = function(){
                return {
                            id:                             this.id,
                            identityId:                     cmUserModel.data.identity.id,
                            encryptedTransactionSecret:     this.encryptedTransactionSecret,
                            reencryptedTransactionSecret:   this.reencryptedTransactionSecret,
                            signature:                      this.signature,
                            fromKeyId:                      this.fromKeyId,
                            fromKeyFingerprint:             this.fromKeyFingerprint,
                            toKeyId:                        this.toKeyId,
                            toKeyFingerprint:               this.toKeyFingerprint,
                            toIdentityId:                   this.toIdentityId,
                            fromIdentityId:                 this.fromIdentityId
                        }
            }

            this.importKeyResponse = function(response){
//                cmLogger.debug('cmAuthenticationRequestModel.importKeyResponse');

                console.log(self.toIdentityId)

                var identity    =  !self.toIdentityId || (self.toIdentityId == cmUserModel.data.identity.id)
                                    ?   cmUserModel.data.identity
                                    :   cmContactsModel.findByIdentityId(self.toIdentityId).identity
                console.dir(identity)


                var   toKey       = identity.keys.find(response.toKeyId);

                if(toKey instanceof cmKey && toKey.id == response.toKeyId && (toKey.getFingerprint() === response.toKeyFingerprint)){
                    this.toKeyId = response.toKeyId;
                    this.toKeyFingerprint = response.toKeyFingerprint;
                    this.toKey = toKey;

                    this.trigger('key-response:accepted',{id:this.id});
                } else {
                    cmLogger.debug('cmAuthenticationRequestModel.importKeyResponse - fail');
                    this.trigger('key-response:failed');
                }
            }

            this.setToKey = function(toKey){
//                cmLogger.debug('cmAuthenticationRequestModel.importKeyResponse');

                if(this.state.is('outgoing') && !this.state.is('finished') && (toKey instanceof cmKey)){
                    this.toKeyId = toKey.id;
                    this.toKeyFingerprint = toKey.getFingerprint();
                    this.toKey = toKey;
                }
                return this
            };

            this.setFromKey = function(fromKey){
                if(this.state.is('outgoing') && !this.state.is('finished') && (fromKey instanceof cmKey)){
                    this.fromKeyId = fromKey.id;
                    this.fromKeyFingerprint = fromKey.getFingerprint();
                    this.fromKey = fromKey;
                }
                return this
            };

            this.setToIdentityId = function(identityId){
                this.toIdentityId = identityId 
                console.log(this.toIdentityId)
                return this
            }

            this.setFromIdentityId = function(identityId){
                this.fromIdentityId = identityId 
                return this
            }

            this.setTransactionSecret = function(secret){
                this.transactionSecret = secret
                return this
            }

            this.exportKeyIdsForBulk = function(){
//                cmLogger.debug('cmAuthenticationRequestModel.exportKeyIdsForBulk');

                var data = {};

                if(this.state.is('incoming')){
                    data = {key1:this.toKeyId, key2:this.fromKeyId};
                } else if(this.state.is('outgoing')){
                    data = {key1:this.fromKeyId, key2:this.toKeyId};
                }

                return data;
            };

            this.verifyForm = function(){
//                cmLogger.debug('cmAuthenticationRequestModel.verifyForm');

                if(typeof this.signature != 'string' || this.signature.length < 1){
                    cmLogger.debug('Error - cmAuthenticationRequestModel.verifyForm - Signature is not a String!');
                    return false;
                }

                if(typeof this.encryptedTransactionSecret != 'string' || this.encryptedTransactionSecret.length < 1){
                    cmLogger.debug('Error - cmAuthenticationRequestModel.verifyForm - encryptedTransactionSecret is not a String!');
                    return false;
                }

                if(typeof this.fromKeyId != 'string' || !cmUtil.validateString(this.fromKeyId)){
                    cmLogger.debug('Error - cmAuthenticationRequestModel.verifyForm - fromKeyId is not a String!');
                    return false;
                }

                if(typeof this.fromKeyFingerprint != 'string' || this.fromKeyFingerprint.length < 1){
                    cmLogger.debug('Error - cmAuthenticationRequestModel.verifyForm - fromKeyFingerprint is not a String!');
                    return false;
                }

                if(typeof this.toKeyId != 'string' || !cmUtil.validateString(this.toKeyId)){
                    cmLogger.debug('Error - cmAuthenticationRequestModel.verifyForm - toKeyId is not a String!');
                    return false;
                }

                if(typeof this.toKeyFingerprint != 'string' || this.toKeyFingerprint.length < 1){
                    cmLogger.debug('Error - cmAuthenticationRequestModel.verifyForm - toKeyFingerprint is not a String!');
                    return false;
                }

                return true;
            };

            this.verifyIncomingRequest = function(){
//                cmLogger.debug('cmAuthenticationRequestModel.verifyIncomingRequest');

                if(typeof this.id != 'string' || this.id.length < 1){
                    cmLogger.debug('Error - cmAuthenticationRequestModel.verifyIncomingRequest - verify id fail');
                    return false;
                }

                if(this.verifyForm() !== true){
                    return false;
                }

                

                /**
                 * load localKeys
                 */
                var localKeys = cmUserModel.loadLocalKeys();

                /*identity = 
                 * verify toKeyId
                 */
                var checkToKeyId = false;
                localKeys.forEach(function(key){
                    if(key.id == self.toKeyId && (key.getFingerprint() === self.toKeyFingerprint)){
                        checkToKeyId = true;

                        self.toKey = key;
                    }
                });

                if(!checkToKeyId){
                    cmLogger.debug('Error - cmAuthenticationRequestModel.verifyIncomingRequest - checkToKeyId fail');
                    return false;
                }

                /**
                 * verify fromKeyId
                 */
                
                var checkFromKeyId  = false,
                    identity        =   cmContactsModel.contacts.reduce(function(identity, contact){
                                            return identity || (contact.identity.id == self.fromIdentityId ? contact.identity : false)
                                        }, undefined)
                                        ||
                                        cmUserModel.data.identity

                identity.keys.forEach(function(key){
                    if(key.id == self.fromKeyId && (key.getFingerprint() === self.fromKeyFingerprint)){
                        checkFromKeyId = true;

                        self.fromKey = key;
                    }
                });

                if(!checkFromKeyId){
                    cmLogger.debug('Error - cmAuthenticationRequestModel.verifyIncomingRequest - checkFromKeyId fail');
                    return false;
                }

                /**
                 * verify signature
                 */
                if(!cmCrypt.verifyAuthenticationRequest({
                        identityId: identity.id,
                        fromKey: this.fromKey,
                        encryptedTransactionSecret: this.encryptedTransactionSecret,
                        signature: this.signature
                    })) {
                    cmLogger.debug('Error - cmAuthenticationRequestModel.verifyIncomingRequest - cmCrypt.verifyAuthenticationRequest fail');

                    return false;
                }

                return true;
            };

            this.verifyTransactionSecret = function(transactionSecret){
//                cmLogger.debug('cmAuthenticationRequestModel.verifyTransactionSecret');

                if(cmUtil.validateString(transactionSecret)){

                    if(cmCrypt.isTransactionSecretValid({
                        userInput: transactionSecret,
                        toKey: this.toKey,
                        encryptedTransactionSecret: this.encryptedTransactionSecret
                    })){
                        self.setTransactionSecret(transactionSecret)
                        this.trigger('secret:verified');

                        return true;
                    }

                    return false;
                }
            };

            this.send = function(){
               // cmLogger.debug('cmAuthenticationRequestModel.send');

                if(this.verifyForm() !== false){
                    cmAuth.sendBroadcast({
                        name: 'authenticationRequest:start',
                        data: this.exportData()
                    }, (this.toIdentityId == cmUserModel.data.identity.id) ? undefined : this.toIdentityId)
                    .then(
                        function(){
                            // do nothing
                        },
                        function(){
                            cmLogger.debug('authenticationRequestModel.send - Error');
                        }
                    );
                } else {
                    cmLogger.debug('Error - cmAuthenticationRequestModel.send - Data have not the right form!');
                }
            };

            this.sendKeyResponse = function(){
//                cmLogger.debug('cmAuthenticationRequestModel.sendKeyResponse');

                if(this.state.is('incoming') && !this.state.is('finished')){
                    var localKeys = cmUserModel.loadLocalKeys();

                    cmAuth.sendBroadcast({
                        name: "authenticationRequest:key-response",
                        data: {
                            id: this.id,
                            toKeyId: localKeys[0].id,
                            toKeyFingerprint: localKeys[0].getFingerprint()
                        }
                    }, (this.fromIdentityId == cmUserModel.data.identity.id) ? undefined : this.fromIdentityId)
                    .finally(function(){
                        self.trigger('request:finished')
                    })
                }
            };

            this.sendKeyRequest = function(){
//                cmLogger.debug('cmAuthenticationRequestModel.sendKeyRequest');

                if(this.state.is('outgoing') && !this.state.is('finished')){
                    cmAuth.sendBroadcast({
                        name: "authenticationRequest:key-request",
                        data: {
                            id: this.id,
                            fromIdentityId: this.fromIdentityId
                        }
                    }, (this.toIdentityId == cmUserModel.data.identity.id) ? undefined : this.toIdentityId);

                    console.log('sendKeyRequest')
                    console.dir(self)
                }
            };

            this.sendVerified = function(){
//                cmLogger.debug('cmAuthenticationRequestModel.sendVerified');


                if(this.state.is('incoming') && !this.state.is('finished')){
                    cmAuth.sendBroadcast({
                        name: 'authenticationRequest:verified',
                        data: {
                            id: this.id,
                            reencryptedTransactionSecret: self.fromKey.encrypt(self.transactionSecret)
                        }
                    }, (this.fromIdentityId == cmUserModel.data.identity.id) ? undefined : this.fromIdentityId)
                    .then(
                        function(){
                            // do nothing
                            self.state.set('finished');
                        },
                        function(){
                            cmLogger.debug('authenticationRequestModel.send - Error');
                        }
                    ).finally(
                        function(){
                            self.trigger('request:finished');
                        }
                    );
                }
            };

            this.finish = function(){
//                cmLogger.debug('cmAuthenticationRequestModel.finish');

                if(this.state.is('outgoing') && !this.state.is('finished')){

                    var identity =  !self.toIdentityId || (self.toIdentityId == cmUserModel.data.identity.id)
                                    ?   cmUserModel.data.identity
                                    :   cmContactsModel.findByIdentityId(self.toIdentityId).identity

                    self.fromKey = cmUserModel.loadLocalKeys().find(self.fromKeyId)
                    self.fromKey.decrypt(self.reencryptedTransactionSecret)

                    if(self.fromKey.getFingerprint() != self.fromKeyFingerprint){
                        cmLogger.debug('Error - cmAuthenticationRequestModel.finish - Fingerprints of fromKey dont match.')
                        return false
                    }

                    self.toKey = identity.keys.find(self.toKeyId)

                    if(self.toKey.getFingerprint() != self.toKeyFingerprint){
                        cmLogger.debug('Error - cmAuthenticationRequestModel.finish - Fingerprints of toKey dont match.')
                        return false
                    }

                    if(
                            typeof self.transactionSecret == 'string'
                        &&  self.transactionSecret === self.fromKey.decrypt(self.reencryptedTransactionSecret)
                    ) {
                        cmUserModel.signPublicKey(self.toKey, self.toKeyFingerprint, identity);
                    } else {
                        cmLogger.debug('Error - cmAuthenticationRequestModel.finish - verify fail!');
                    }
                    this.state.set('finished')
                    self.trigger('request:finished')
                }
            };

            init(requestData);

            this.on('secret:verified', function(){
                cmLogger.debug('cmAuthenticationRequestModel.on:secret:verified');


                if(self.state.is('incoming') && !self.state.is('finished')){ 
                    var identity =  (self.fromIdentityId == cmUserModel.data.identity.id)
                                    ?   cmUserModel.data.identity
                                    :   cmContactsModel.findByIdentityId(self.fromIdentityId).identity


                    cmUserModel.signPublicKey(this.fromKey, this.fromKeyFingerprint, identity)
                    .finally(function(){
                        cmLogger.debug('cmAuthenticationRequestModel - after signing');

                        if(self.state.is('incoming') && !self.state.is('finished')){
                            self.sendVerified();
                        }
        //
                        if(self.state.is('outgoing') && !self.state.is('finished')){
                            cmAuth.sendBroadcast({
                                name: 'signatures:updated',
                                data: {
                                    id: cmUserModel.data.identity.id
                                }
                            }, (this.fromIdentityId == cmUserModel.data.identity.id) ? undefined : this.fromIdentityId)
                            .finally(
                                function(){
                                    self.trigger('request:finished');
                                }
                            );
                        }
                    })
                }
            });


//            cmUserModel.on('signatures:cancel', function(){
//                console.log('signatures:cancel');
//                self.trigger('request:finished');
//            });
        }

        return authenticationRequestModel;
    }
])
.factory('cmAuthenticationRequestFactory',[
    'cmFactory',
    'cmAuthenticationRequestModel',
    '$rootScope',
    function(cmFactory, cmAuthenticationRequestModel, $rootScope){
        var self = new cmFactory(cmAuthenticationRequestModel);

        $rootScope.$on('logout', function(){ self.reset() });
        $rootScope.$on('identity:switched', function(){ self.reset() });


        return self;
    }
]);
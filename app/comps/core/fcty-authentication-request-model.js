'use strict';

angular.module('cmCore')
.factory('cmAuthenticationRequestModel', [
    'cmObject', 'cmStateManagement', 'cmCrypt', 'cmUtil', 'cmAuth',
    'cmUserModel', 'cmLogger',
    function(cmObject, cmStateManagement, cmCrypt, cmUtil, cmAuth,
             cmUserModel, cmLogger){
        function authenticationRequestModel(requestData){
            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = new cmStateManagement(['outgoing','incoming']);

            this.id = undefined;
            this.created = undefined;
            this.encryptedTransactionSecret = undefined;
            this.signature = undefined;

            this.fromKeyId = undefined;
            this.fromKeyFingerprint = undefined;
            this.fromKey = {};

            this.toKeyId = undefined;
            this.toKeyFingerprint = undefined;
            this.toKey = {};

            function init(requestData){
                cmLogger.debug('cmAuthenticationRequestModel.init');

                if(!("id" in requestData)){
                    self.id = cmCrypt.hash(cmCrypt.random() + new Date());
                }
                self.importData(requestData);
            }

            this.importData = function(requestData){
                cmLogger.debug('cmAuthenticationRequestModel.importData');

                if(typeof requestData !== 'object'){
                    cmLogger.debug('authenticationRequestModel.importData:failed - no data!');
                    return this;
                }

                this.id = requestData.id || this.id;
                this.created = requestData.created || this.created;
                this.encryptedTransactionSecret = requestData.encryptedTransactionSecret || this.encryptedTransactionSecret;
                this.signature = requestData.signature || this.signature;
                this.fromKeyId = requestData.fromKeyId || this.fromKeyId;
                this.fromKeyFingerprint = requestData.fromKeyFingerprint || this.fromKeyFingerprint;
                this.toKeyId = requestData.toKeyId || this.toKeyId;
                this.toKeyFingerprint = requestData.toKeyFingerprint || this.toKeyFingerprint;

                return this;
            };

            this.exportKeyIdsForBulk = function(){
                return {key1:this.toKeyId, key2:this.fromKeyId};
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
                cmLogger.debug('cmAuthenticationRequestModel.verifyIncomingRequest');

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

                /**
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
                var checkFromKeyId = false;
                cmUserModel.data.identity.keys.forEach(function(key){
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
                        identityId: cmUserModel.data.identity.id,
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
                cmLogger.debug('cmAuthenticationRequestModel.verifyTransactionSecret');

                if(cmUtil.validateString(transactionSecret)){

                    if(cmCrypt.isTransactionSecretValid({
                        userInput: transactionSecret,
                        toKey: this.toKey,
                        encryptedTransactionSecret: this.encryptedTransactionSecret
                    })){

                        this.trigger('secret:verified');

                        return true;
                    }

                    return false;
                }
            };

            this.send = function(){
//                cmLogger.debug('cmAuthenticationRequestModel.send');

                if(this.verifyForm() !== false){
                    cmAuth.sendBroadcast({
                        name: 'authenticationRequest:start',
                        data: {
                            id: this.id,
                            identityId: cmUserModel.data.identity.id,
                            encryptedTransactionSecret: this.encryptedTransactionSecret,
                            signature: this.signature,
                            fromKeyId: this.fromKeyId,
                            fromKeyFingerprint: this.fromKeyFingerprint,
                            toKeyId: this.toKeyId,
                            toKeyFingerprint: this.toKeyFingerprint
                        }
                    }).then(
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

            this.sendVerified = function(){
                cmLogger.debug('cmAuthenticationRequestModel.sendVerified');

                if(this.state.is('incoming') && !this.state.is('finished')){
                    cmAuth.sendBroadcast({
                        name: 'authenticationRequest:verified',
                        data: {
                            id: this.id
                        }
                    }).then(
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
                cmLogger.debug('cmAuthenticationRequestModel.finish');

                if(this.state.is('outgoing') && !this.state.is('finished')){
                    cmUserModel.data.identity.load();

                    cmUserModel.data.identity.one('update:finished', function(){

                        cmUserModel.loadLocalKeys().forEach(function(key){
                            if(key.id == self.fromKeyId && (key.getFingerprint() === self.fromKeyFingerprint)){
                                self.fromKey = key;
                            }
                        });

                        cmUserModel.data.identity.keys.forEach(function(key){
                            if(key.id == self.toKeyId && (key.getFingerprint() === self.toKeyFingerprint)){
                                self.toKey = key;
                            }
                        });

                        if(self.toKey.verify(self.fromKey, cmUserModel.getTrustToken(self.fromKey, cmUserModel.data.identity.cameoId))){
                            cmUserModel.signPublicKey(self.toKey, self.toKeyFingerprint);

                            console.log('cmAuthenticationRequestModel.finish - after signPublicKey');
                        } else {
                            cmLogger.debug('Error - cmAuthenticationRequestModel.finish - verify fail!');
                        }

                    });
                }
            };

            init(requestData);

            this.on('secret:verified', function(){
                cmLogger.debug('cmAuthenticationRequestModel.on:secret:verified');

                if(self.state.is('incoming') && !self.state.is('finished')) {
                    cmUserModel.signPublicKey(this.fromKey, this.fromKeyFingerprint);
                }
            });

            cmUserModel.one('signatures:saved', function(){
                cmLogger.debug('cmAuthenticationRequestModel - cmUserModel.on:signatures:saved');
                console.log('cmAuthenticationRequestModel - cmUserModel.on:signatures:saved', self)

                if(self.state.is('incoming') && !self.state.is('finished')){
                    self.sendVerified();
                }
//
                if(self.state.is('outgoing') && !self.state.is('finished')){
                    console.log('knaller')
                    cmAuth.sendBroadcast({
                        name: 'signatures:updated',
                        data: {
                            id: cmUserModel.data.identity.id
                        }
                    }).finally(
                        function(){
                            self.trigger('request:finished');
                        }
                    );
                }

            });

            cmUserModel.on('signatures:cancel', function(){
                self.trigger('request:finished');
            });
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

        $rootScope.$on('logout', function(){
            self.reset()
        });

        return self;
    }
]);
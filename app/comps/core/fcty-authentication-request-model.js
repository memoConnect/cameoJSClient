'use strict';

angular.module('cmCore')
.factory('cmAuthenticationRequestModel', [
    'cmObject',
    'cmStateManagement',
    'cmCrypt',
    'cmUtil',
    'cmAuth',
    'cmUserModel',
    'cmLogger',
    function(cmObject, cmStateManagement, cmCrypt, cmUtil, cmAuth, cmUserModel, cmLogger){
        function authenticationRequestModel(requestData){
            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = new cmStateManagement(['outgoing','incoming']);

            this.id = undefined;
            this.created = undefined;
            this.encryptedTransactionSecret = undefined;
            this.signature = undefined;
            this.fromKeyId = undefined;
            this.toKeyId = undefined;

            function init(requestData){
                cmLogger.debug('cmAuthenticationRequestModel.init');

                self.importData(requestData);

//                self.trigger('init:finished');
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
                this.toKeyId = requestData.toKeyId || this.toKeyId;

//                this.trigger('update:finished', this);
                return this;
            };

            this.verifyIncomingRequest = function(){
                cmLogger.debug('cmAuthenticationRequestModel.verifyIncomingRequest');

                /**
                 * check request data
                 */
                if(typeof this.id != 'string' || !cmUtil.validateString(this.id)){
                    return false;
                }

                if(typeof this.signature != 'string' || this.signature.length < 1){
                    return false;
                }

                if(typeof this.encryptedTransactionSecret != 'string' || this.encryptedTransactionSecret.length < 1){
                    return false;
                }

                if(typeof this.fromKeyId != 'string' || !cmUtil.validateString(this.fromKeyId)){
                    return false;
                }

                if(typeof this.toKeyId != 'string' || !cmUtil.validateString(this.toKeyId)){
                    return false;
                }

                /**
                 * load localKeys
                 */
                var localKeys = cmUserModel.loadLocalKeys();
                var fromKey = {};

                /**
                 * verify toKeyId
                 */
                var checkToKeyId = false;
                localKeys.forEach(function(key){
                    if(key.id == self.toKeyId){
                        checkToKeyId = true;
                    }
                });

                if(!checkToKeyId){
                    return false;
                }

                /**
                 * verify fromKeyId
                 */
                var checkFromKeyId = false;
                cmUserModel.data.identity.keys.forEach(function(key){
                    if(key.id == self.fromKeyId){
                        checkFromKeyId = true;
                        fromKey = key;
                    }
                });

                if(!checkFromKeyId){
                    return false;
                }

                /**
                 * verify signature
                 */
                if(!cmCrypt.verify({
                        identityId: cmUserModel.data.identity.id,
                        fromKey: fromKey,
                        encryptedTransactionSecret: this.encryptedTransactionSecret,
                        signature: this.signature
                    })) {
                    return false;
                }

                return true;
            };

            this.verifyTransactionSecret = function(transactionSecret){
                cmLogger.debug('cmAuthenticationRequestModel.verifyTransactionSecret');

                if(cmUtil.validateString(transactionSecret)){
                    var localKeys = cmUserModel.loadLocalKeys();
                    var toKey = {};

                    localKeys.forEach(function(key){
                        if(key.id == self.toKeyId){
                            toKey = key;
                        }
                    });

                    if(cmCrypt.isTransactionSecretValid({
                            userInput: transactionSecret,
                            toKey: toKey,
                            encryptedTransactionSecret: this.encryptedTransactionSecret
                        })){
                        cmUserModel.signKey(this.toKeyId, this.fromKeyId);

                        return true;
                    }

                    return false;
                }
            };

            this.delete = function(){
                cmLogger.debug('cmAuthenticationRequestModel.delete');

                if(this.state.is('incoming')){
                    cmAuth.deleteAuthenticationRequest(this.id).then(
                        function(){
                            self.trigger('delete:finished');
                        },
                        function(){
                            cmLogger.debug('incomingAuthenticationRequest.finishRequest - deleteAuthenticationRequest Error');
                        }
                    )
                }
            };

            cmUserModel.on('signature:saved', function(){
                self.delete();
            });

            init(requestData);
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
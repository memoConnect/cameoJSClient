'use strict';

/**
 * @ngdoc service
 * @name cmUserModel
 * @description
 * MOEP Description
 *
 * @requires cmAuth
 * @requires cmLocalStorage
 * @requires cmIdentityFactory
 * @requires cmObject
 * @requires cmNotify
 * @requires cmLogger
 * @requires $rootScope
 * @requires $q
 * @requires $location
 *
 * @type {{isActive: boolean, id: string, userKey: string, displayName: string, cameoId: string, email: {}, phoneNumber: {}, preferredMessageType: string, created: string, lastUpdated: string, userType: string, storage: {}, identity: {}}}
 */

angular.module('cmCore')
.service('cmUserModel',[
    'cmBoot', 'cmAuth', 'cmLocalStorage', 'cmIdentityFactory', 'cmCrypt', 'cmKeyFactory',
    'cmObject', 'cmUtil', 'cmNotify', 'cmLogger',
    '$rootScope', '$q', '$location',
    function(cmBoot, cmAuth, cmLocalStorage, cmIdentityFactory, cmCrypt, cmKeyFactory,
             cmObject, cmUtil, cmNotify, cmLogger,
             $rootScope, $q, $location){
        var self = this,
            isAuth = false,
            initialize = ''; // empty, run, done ! important for isAuth check

        var dataModel = {
            isActive: false,
            id: '',
            userKey: '',
            displayName: '',
            cameoId: 'loading...',
            email: {},
            phoneNumber: {},
            preferredMessageType: 'default',
            created: '',
            lastUpdated: '',
            userType: '',
            storage: {},
            identity: {}
        };

        cmObject.addEventHandlingTo(this);

        this.data = angular.extend({}, dataModel);

        this.comesFromRegistration = false;

        /**
         * @ngdoc method
         * @methodOf cmUserModel
         *
         * @name init
         * @description
         * initialize the model with loading the identity
         *
         * @param {Object} identity_data JSON of an Identity
         * @returns {Object} this cmUserModel
         */
        function init(){
            self.loadIdentity();

            self.trigger('init');// deprecated
            self.trigger('init:finish');
        }

        this.importData = function(identity){
            angular.extend(this.data, identity);

            this.data.identity = identity;
            this.data.identity.isAppOwner = true;

            isAuth = true;
            this.initStorage();
            this.syncLocalKeys();

            /**
             * @todo!!! maybe stack im model
             */
            if('authenticationRequests' in identity){
                this.trigger('authenticationRequest:new', identity.authenticationRequests);
            };


            this.trigger('update:finished');

            return this;
        };

        /**
         * @name loadIdentity
         * @description create Identiy for cmUserModel
         * @param {Object|undefined} identity_data
         * @returns {*}
         */
        this.loadIdentity = function(identity_data){
            if(typeof identity_data !== 'undefined'){
                var identity = cmIdentityFactory.create(identity_data.id);

                identity.on('update:finished', function(event, data){
                    self.trigger('update:finished');
                });

                this.importData(identity);
            } else {
                if(this.getToken() !== false){
                    cmAuth.getIdentity().then(
                        function(data){
                            var identity = cmIdentityFactory.create(data);

                            identity.on('update:finished', function(event, data){
                                self.trigger('update:finished');
                            });

                            self.importData(identity);
                        },
                        function(r){
                            var response = r || {};

                            if(typeof response == 'object' && ('status' in response) && response.status == 401){
                                cmLogger.debug('cmUserModel:init:reject:401');
                                self.doLogout(true,'usermodl loadidentity reject');
                            }
                        }
                    );
                }
            }
        };

        /**
         * Returns current active Identity
         * @returns {data.identity|*}
         */
        this.getIdentity = function(){
            return this.data.identity;
        };

        this.setIdentity = function(identity_data){
            cmLogger.debug('cmUserModel:setIdentity');

            this.importData(cmIdentityFactory.clear(identity_data).create(identity_data, true));

            return this;
        };

        /**
         * @todo more better logic
         * @returns {*}
         */
        this.isAuth = function(){
//            if(this.getToken() !== false){
//                // do identity request for checking token
//                if(isAuth !== true){
//                    // check ob identity loading runs
//                    if(initialize == 'done'){
//
//                    }
//                }
//            }

            return this.getToken();
        };

        this.setAuth = function(){
            isAuth = true
        };

        this.isGuest = function(){
            if(this.data.userType == 'external'){
                return true;
            }

            return false;
        };

        this.doLogin = function(user, pass){
//            cmLogger.debug('cmUserModel:doLogin');

            var deferred = $q.defer();

            cmAuth.requestToken(user, pass).then(
                function(token){
                    cmAuth.storeToken(token);

                    self.loadIdentity();
                    $rootScope.$broadcast('login');
                    deferred.resolve();
                },
                function(state, response){
                    deferred.reject(state, response);
                }
            );

            return deferred.promise;
        };

        this.doLogout = function(goToLogin, where){
//            cmLogger.debug('cmUserModel:doLogout');

            isAuth = false;
            this.removeToken(where);
            $rootScope.$broadcast('logout');

            if(typeof goToLogin === 'undefined' || goToLogin !== false){
                $location.path("/login");
            }
        };

        /**
         * Key Handling
         */


        this.getLocalKeyIdsForRequest = function(){
            if(this.isAuth !== false){
                var keys = this.loadLocalKeys(),
                    queryString = '';

                if(keys.length > 0){
                    keys.forEach(function(key){
                        queryString += '&keyId=' + key.id;
                    });
                }

                return queryString;
            }

            return '';
        };

        this.hasLocalKeys = function(){
            var keys = this.loadLocalKeys();

            if(keys.length > 0)
                return true;

            return false;
        };

        /**
         * @param key
         * @returns {*}
         */
        this.storeKey = function(key){
            var local_keys      = this.loadLocalKeys() || new cmKeyFactory(),
                matching_key    = local_keys.find(key)

            if(matching_key && key.getPrivateKey())
                matching_key.setKey(key.getPrivateKey())
            else
                local_keys.create(key.exportData())


            this.storageSave('rsa', local_keys.exportDataArray());

            this.trigger('key:stored')

            return this;
        };

        this.loadLocalKeys = function(){
            var storedKeys  = this.storageGet('rsa') || [],
                keys        = cmKeyFactory();

            return keys.importFromDataArray(storedKeys)
        };

        this.hasPrivateKey = function(){
            var keys = this.loadLocalKeys(),
                result = false;

            keys.forEach(function(key){         
                result = result || !!key.getPrivateKey()
            });

            return result;
        };

        this.syncLocalKeys = function(keySize){
            /**
             * check local Keys from Storage
             */
            
            var localKeys = this.loadLocalKeys() || [];

            localKeys.forEach(function(local_key){

                var matchingPublicKeyPresent = self.data.identity.keys && self.data.identity.keys.find(local_key)

                if(!matchingPublicKeyPresent || !local_key.id){

                    if(local_key.getPublicKey() == undefined){
                        cmLogger.error('broken pubkey in localstorage! that can\'t be synced.');
                        return false;
                    }

                    cmAuth.savePublicKey({
                        name:    local_key.name, 
                        key:     local_key.getPublicKey(),
                        keySize: keySize || 0 //TODO: local_key.size == Nan ???
                    })
                    .then(function(data){
                        //data brings an id for the key
                        local_key.importData(data)

                        //add public key to identity
                        self.data.identity.keys.create(data)

                        //store the key with its new id:
                        self.storeKey(local_key)

                        // event for handshake modal
                        self.trigger('key:saved', local_key);
                    })
                }
            });

            return this;
        };

        this.removeKey = function(keyToRemoved){
            var self = this,
                keys = this.loadLocalKeys(),
                foundInLocalKeys = -1;

            // search in ls
            keys.forEach(function(key, index){
                if(key.id == keyToRemoved.id)
                    foundInLocalKeys = index;
            });

            // clear in backend
            cmAuth.removePublicKey(keyToRemoved.id)
                .then(function(){
                    // renew ls
                    if(foundInLocalKeys > -1) {
                        keys.splice(foundInLocalKeys, 1);
                        self.storageSave('rsa', keys);
                        self.trigger('key:removed')
                    }
                    // clear identity
                    self.data.identity.removeKey(keyToRemoved);
                });
        };

        this.signKey = function(localKeyId, signKeyId){
            cmLogger.debug('cmUserModel.signKey');

            var localKeys = this.loadLocalKeys();
            var key = localKeys.find(localKeyId);
            var signKey = this.data.identity.keys.find(signKeyId);

            var signature = key.sign(signKey.getPublicKeyForSigning(this.data.identity.id));

            if(typeof signature == 'string' && signature.length > 0){
                cmAuth.savePublicKeySignature(key.id, signKey.id, signature).then(
                    function(){
                        console.log('api call succcess - siganture save')
                        self.trigger('signature:saved');
                    },
                    function(){
                        self.trigger('signature:failed');
                    }
                )
            }
        };

        this.clearLocalKeys = function(){
            this.storageSave('rsa', []);
        };

        this.trustsKey = function(key){
            var local_keys = this.loadLocalKeys() || []

            return  local_keys.some(function(local_key){
                        return local_key.trusts(key)
                    })
        }

        this.decryptPassphrase = function(encrypted_passphrase, keyId){
            var keys = this.loadLocalKeys() || []

            return  keys.reduce(function(decrypted_passphrase, key){
                        return      decrypted_passphrase 
                                ||  ( (key.id == keyId || !keyId) && key.decrypt(encrypted_passphrase) )

                    }, undefined)
        };

        /**
         * Token Functions
         * @TODO handle Token with identity
         */
        this.getToken = function(){
            var token = cmAuth.getToken();
            if(token !== undefined && token !== 'undefined' && token !== null){
                return token;
            }

            return false;
        };

        this.storeToken = function(t){
            cmAuth.storeToken(t);
        };

        this.removeToken = function(where){
            cmLogger.debug('cmUserModel:removeToken');
            cmAuth.removeToken(where);
        };

        /**
         * LocalStorage Functions
         */
        this.initStorage = function(){
            this.data.storage = cmLocalStorage.create(this.data.id, this.data.userKey);
        };

        /**
         * save to identity storage
         * @param key
         * @param value
         */
        this.storageSave = function(key, value){
            if(isAuth !== false && this.data.storage !== null){
                this.data.storage.save(key, value);
            }
        };

        /**
         *  get from identity storage
         * @param key
         */
        this.storageGet = function(key){            
            if(isAuth !== false && this.data.storage !== null){
                return this.data.storage.get(key);
            }

            return null;
        };

        /**
         * remove from identity storage
         * @param key
         */
        this.storageRemove = function(key){
            if(isAuth !== false && this.data.storage !== null){
                this.data.storage.remove(key);
            }
        };

        /**
         * clear identity storage
         */
        this.resetUser = function(){
            this.data = angular.extend({}, dataModel);
        };

        /**
         * Handshake/Trust Handling
         */

        this.verifyAuthenticationRequest = function(request){
//            cmLogger.debug('cmUserModel.verifyAuthenticationRequest');
            if(typeof request == 'object' && cmUtil.objLen(request) > 0){

                /**
                 * check request data
                 */
                if(!("signature" in request) || typeof request.signature != 'string' || request.signature.length < 1){
                    return false;
                }

                if(!("encryptedTransactionSecret" in request) || typeof request.encryptedTransactionSecret != 'string' || request.encryptedTransactionSecret.length < 1){
                    return false;
                }

                if(!("fromKeyId" in request) || typeof request.fromKeyId != 'string' || !cmUtil.validateString(request.fromKeyId)){
                    return false;
                }

                if(!("toKeyId" in request) || typeof request.toKeyId != 'string' || !cmUtil.validateString(request.toKeyId)){
                    return false;
                }

                /**
                 * load localKeys
                 */
                var localKeys = this.loadLocalKeys();
                var fromKey = {};

                /**
                 * verify toKeyId
                 */
                var checkToKeyId = false;
                localKeys.forEach(function(key){
                   if(key.id == request.toKeyId){
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
                this.data.identity.keys.forEach(function(key){
                    if(key.id == request.fromKeyId){
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
                        identityId: this.data.identity.id,
                        fromKey: fromKey,
                        encryptedTransactionSecret: request.encryptedTransactionSecret,
                        signature: request.signature
                    })) {
                    return false;
                }

                return true;
            } else {
                cmLogger.debug('verifyAuthenticationRequest:failed');
            }

            return false;
        };


        /**
         * Event Handling
         */
        $rootScope.$on('logout', function(){
            self.resetUser();
        });

        this.on('update:finished', function(){
            cmBoot.resolve();
        });

        cmAuth.on('identity:updated', function(event, data){
            if(typeof data.id != 'undefined' && data.id == self.data.identity.id) {
                self.data.identity.importData(data);
            }
        });

        init();
    }
]);
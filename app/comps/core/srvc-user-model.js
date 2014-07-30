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
    'cmBoot', 'cmAuth', 'cmLocalStorage', 'cmIdentityFactory', 'cmCrypt', 'cmKeyFactory', 'cmKey', 'cmStateManagement',
    'cmObject', 'cmUtil', 'cmNotify', 'cmLogger',
    '$rootScope', '$q', '$location', '$timeout',
    function(cmBoot, cmAuth, cmLocalStorage, cmIdentityFactory, cmCrypt, cmKeyFactory, cmKey, cmStateManagement,
             cmObject, cmUtil, cmNotify, cmLogger,
             $rootScope, $q, $location, $timeout){
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
        this.state = new cmStateManagement(['signing'])

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

            local_keys.create(key.exportData(), true)

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

        this.syncLocalKeys = function(){
            /**
             * check local Keys from Storage
             */
            
            var localKeys = this.loadLocalKeys() || [];

            localKeys.forEach(function(local_key){

                var no_matching_public_key_present = !self.data.identity.keys || !self.data.identity.keys.find(local_key),
                    missing_key_id = !local_key.id



                if(no_matching_public_key_present || missing_key_id){

                    if(local_key.getPublicKey() == undefined){
                        cmLogger.error('broken pubkey in localstorage! that can\'t be synced.');
                        return false;
                    }

                    cmAuth.savePublicKey({
                        name:    local_key.name, 
                        key:     local_key.getPublicKey(),
                        keySize: local_key.getSize()
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

        this.removeKey = function(keyToRemove){
            var self            = this,
                local_keys      = this.loadLocalKeys(),
                foundInLocalKeys = -1;

            // clear in backend
            cmAuth
            .removePublicKey(keyToRemove.id)
            .then(function(){
                // renew ls
                if(local_keys.deregister(keyToRemove)){
                    self.storageSave('rsa', local_keys.exportDataArray());

                    self.trigger('key:removed')
                }
                // clear identity
                self.data.identity.keys.deregister(keyToRemove);
            });
        };

        this.signKey = function(localKeyId, signKeyId){
//            cmLogger.debug('cmUserModel.signKey');


            if(localKeyId == signKeyId) return null //keys should not sign themselves

            var localKeys   = this.loadLocalKeys();
            var signingKey  = localKeys.find(localKeyId);
            var keyToSign   = this.data.identity.keys.find(signKeyId);

            var signature   = signingKey.signKey(keyToSign);

            if(typeof signature == 'string' && signature.length > 0){
                cmAuth.savePublicKeySignature(signingKey.id, keyToSign.id, signature).then(
                    function(signature){
                        self.data.identity.keys.find(keyToSign.id).importData({signatures:[signature]})
                        self.trigger('signature:saved', {signingKey : signingKey, keyToSign: keyToSign});
                    },
                    function(){
                        self.trigger('signature:failed');
                    }
                )
            }

            return this;
        };

        this.clearLocalKeys = function(){
            this.storageSave('rsa', []);
        };

        this.trustsKey = function(key){
            var local_keys = this.loadLocalKeys() || []

            return  local_keys.some(function(local_key){
                        return local_key.trusts(key)
                    })
        };

        this.decryptPassphrase = function(encrypted_passphrase, keyId){
            var keys = this.loadLocalKeys() || []

            return  keys.reduce(function(decrypted_passphrase, key){
                        return      decrypted_passphrase 
                                ||  ( (key.id == keyId || !keyId) && key.decrypt(encrypted_passphrase) )

                    }, undefined)
        };

        this.bulkReKeying = function(localKeyId, newKeyId){
//            cmLogger.debug('cmUserModel.startBulkReKeying');

            if(!this.state.is('rekying')){
                this.state.set('rekying');

                if(typeof localKeyId == 'string' && cmUtil.validateString(localKeyId)
                    && typeof newKeyId == 'string' && cmUtil.validateString(newKeyId))
                {
                    console.log()


                    var localKey = this.loadLocalKeys().find(localKeyId);
                    var newKey = this.data.identity.keys.find(newKeyId);

                    console.log('localKey', localKey)
                    console.log('newKey', newKey)

                    if(localKey instanceof cmKey && newKey instanceof cmKey){
                        cmAuth.getBulkPassphrases(localKey.id, newKey.id).then(
                            function(list){
                                var newList = [],
                                    i = 0;

                                while(i < list.length){
                                    var passphrase = self.decryptPassphrase(list[i].aePassphrase, localKey.id);
                                    if(cmUtil.validateString(passphrase)){
                                        newList.push({conversationId: list[i].conversationId, aePassphrase: newKey.encrypt(passphrase)})
                                    }
                                    passphrase = undefined;
                                    i++;
                                }

                                if(newList.length > 0){
                                    cmAuth.saveBulkPassphrases(newKey.id, newList).then(
                                        function(){
//                                            self.trigger('bulkrekeying:finished');
                                        },
                                        function(){
                                            cmLogger.debug('cmUserModel.bulkReKeying - Request Error - saveBulkPassphrases');
                                        }
                                    ).finally(
                                        function(){
                                            self.trigger('bulkrekeying:finished');
                                            self.state.unset('rekying');
                                        }
                                    );
                                } else {
                                    self.trigger('bulkrekeying:finished');
                                    self.state.unset('rekying');
                                }
                            },function(){
                                cmLogger.debug('cmUserModel.bulkReKeying - Request Error - getBulkPassphrases');
                            }
                        ).finally(
                            function(){
                                self.trigger('bulkrekeying:finished');
                                this.state.unset('rekying');
                            }
                        );
                    } else {
                        cmLogger.debug('cmUserModel.bulkReKeying - Key Error - getBulkPassphrases');
                        self.trigger('bulkrekeying:finished');
                        this.state.unset('rekying');
                    }
                } else {
                    cmLogger.debug('cmUserModel.bulkReKeying - Parameter Error - getBulkPassphrases');
                    self.trigger('bulkrekeying:finished');
                    this.state.unset('rekying');
                }
            }
        };

        this.verifyHandshake = function(toKey){
            //var privateKeys  = self.loadLocalKeys() || [],
//            var publicKeys = self.data.identity.keys.filter(function(key){
//                return (privateKeys.find(key) == null && key != fromKey);
//            });
            var publicKeys = self.data.identity;

//            return  fromKey instanceof cmKey && // is a cmKey
//                    fromKey.getPrivateKey() != undefined && // the privateKey of cmKey != undefined
                return publicKeys.length > 0 // show only if more then 1 publicKey exists
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

        this.signOwnKeys = function(){
            if(!this.data.identity.keys)
                return null;

            self.state.set('signing');

            var local_keys       = this.loadLocalKeys(),
                ttrusted_keys    = this.data.identity.keys.getTransitivelyTrustedKeys(local_keys);
                
            var stack = [];

            local_keys.forEach(function(local_key){
                ttrusted_keys.forEach(function(ttrusted_key){

                    var no_signature_present =  !ttrusted_key.signatures.some(function(signature){
                                                    return signature.keyId == local_key.id
                                                });

                    if(no_signature_present && local_key.id  != ttrusted_key.id)
                        stack.push(function(){ self.signKey(local_key.id, ttrusted_key.id) })

                })
            });

            function stack_advance(){
                var callback = stack.pop()

                if(callback) callback()

                if(stack.length != 0){
                    $timeout(stack_advance, 200)
                }else{
                    self.state.unset('signing')
                }
                
            }

            stack_advance();

            return self
        };

        init();

        /**
         * Event Handling
         */
        $rootScope.$on('logout', function(){
            self.resetUser();
        });

        this.on('update:finished', function(){  
            //Todo: tets sollte nicht nötig sein
            if(self.data.identity.key && typeof self.data.identity.on)
                self.signOwnKeys()       

            cmBoot.resolve();
        });


        cmAuth.on('identity:updated', function(event, data){
            if(typeof data.id != 'undefined' && data.id == self.data.identity.id) {
                self.data.identity.importData(data);
            }
        });

    }
]);
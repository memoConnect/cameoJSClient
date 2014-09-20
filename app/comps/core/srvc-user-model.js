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
    'cmBoot',
    'cmAuth',
    'cmLocalStorage',
    'cmIdentityFactory',
    'cmIdentityModel',
    'cmFactory',
    'cmCrypt',
    'cmKeyFactory',
    'cmKey',
    'cmStateManagement',
    'cmObject',
    'cmUtil',
    'cmNotify',
    'cmLogger',
    'cmCallbackQueue',
    'cmPushNotificationAdapter',
    '$rootScope',
    '$q',
    '$location',
    function(cmBoot, cmAuth, cmLocalStorage, cmIdentityFactory, cmIdentityModel, cmFactory,
             cmCrypt, cmKeyFactory, cmKey, cmStateManagement, cmObject, cmUtil,
             cmNotify, cmLogger, cmCallbackQueue, cmPushNotificationAdapter,
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
            identity: {},
            identities: []
        };

        cmObject.addEventHandlingTo(this);

        this.data = angular.extend({}, dataModel);
        this.state = new cmStateManagement(['signing']);

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

            self.one('update:finished', function(){
                if(self.data.identity.keys){
                    self.signOwnKeys();
                    return true;
                }else{
                    return false;
                }
            });
        }

        this.importData = function(activeIdentity, data_identities){
            angular.extend(this.data, activeIdentity);

            this.data.identity = activeIdentity;
            this.data.identity.isAppOwner = true;
            // new factory for own identities

            /**
             * @todo may an own factory but not a new identityFactory!
             */
            if(this.data.identities.length > 0)
                this.data.identities = [];

            this.data.identities.push(activeIdentity);
            data_identities.forEach(function(identity){
                if(identity.id != self.data.identity.id){
                    var tmpIdentity = cmIdentityFactory.clear(identity).create(identity);
                    tmpIdentity.on('update:finished', function(){
                       cmUserModel.trigger('identity:updated');
                    });
                    self.data.identities.push(tmpIdentity);
                }

            });

            isAuth = true;
            this.initStorage();
            this.syncLocalKeys();

            this.trigger('update:finished');

            return this;
        };

        /**
         * @name loadIdentity
         * @description create Identiy for cmUserModel
         * @param {Object|undefined} identity_data
         * @returns {*}
         */
        this.loadIdentity = function(accountData){
            //cmLogger.debug('cmUserModel:loadIdentity');

            var deferred = $q.defer();
            // for login
            function importAccount(accountData){
                if(typeof accountData !== 'undefined' && 'identities' in accountData){
                    var arr_activeIdentity = accountData.identities.filter(function(identity){
                        return identity.active == true;
                    });

                    var identity = cmIdentityFactory.clear(arr_activeIdentity[0]).create(arr_activeIdentity[0], true);

                    identity.on('update:finished', function(event, data){
                        self.trigger('update:finished');
                    });

                    self.importData(identity, accountData.identities);

                    // handle account data
                    // TODO: set account data

                    // check device for pushing
                    cmPushNotificationAdapter.checkRegisteredDevice(accountData.pushDevices);

                    return true;
                }

                return false;
            }
            // for purl
            function importIdentity(identity_data){
                if(typeof identity_data == 'object'){

                    var identity = cmIdentityFactory.clear(identity_data).create(identity_data, true);

                    identity.on('update:finished', function(event, data){
                        self.trigger('update:finished');
                    });

                    self.importData(identity, []);

                    return true;
                }

                return false;
            }

            if(typeof accountData !== 'undefined' && 'identities' in accountData){
                if(importAccount(accountData)){
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            } else {
                if(this.getToken() !== false){
                    /**
                     * @todo hack for external user in purl
                     */
                    if($location.$$path.search('/purl') != -1){
                        //console.log($location.$$path)
                        cmAuth.getIdentity().then(
                            function (data) {
                                if (importIdentity(data)) {
                                    deferred.resolve();
                                } else {
                                    deferred.reject();
                                }
                            },
                            function (r) {
                                var response = r || {};

                                if (typeof response == 'object' && ('status' in response) && response.status == 401) {
                                    cmLogger.debug('cmUserModel:init:reject:401');
                                    self.doLogout(true, 'usermodel load identity reject');
                                }

                                deferred.reject();
                            }
                        )
                    } else {
                        $rootScope.$broadcast('appSpinner','show');
                        cmAuth.getAccount().then(
                            function (data) {
                                if (importAccount(data)) {
                                    deferred.resolve();
                                } else {
                                    deferred.reject();
                                }
                            },
                            function (r) {
                                var response = r || {};
                                if('status' in response){
                                    switch(response.status){
                                        case 0:
                                            cmLogger.debug('cmUserModel:init:failed:0');
                                            $rootScope.$broadcast('connection:failed', function(){
                                                //console.log('reconnect!!!');
                                                self.loadIdentity(accountData);
                                            });
                                            return false;
                                        break;
                                        case 401:
                                            cmLogger.debug('cmUserModel:init:reject:401');
                                            self.doLogout(true, 'usermodel load identity reject');
                                        break;
                                    }
                                }

                                deferred.reject();
                            }
                        );
                    }
                }
            }

            return deferred.promise;
        };

        /**
         * Returns current active Identity
         * @returns {data.identity|*}
         */
        this.getIdentity = function(){
            //cmLogger.debug('cmUserModel:getIdentity');

            return this.data.identity;
        };

        this.setIdentity = function(identity_data){
            //cmLogger.debug('cmUserModel:setIdentity');

            this.importData(cmIdentityFactory.clear(identity_data).create(identity_data, true),[]);

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

        this.doLogin = function(user, pass, accountData){
//            cmLogger.debug('cmUserModel:doLogin');

            var deferred = $q.defer();

            cmAuth.requestToken(user, pass).then(
                function(token){
                    cmAuth.storeToken(token);

                    self.loadIdentity(accountData).finally(
                        function(){
                            deferred.resolve();
                        }
                    );
                    $rootScope.$broadcast('login');
                },
                function(state, response){
                    deferred.reject(state, response);
                }
            );

            return deferred.promise;
        };

        this.doLogout = function(goToLogin, where){
            //cmLogger.debug('cmUserModel:doLogout');

            $rootScope.$broadcast('logout', {
                token:this.getToken(),
                goToLogin: goToLogin,
                where: where
            });
        };

        this.switchToIdentity = function(identity, identityToken){
           // cmLogger.debug('cmUserModel:switchToIdentity');

            function doSwitch(newToken){
                self.storeToken(newToken, true);
                $rootScope.$broadcast('identity:switched');
            }

            if(identityToken){
                doSwitch(identityToken);
            } else {
                cmAuth.getIdentityToken(identity.id).then(
                    function (res) {
                        doSwitch(res.token);
                    }
                );
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
                matching_key    = local_keys.find(key);

            local_keys.create(key.exportData(), true);

            this.storageSave('rsa', local_keys.exportDataArray());

            this.trigger('key:stored');

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
                        self.trigger('key:saved', {keyId: data.id});
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
                }
                // clear identity
                self.data.identity.keys.deregister(keyToRemove);

                self.trigger('key:removed');
            });
        };

        /**
         * [getTrustToken description]
         * Used to sign a trusted key with!
         * @param  {[type]} keyToTrust [description]
         * @param  {[type]} ownerId    [description]
         * @return {[type]}            [description]
         */
        this.getTrustToken = function(keyToTrust, ownerId){
            //cmLogger.debug('cmUserModel.getTrustToken');
            var dataObject =    {
                                    pubKey: keyToTrust.getPublicKey(),
                                    identifier: ownerId
                                }
            return  cmCrypt.hashObject(dataObject)
        };

        this.signPublicKey = function(keyToSign, keyToSignFingerprint, identity){
            cmLogger.debug('cmUserModel.signPublicKey');

            identity = identity || self.data.identity

            var deferred    = $q.defer(),
                rejected    = deferred.promise

            deferred.reject()

            if(!(keyToSign instanceof cmKey) || (keyToSign.getFingerprint() !== keyToSignFingerprint)){
                self.trigger('signatures:cancel');
                return rejected;
            }

            var localKeys   = this.loadLocalKeys(),
                promises    = [];

            localKeys.forEach(function(signingKey){
                //Keys should not sign themselves
                if(signingKey.id == keyToSign.id && (signingKey.getFingerprint() === keyToSign.getFingerprint())){
                    self.trigger('signatures:cancel');
                    cmLogger.debug('cmUserModel.signPublicKey() failed; key tried to sign itself.')
                    return false;
                }

                //Dont sign twice:
                if(keyToSign.signatures.some(function(signature){ return signature.keyId == signingKey.id })){
                    self.trigger('signatures:cancel');
                    cmLogger.debug('cmUserModel.signPublicKey() failed; dublicate signature.')
                    return false; 
                }

                //Content of the signature:
                var signature  =  signingKey.sign(self.getTrustToken(keyToSign, identity.cameoId));

                
                promises.push(
                    cmAuth.savePublicKeySignature(signingKey.id, keyToSign.id, signature).then(
                        function(signature){
                            keyToSign.importData({signatures:[signature]})  
                            return signature                          
                        },
                        function(){
                            self.trigger('signatures:failed');
                        }
                    )
                )
            });

            if(promises.length == 0){
                self.trigger('signature:cancel');
                return rejected; 
            }

            return  $q.all(promises).then(
                        function(result){
                            self.trigger('signatures:saved', result)
                            return result
                        }
                    );
        };

        this.verifyOwnPublicKey = function(key){
            // cmLogger.debug('cmUserModel.verifyOwnPublicKey');

            var local_keys = this.loadLocalKeys();

            return local_keys.some(function(local_key){
                return  (local_key.getPrivateKey() && local_key.getPublicKey() == key.getPublicKey()) //local keys are always considered own keys.
                        ||
                        local_key.verifyKey(key, self.getTrustToken(key, self.data.identity.cameoId))
            })
        };

        this.signOwnKeys = function(){
            // cmLogger.debug('cmUserModel.signOwnKeys');
            return this.verifyIdentityKeys(this.data.identity, true)
        }

        /**
         * [verifyIdentityKeys Checks for keys that are either signed by a local key or keys that are signed by a key of the former kind and have the same owner]
         * @param  {cmIdentitymodel} identity [description]
         * @return {cmKeyFactory}   cmKeyFactory returning all transitively trusted keys of identity. Users local keys are assumed to be trusted.
         */
        this.verifyIdentityKeys = function(identity, sign){
            //cmLogger.debug('cmUserModel.verifyIdentityKeys');

            //console.log(identity.cameoId)

            if(!identity.keys)
                return [];

            var local_keys              =   this.loadLocalKeys(),
                own_ttrusted_keys       =   self.data.identity.keys.getTransitivelyTrustedKeys(local_keys, function trust(trusted_key, key){
                                                return trusted_key.verifyKey(key, self.getTrustToken(key, self.data.identity.cameoId))
                                            });


            var ttrusted_keys           =   identity.keys.getTransitivelyTrustedKeys(own_ttrusted_keys, function trust(trusted_key, key){
                                                return trusted_key.verifyKey(key, self.getTrustToken(key, identity.cameoId))
                                            });
               

            var unsigned_ttrusted_keys  =   ttrusted_keys.filter(function(ttrusted_key){
                                                return  local_keys.some(function(local_key){
                                                            return  ttrusted_key.signatures.every(function(signature){
                                                                        return signature.keyId != local_key.id
                                                                    })
                                                        })
                                            });

            if(sign != true || unsigned_ttrusted_keys.length == 0)
                return ttrusted_keys;

            this.state.set('signing');

            cmCallbackQueue.push(
                unsigned_ttrusted_keys.map(function(ttrusted_key){
                    return function(){ self.signPublicKey(ttrusted_key, ttrusted_key.getFingerprint(), identity) }
                })
            )
            .finally(function(){
                 self.state.unset('signing')
            });

            return ttrusted_keys
        };

        this.verifyTrust = function(identity){
            return      identity.keys.length > 0
                    &&  identity.keys.length == this.verifyIdentityKeys(identity, true).length //true: sign keys if needed 
        };

        this.clearLocalKeys = function(){
            this.storageSave('rsa', []);
        };

        this.decryptPassphrase = function(encrypted_passphrase, keyId){
            var keys = this.loadLocalKeys() || []

            return  keys.reduce(function(decrypted_passphrase, key){
                        return      decrypted_passphrase 
                                ||  ( (key.id == keyId || !keyId) && key.decrypt(encrypted_passphrase) )

                    }, undefined)
        };

        this.bulkReKeying = function(localKeyId, newKeyId){
            cmLogger.debug('cmUserModel.startBulkReKeying');

            if(!this.state.is('rekeying')){
                this.state.set('rekeying');

                if(typeof localKeyId == 'string' && cmUtil.validateString(localKeyId)
                    && typeof newKeyId == 'string' && cmUtil.validateString(newKeyId))
                {
                    var localKey = this.loadLocalKeys().find(localKeyId);
                    var newKey = this.data.identity.keys.find(newKeyId);

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
                                            cmAuth.sendBroadcast({
                                                name: 'rekeying:finished',
                                                data:{
                                                    keyId: newKey.id
                                                }
                                            });
                                        },
                                        function(){
                                            cmLogger.debug('cmUserModel.bulkReKeying - Request Error - saveBulkPassphrases');
                                        }
                                    ).finally(
                                        function(){
                                            self.trigger('bulkrekeying:finished');
                                            self.state.unset('rekeying');
                                        }
                                    );
                                } else {
                                    self.trigger('bulkrekeying:finished');
                                    self.state.unset('rekeying');
                                }
                            },function(){
                                cmLogger.debug('cmUserModel.bulkReKeying - Request Error - getBulkPassphrases');
                            }
                        ).finally(
                            function(){
                                self.trigger('bulkrekeying:finished');
                                self.state.unset('rekeying');
                            }
                        );
                    } else {
                        cmLogger.debug('cmUserModel.bulkReKeying - Key Error - getBulkPassphrases');
                        self.trigger('bulkrekeying:finished');
                        self.state.unset('rekeying');
                    }
                } else {
                    cmLogger.debug('cmUserModel.bulkReKeying - Parameter Error - getBulkPassphrases');
                    this.trigger('bulkrekeying:aborted');
                    this.state.unset('rekeying');
                }
            }
        };

        this.verifyPublicKeyForAuthenticationRequest = function(toKey, identity){
            identity = identity || self.data.identity

            var publicKeys = identity.keys;
            var localKeys = this.loadLocalKeys();


            return      toKey instanceof cmKey
                    &&  publicKeys.find(toKey) != null 
                    &&  localKeys.length > 0 
                    &&  localKeys.find(toKey) == null
        };

        /**
         * Token Functions
         * @TODO handle Token with identity
         */
        this.getToken = function(){
            //cmLogger.debug('cmUserModel:getToken');

            var token = cmAuth.getToken();


            if(token !== undefined && token !== 'undefined' && token !== null && token.length > 0){
                return token;
            }

            return false;
        };

        this.storeToken = function(token, force){
            //cmLogger.debug('cmUserModel:storeToken');
            cmAuth.storeToken(token, force);

            return this;
        };

        this.removeToken = function(where){
            //cmLogger.debug('cmUserModel:removeToken');
            cmAuth.removeToken(where);

            return this;
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
            this.data.identities = [];
            this.data = angular.extend({}, dataModel);
        };

        init();

        /**
         * Event Handling
         */
        $rootScope.$on('logout', function(event, data){
            //cmLogger.debug('cmUserModel - $rootScope.logout');

            self.resetUser();
            isAuth = false;

            if(typeof data == 'object' && 'where' in data){
                self.removeToken(data.where);
            } else {
                self.removeToken();
            }

            if(typeof data == 'object' && 'goToLogin' in data && typeof data.goToLogin === 'undefined' || data.goToLogin !== false){
                $rootScope.goTo('/login');
            }
        });

        $rootScope.$on('identity:switched', function(){
            self.resetUser();
            init();
            self.one('update:finished', function(){
                if(!self.hasLocalKeys()){
                    $rootScope.goTo('/start/keyinfo');
                } else {
                    $rootScope.goTo('/talks');
                }
            });
        });

        this.on('update:finished', function(){
            cmBoot.resolve();
        });

        cmAuth.on('identity:updated signatures:updated', function(event, data){
            if(typeof data.id != 'undefined' && data.id == self.data.identity.id) {
                self.data.identity.importData(data);
            }
        });

    }
]);
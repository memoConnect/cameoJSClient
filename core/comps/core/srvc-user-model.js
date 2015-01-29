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
    'cmBoot', 'cmAuth', 'cmLocalStorage', 'cmIdentityFactory', 'cmIdentityModel', 'cmFactory',
    'cmCrypt', 'cmKeyFactory', 'cmKey', 'cmStateManagement', 'cmObject', 'cmUtil',
    'cmNotify', 'cmLogger', 'cmCallbackQueue', 'cmPushNotificationAdapter', 'cmApi',
    '$rootScope', '$q', '$location', '$timeout', 'cmMigrate', 'cmPhonegap',
    function(cmBoot, cmAuth, cmLocalStorage, cmIdentityFactory, cmIdentityModel, cmFactory,
             cmCrypt, cmKeyFactory, cmKey, cmStateManagement, cmObject, cmUtil,
             cmNotify, cmLogger, cmCallbackQueue, cmPushNotificationAdapter, cmApi,
             $rootScope, $q, $location, $timeout, cmMigrate, cmPhonegap){

        var self = this,
            isAuth = false,
            initialize = ''; // empty, run, done ! important for isAuth check

        cmObject.addEventHandlingTo(this);

        this.reset = function(){
            this.data = {
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
                identities: [],
                account: {}
            };
        }

        this.reset();

        this.state = new cmStateManagement(['signing']);

        //this.comesFromRegistration = false;

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
            //console.log('activeIdentity', activeIdentity)

            this.data.identity = activeIdentity;
            this.data.identity.isAppOwner = true;
            this.data.id = activeIdentity.id || this.data.id;
            this.data.userKey = activeIdentity.userKey || this.data.userKey;
            this.data.userType = activeIdentity.userType || this.data.userType;

            // todo may an own factory but not a new identityFactory!
            if(this.data.identities.length > 0)
                this.data.identities = [];

            this.data.identities.push(activeIdentity);
            data_identities.forEach(function(identity){
                if(identity.id != self.data.identity.id){
                    var tmpIdentity = cmIdentityFactory.clear(identity).create(identity);
                    tmpIdentity.on('update:finished', function(){
                        /* we have to trigger an other event identity:updated is an backend event */
                       /*cmUserModel.trigger('identity:updated');*/
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

                    //identity.on('update:finished', function(event, data){
                    //    self.trigger('update:finished');
                    //});

                    self.importData(identity, accountData.identities);
                    self.importAccount(accountData);
                    self.setAppSettings(accountData);

                    // check device for pushing
                    cmPushNotificationAdapter.checkRegisteredDevice();

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
                                            $rootScope.$broadcast('cmConnectionHandler:failed', function(){
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
                } else {
                    // migrate crosswalk
                    cmPhonegap.isReady('cmUserModel', function(){
                        cmMigrate.migrateLocalStorage().then(function(values){
                                cmLogger.debug("Local storage migration. Writing old values to new local storage")
                                for (var key in values) {
                                    try {
                                        window.localStorage.setItem(key, values[key])
                                    } catch(e) {
                                        cmLogger.error("Error writing to local storage: " + e)
                                    }
                                }
                                // reload app, to reinitialize storage. TODO: find a way to do this without reload
                                location.reload()

                            }, function(reason) {
                                cmLogger.error("Could not migrate local storage: " + reason)
                            }
                        )
                    });
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

        this.getAccount = function(){
            return this.data.account;
        };

        this.importAccount = function(data){
            //cmLogger.debug('cmUserModel.importAccount');

            this.data.account.loginName = data.loginName || this.data.account.loginName;

            if(typeof data.email != 'string') {
                this.data.account.email = data.email || this.data.account.email;
            } else {
                this.data.account.email = {value:data.email,isVerified:false};
            }

            if(typeof data.phoneNumber != 'string') {
                this.data.account.phoneNumber = data.phoneNumber || this.data.account.phoneNumber;
            } else {
                this.data.account.phoneNumber = {value:data.phoneNumber,isVerified:false};
            }

            this.trigger('account:updated');
        };

        /**
         * @TODO add Error Codes in BE
         * - invalid phoneNumber
         */
        this.updateAccount = function(newAccountData){
            //cmLogger.debug('cmUserModel.updateAccount');
            var deferred = $q.defer();

           cmAuth.putAccount(newAccountData).then(
                function(){
                    self.importAccount(newAccountData);
                    deferred.resolve();
                },
               function(result){
                    deferred.reject(result);
               }
            );

            return deferred.promise;
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
                    cmAuth.storeToken(token, true);

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
            //cmLogger.debug('cmUserModel:doLogout',where);

            $rootScope.$broadcast('logout', {
                token:this.getToken(),
                goToLogin: goToLogin,
                where: where
            });
        };

        this.switchToIdentity = function(identity, identityToken){
            //cmLogger.debug('cmUserModel:switchToIdentity');
            //console.log('new identity', identity.getDisplayName())

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
            var local_keys      = this.loadLocalKeys() || new cmKeyFactory()

            local_keys.create(key.exportData(), true);

            this.storageSave('rsa', local_keys.exportDataArray());

            this.trigger('key:stored');

            return this;
        };

        this.loadLocalKeys = function(){
            var storedKeys  = this.storageGet('rsa') || [],
                keys        = cmKeyFactory();

            var returnKeys = keys.importFromDataArray(storedKeys)

            return returnKeys
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
                    .then(
                        function(data){
                            //data brings an id for the key
                            local_key.importData(data)

                            //add public key to identity
                            self.data.identity.keys.create(data)

                            //store the key with its new id:
                            self.storeKey(local_key)

                            // event for handshake modal
                            self.trigger('key:saved', {keyId: data.id});
                        },
                        function(){
                            self.removeLocalKey(local_key);
                        }
                    )
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
                self.removeLocalKey(keyToRemove);
            });
        };

        this.removeLocalKey = function(keyToRemove){
            var local_keys = this.loadLocalKeys();
            // renew ls
            if(local_keys.deregister(keyToRemove)){
                this.storageSave('rsa', local_keys.exportDataArray());
            }
            // clear identity
            this.data.identity.keys.deregister(keyToRemove);

            this.trigger('key:removed');
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

        this.signData = function(data){
            return  $q.all(this.loadLocalKeys().map(function(signingKey){                
                        return  signingKey.sign(data)
                                .then(function(signature){
                                    return  $q.when({
                                                keyId   : signingKey.id,
                                                content : signature 
                                            })
                                })
                    }))
        }

        this.signPublicKey = function(keyToSign, keyToSignFingerprint, identity){
            //cmLogger.debug('cmUserModel.signPublicKey');

            identity = identity || self.data.identity

            if(!(keyToSign instanceof cmKey) || (keyToSign.getFingerprint() !== keyToSignFingerprint)){
                self.trigger('signatures:cancel');
                return $q.reject();
            }

            var localKeys = this.loadLocalKeys();

            return  $q.all(localKeys.map(function(signingKey){
                        // Keys should not sign themselves
                        if(!signingKey.id || signingKey.id == keyToSign.id || (signingKey.getFingerprint() == keyToSign.getFingerprint())){
                            self.trigger('signatures:cancel');
                            //cmLogger.debug('cmUserModel.signPublicKey() failed; key tried to sign itself.')
                            return $q.when(false);
                        }

                        // Dont sign twice:
                        if(keyToSign.signatures.some(function(signature){ return signature.keyId == signingKey.id })){
                            self.trigger('signatures:cancel');
                            //cmLogger.debug('cmUserModel.signPublicKey() failed; dublicate signature.')
                            return $q.when(false); 
                        }

                        cmLogger.debug('cmUserModel.signPublicKey: signing...')

                        return signingKey.sign(self.getTrustToken(keyToSign, identity.cameoId))
                                .then(function(signature){
                                    return cmAuth.savePublicKeySignature(signingKey.id, keyToSign.id, signature)
                                })
                                .then(
                                    function(signature){
                                        keyToSign.importData({signatures:[signature]})  
                                        return signature                          
                                    },
                                    function(){
                                        self.trigger('signatures:failed');
                                    }
                                )
                    }))
                    .then(function(result){
                        self.trigger('signatures:saved', result)
                    })
        };

        this.verifyOwnPublicKey = function(key){
            // cmLogger.debug('cmUserModel.verifyOwnPublicKey');

            return this.loadLocalKeys().reduce(function(previous_try, local_key){
                return  previous_try
                        .catch(function(){
                            return  local_key.verifyKey(key, self.getTrustToken(key, self.data.identity.cameoId))
                        })
            }, $q.reject())
        };

        this.signOwnKeys = function(){
            //cmLogger.debug('cmUserModel.signOwnKeys');
            return this.verifyIdentityKeys(this.data.identity, true)
        };

        /**
         * [verifyIdentityKeys Checks for keys that are either signed by a local key or keys that are signed by a key of the former kind and have the same owner as the signing key]
         * @param  {cmIdentitymodel} identity [description]
         * @return {cmKeyFactory}   cmKeyFactory returning all transitively trusted keys of identity. Users local keys are assumed to be trusted.
         */

        this.verifyIdentityKeys = function(identity, sign, use_cache){
            //cmLogger.debug('cmUserModel.verifyIdentityKeys');

            identity            = identity || self.data.identity;
            var own_identity    = self.data.identity;

            if(sign && use_cache){
                cmLogger.error('Tried to sign keys relying on cache.')
                throw('Tried to sign keys relying on cache.')
            }

            if(!identity.keys)
                return $q.when([])

            if(!own_identity.keys)
                return $q.when([])

            var local_keys = this.loadLocalKeys();

            return  $q.when()
                    .then(function(){
                        return  own_identity.keys.getTransitivelyTrustedKeys(local_keys, function trust(trusted_key, key){
                                    return trusted_key.verifyKey(key, self.getTrustToken(key, own_identity.cameoId), use_cache)
                                })
                    })
                    .then(function(own_ttrusted_keys){
                        return  identity.keys.getTransitivelyTrustedKeys(own_ttrusted_keys, function trust(trusted_key, key){
                                    return trusted_key.verifyKey(key, self.getTrustToken(key, identity.cameoId), use_cache)
                                });
                    })
                    .then(function(ttrusted_keys){


                        //looks for keys that are transitively trusted but not yet signed by all local keys:
                        var unsigned_ttrusted_keys  =   ttrusted_keys.filter(function(ttrusted_key){
                                                            return  local_keys.some(function(local_key){
                                                                        return  ttrusted_key.signatures.every(function(signature){
                                                                                    return signature.keyId != local_key.id
                                                                                })
                                                                    })
                                                        });


                        if(sign != true || unsigned_ttrusted_keys.length == 0)
                            return $q.when(ttrusted_keys);

                        self.state.set('signing');

                        $q.all(
                            unsigned_ttrusted_keys.map(function(ttrusted_key){
                                //console.info('signing: '+ttrusted_key.name)
                                return  self.data.identity == own_identity
                                        ?   self.signPublicKey(ttrusted_key, ttrusted_key.getFingerprint(), identity)
                                        :   $q.reject('cmUserModel: wrong identity tries to sign verified keys!')
                            })
                        )
                        .finally(function(){
                             self.state.unset('signing')
                        });

                        return $q.when(ttrusted_keys)
                    })
        };

        this.verifyTrust = function(identity, use_cache){
            return  identity.keys.length != 0
                    ?   this.verifyIdentityKeys(identity, null, use_cache)
                        .then(function(trusted_keys){
                            return  identity.keys.length == trusted_keys.length
                                    ?   $q.when()
                                    :   $q.reject('untrusted key found.')
                        })
                    :  $q.reject('missing keys.')
        };

        this.clearLocalKeys = function(){
            this.storageSave('rsa', []);
        };

        this.decryptPassphrase = function(encrypted_passphrase, keyId){
            var keys    =   this.loadLocalKeys().filter(function(key){
                                return (!keyId || key.id == keyId)
                            })


            return keys.reduce(function(previous_try, key){
                return  previous_try
                        .catch(function(){
                                return  key.decrypt(encrypted_passphrase)
                        })
            }, $q.reject('cmUserModel.decrypt(): missing local keys.'))

        };

        /**
         * @deprecated
         */
        this.bulkReKeying = function(localKeyId){
            //cmLogger.debug('cmUserModel.startBulkReKeying');

            console.log('cmUserModel.bulkReKeying depracted!');

            if(!this.state.is('rekeying')){
                this.state.set('rekeying');

                if(typeof localKeyId == 'string' && cmUtil.validateString(localKeyId)){
                    var localKey    = this.loadLocalKeys().find(localKeyId);

                    if(localKey instanceof cmKey){

                        this.data.identity.getTrustedKeys().then(
                            function(trusted_keys){

                                var rekeying_processes = [];

                                trusted_keys.forEach(function(key){
                                    if(key.id != localKey.id){

                                        rekeying_processes.push(cmAuth.getBulkPassphrases(localKey.id, key.id).then(
                                            function(list){
                                                if(list.length == 0)
                                                    return [];

                                                //re and encrypt passphrasees one by one, dont try to de and encrypt them all simultaniuosly:
                                                list.reduce(function(previous_run, item){
                                                    return  previous_run
                                                        .then(function(list_so_far){
                                                            return  self.decryptPassphrase(item.aePassphrase, localKey.id)
                                                                .then(function(passphrase){
                                                                    return key.encrypt(passphrase)
                                                                })
                                                                .then(function(encrypted_passphrase){
                                                                    return  list_so_far.concat([{
                                                                        conversationId: item.conversationId,
                                                                        aePassphrase:   encrypted_passphrase
                                                                    }])
                                                                })

                                                        })
                                                }, $q.when([]))
                                                    .then(function(newList){
                                                        return  cmAuth.saveBulkPassphrases(key.id, newList)
                                                    })
                                                    .then(
                                                        function(){
                                                            return  cmApi.broadcast({
                                                                name: 'rekeying:finished',
                                                                data:{
                                                                    keyId: key.id
                                                                }
                                                            });
                                                        },
                                                        function(){
                                                            cmLogger.debug('cmUserModel.bulkReKeying - Request Error - saveBulkPassphrases');
                                                        }
                                                    )
                                            },
                                            function(){
                                                cmLogger.debug('cmUserModel.bulkReKeying - Request Error - getBulkPassphrases');
                                            }
                                        ))
                                    }
                                });

                                $q.all(rekeying_processes).finally(
                                    function(){
                                        self.trigger('bulkrekeying:finished');
                                        self.state.unset('rekeying');
                                    }
                                );
                            }
                        );
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

                return true;
            }

            return false;
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
         * setLocalStorageSettings
         * Server Overwrite Local Changes
         */
        this.setAppSettings = function(data){
            //cmLogger.debug('cmUserModel.setAppSettings');
            var settings = this.storageGet('appSettings') || {};

            if('userSettings' in data){
                this.storageSave('appSettings', angular.extend({}, settings, data.userSettings));
            }
        };

        this.saveAppSettings = function(){
            //cmLogger.debug('cmUserModel.saveAppSettings');
            var settings = this.storageGet('appSettings') || {};

            if(cmUtil.objLen(settings) > 0){
                this.updateAccount({'userSettings': settings})
            }
        };

        /**
         * clear identity storage
         */
        this.resetUser = function(){
            this.reset();
        };

        init();

        /**
         * Event Handling
         */
        $rootScope.$on('logout', function(event, data){
            //cmLogger.debug('cmUserModel - $rootScope.logout');

            $rootScope.generateAutomatic = undefined;

            self.reset();
            isAuth = false;

            if(typeof data == 'object' && 'where' in data){
                self.removeToken(data.where);
            } else {
                self.removeToken();
            }

            if(self.getToken() !== false){
                cmLogger.error('Token was not removed at logout!');
                throw new Error('Failure at Logout Process!')
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
                    $rootScope.goTo('/setup/keyinfo');
                } else {
                    $rootScope.goTo('/talks');
                }
            });
        });

        this.on('update:finished', function(){
            cmBoot.ready.userModel();
        });

        this.on('account:updated', function(){
            cmBoot.ready.account();
        });

        var signOwnKeys_scheduled = false;

        cmAuth.on('identity:updated', function(event, data){
            if(typeof data.id != 'undefined' && data.id == self.data.identity.id) {
                self.data.identity.importData(data);
                self.syncLocalKeys()

                //Todo: find a more general solution: AP
                if(signOwnKeys_scheduled === false){
                    signOwnKeys_scheduled = true         
                    $timeout(function(){
                        signOwnKeys_scheduled = false
                        self.signOwnKeys()
                    }, 20000, false)
                }
            }
        });

        cmAuth.on('identity:new', function(event, data){
            if(typeof data.id != 'undefined' && data.id != self.data.identity.id) {
                var tmpIdentity = cmIdentityFactory.clear(data).create(data);
                self.data.identities.push(tmpIdentity);
            }
        });

        cmAuth.on('account:update', function(event, data){
            self.importAccount(data);
        });

    }
]);
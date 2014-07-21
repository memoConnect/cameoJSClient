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
    'cmBoot', 'cmAuth', 'cmLocalStorage', 'cmIdentityFactory', 'cmKey',
    'cmObject', 'cmNotify', 'cmLogger',
    '$rootScope', '$q', '$location',
    function(cmBoot, cmAuth, cmLocalStorage, cmIdentityFactory, cmKey,
             cmObject, cmNotify, cmLogger,
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

        /**
         * @param key
         */
        this.addKey = function(key){
            this.data.identity.addKey(key);
            return this;
        };

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
        this.saveKey = function(key){
            var key_list  =  this.loadLocalKeys() || [],
                key_data_list = [];

            key_list.forEach(function(local_key){
                var data = local_key.exportData();
                key_data_list.push(data);
            });

            key.updateKeyDataList(key_data_list);

            this.storageSave('rsa', key_data_list);

            this.trigger('key:stored')

            return this;
        };

        this.loadLocalKeys = function(){
            var storedKeys = this.storageGet('rsa') || [],
                keys        = [];

            storedKeys.forEach(function(stored_key){
                var data = (new cmKey()).importData(stored_key);
                keys.push(data)
            });

            return keys;
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
                var isNotInPublicKeys = self.data.identity.keys
                    ? self.data.identity.keys.filter(function(public_key){
                        if(typeof local_key.id !== 'undefined' && local_key.id == public_key.id) {
                            return true;
                        }
                        return false;
                      }).length == 0
                    : false;

                if(isNotInPublicKeys || typeof local_key.id === 'undefined' || local_key.id == ''){

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
                        local_key.importData(data);

                        self
                        .saveKey(local_key)
                        .addKey(local_key);
                    })
                } else {
                    self.addKey(local_key);
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

        this.clearLocalKeys = function(){
            this.storageSave('rsa', []);
        };

        this.decryptPassphrase = function(encrypted_passphrase, keyId){
            var keys = this.loadLocalKeys() || [],
                decrypted_passphrase;

            keys.forEach(function(key){ 
                if(!decrypted_passphrase && (key.id == keyId || !keyId)){
                    decrypted_passphrase = key.decrypt(encrypted_passphrase)                    
                }
            });
            return decrypted_passphrase;
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
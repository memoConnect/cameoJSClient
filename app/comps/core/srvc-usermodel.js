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
 * @requires cmCrypt
 * @requires cmObject
 * @requires cmNotify
 * @requires cmLogger
 * @requires $rootScope
 * @requires $q
 * @requires $location
 *
 * @type {{isActive: boolean, id: string, userKey: string, displayName: string, cameoId: string, email: {}, phoneNumber: {}, preferredMessageType: string, created: string, lastUpdated: string, userType: string, storage: {}, identity: {}}}
 */

angular.module('cmCore').service('cmUserModel',[
    'cmBoot',
    'cmAuth',
    'cmLocalStorage', 
    'cmIdentityFactory', 
    'cmCrypt',
    'cmObject',
    'cmNotify',
    'cmLogger',
    '$rootScope', 
    '$q', 
    '$location',
    function(cmBoot,cmAuth, cmLocalStorage, cmIdentityFactory, cmCrypt, cmObject, cmNotify, cmLogger, $rootScope, $q, $location){
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
//            cmLogger.debug('cmUserModel:importData');

            this.data = angular.extend(this.data,identity);

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
                this.importData(cmIdentityFactory.create(identity_data.id));
            } else {
                if(this.getToken() !== false){
                    cmAuth.getIdentity().then(
                        function(data){
                            self.importData(cmIdentityFactory.create(data));
                        },
                        function(r){
                            var response = r || {};

                            if(typeof response == 'object' && ('status' in response) && response.status == 401){
                                cmLogger.debug('cmUserModel:init:reject:401');
                                self.doLogout();
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
         * @todo more better logic pls^^
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

        this.doLogout = function(goToLogin){
//            cmLogger.debug('cmUserModel:doLogout');

            isAuth = false;
            this.removeToken();
            $rootScope.$broadcast('logout');

            if(typeof goToLogin === 'undefined' || goToLogin !== false){
                $location.path("/login");
            }
        };

        /**
         * Key Handling
         */

        /**
         * @todo in die identität
         * @param key
         */
        this.addKey = function(key){
            key.updateKeyList(this.data.identity.keys);
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
//            cmLogger.debug('cmUserModel.saveKey');
            /*
            var deferred = $q.defer(),
                i = 0,
                check = false;
            */
            var key_list      =  this.loadLocalKeys() || [],
                key_data_list = [];

            key_list.forEach(function(local_key){
                var data = local_key.exportData()
                key_data_list.push(data)                
            })

            key.updateKeyDataList(key_data_list)

            this.storageSave('rsa', key_data_list)

//            cmNotify.info('NOTIFICATIONS.TYPES.KEYS.STORE_NEW',{displayType:'modal',ttl:3000});

            return this
        };

        this.loadLocalKeys = function(){
//            cmLogger.debug('cmUserModel.loadLocalKeys');
            var stored_keys = this.storageGet('rsa') || [],
                keys        = [];

            stored_keys.forEach(function(stored_key){                
                var data = (new cmCrypt.Key()).importData(stored_key);
                keys.push(data)
            });
            
            return keys;
        };

        this.hasPrivateKey = function(){
//            cmLogger.debug('cmUserModel.hasPrivateKey');
            var keys = this.loadLocalKeys(),
                result = false

            keys.forEach(function(key){         
                result = result || !!key.getPrivateKey()
            });

            return result
        };

        this.clearLocalKeys = function(){
            this.storageSave('rsa', [])
        };

        this.syncLocalKeys = function(){
//            cmLogger.debug('cmUserModel.hasPrivateKey');
            /**
             * check local Keys from Storage
             */
            var localKeys = this.loadLocalKeys() || []

            localKeys.forEach(function(local_key){
                if(typeof local_key.id === 'undefined' || local_key.id == ''){
                    cmAuth.savePublicKey({
                        name:    local_key.name, 
                        key:     local_key.getPublicKey(),
                        keySize: 0 //@Todo
                    })
                    .then(function(data){
                        var key = new cmCrypt.Key()                        

                        key.importData(data)

                        self
                        .saveKey(key)
                        .addKey(key)
                    })
                } else {
                    self.addKey(local_key);
                }
            });

            return this;
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

        this.removeToken = function(){
            cmLogger.debug('cmUserModel:removeToken');
            cmAuth.removeToken();
        };

        /**
         * LocalStorage Functions
         */
        this.initStorage = function(){
            this.data.storage = cmLocalStorage.create(this.data.id,this.data.userKey);
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
//            cmLogger.debug('cmUserModel:resetUser');
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

        init();
    }
]);
'use strict';

angular.module('cmUserModel', ['cmAuth','cmLocalStorage','cmIdentity', 'cmCrypt'])
.service('cmUserModel',[

    'cmAuth', 
    'cmLocalStorage', 
    'cmIdentityFactory', 
    'cmCrypt', 
    '$rootScope', 
    '$q', 
    '$location', 

    function(cmAuth, cmLocalStorage, cmIdentityFactory, cmCrypt, $rootScope, $q, $location){
        var self = this,
            isInit = false;

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
            userType: 'external',
            keys: [],
            storage: {},
            identity: {}
        }

        this.comesFromRegistration = false;

        
        this.init = function(identity_data){
            if(typeof identity_data !== 'undefined'){
                var identity = cmIdentityFactory.create(identity_data);

                angular.extend(self.data, identity);

                self.data.identity = identity;
                self.data.identity.isAppOwner = true;

                isInit = true;
                self.initStorage();
                self.syncLocalKeys();

            } else if(self.isAuth() !== false){
                this.loadIdentity().then(
                    function(){
                        isInit = true;
                        self.initStorage();
                    self.syncLocalKeys();
                    }
                );
            }
        }

        this.loadIdentity = function(){
            var deferred = $q.defer(),
                identity;

            cmAuth.getIdentity().then(

                function(data){
                    identity = cmIdentityFactory.create(data);

                    angular.extend(self.data, identity);

                    self.data.identity = identity;
                    self.data.identity.isAppOwner = true;

                    self.data.isActive = true;

                    deferred.resolve();
                },

                function(){
                    deferred.reject();
                }
            );

            return deferred.promise;
        }

        this.data = angular.extend({}, dataModel);

        this.isAuth = function(){
            return this.getToken();
        };

        this.setIdentiy = function(identity_data){
            init(identity_data);
        };

        this.isGuest = function(){
            if(this.data.userType == 'external'){
                return true;
            }

            return false;
        };

        this.doLogin = function(user, pass){
            var deferred = $q.defer();

            cmAuth.requestToken(user, pass).then(
                function(token){
                    cmAuth.storeToken(token);

                    self.init();

                    deferred.resolve();
                },
                function(state, response){
                    deferred.reject(state, response);
                }
            );

            return deferred.promise;
        };

        this.doLogout = function(){
            isInit = false;
            this.removeToken();
            $rootScope.$broadcast('logout');
            $location.path("/login");
        };

        /**
         * Key Handling
         */

        /**
         * @todo in die identität
         * @param key
         */
        this.addKey = function(key){
            var i = 0,
                check = false;

            while(i < this.data.keys.length){
                if(key.id == this.data.keys[i].id){
                    check = true;
                    angular.extend(this.data.keys[i], key);
                    break;
                }
                i++;
            }

            if(check !== true){
                this.data.keys.push({
                    id: key.id,
                    keySize: key.keySize,
                    name: key.name,
                    key: key.pubKey, // @todo pubKey
                    privKey: key.privKey
                });
            }
        }

        this.saveKey = function(key_data){
            var deferred = $q.defer(),
                i = 0,
                check = false;

            var tmpKeys = this.loadLocalKeys();
            if(
                   typeof tmpKeys !== undefined 
                && typeof tmpKeys !== 'undefined' 
                && typeof tmpKeys !== 'string'
                && tmpKeys != null
            ){                
                if(tmpKeys.length > 0){
                    while(i < tmpKeys.length){
                        if(key_data.pubKey&& (key_data.pubKey == tmpKeys[i].pubKey)){
                            check = true;
                            angular.extend(tmpKeys[i],key_data);
                            break;
                        }
                        i++;
                    }

                    if(check !== true){
                        tmpKeys.push(key_data);
                    }

                    this.storageSave('rsa',tmpKeys);

                    deferred.resolve();
                } else {
                    this.storageSave('rsa',[key_data]);

                    deferred.resolve();
                }
            } else {
                this.storageSave('rsa',[key_data]);

                deferred.resolve();
            }

            return deferred.promise;
        };

        this.loadLocalKeys = function(){
            var keys = this.storageGet('rsa');
            if(keys == 'undefined'){
                return [];
            }
            return keys;
        };

        this.syncLocalKeys = function(){

            /**
             * check local Keys from Storage
             */
            var localKeys = this.loadLocalKeys() || [];

            localKeys.forEach(function(key){
                if(typeof key.id === 'undefined' || key.id == ''){
                    cmAuth.savePublicKey({name:key.name, keySize: key.keySize, key: key.pubKey}).then(
                        function(data){
                            key.id = data.id;
                            self.saveKey(key).then(
                                function(){
                                    self.addKey(key);
                                }
                            );
                        }
                    )
                } else {
                    self.addKey(key);
                }
            });

            return this;
        };


        this.decryptPassphrase = function(encrypted_passphrase){
            var keys = this.loadLocalKeys() || [],
                decrypted_passphrase

            keys.forEach(function(item){ 
                if(!decrypted_passphrase && item.privKey){
                    decrypted_passphrase = cmCrypt.decryptWithPrivateKey(encrypted_passphrase, item.privKey)
                }
            })
            return decrypted_passphrase
        }



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
            cmAuth.removeToken();
        };

        /**
         * LocalStorage Functions
         */
        this.initStorage = function(){
            self.data.storage = cmLocalStorage.create(self.data.id,self.data.userKey);
        }

        /**
         * save to identity storage
         * @param key
         * @param value
         */
        this.storageSave = function(key, value){
            if(isInit !== false && self.data.storage !== null){
                self.data.storage.save(key, value);
            }
        };
        /**
         *  get from identity storage
         * @param key
         */
        this.storageGet = function(key){
            if(isInit !== false && self.data.storage !== null){
                return self.data.storage.get(key);
            }

            return null;
        };
        /**
         * remove from identity storage
         * @param key
         */
        this.storageRemove = function(key){
            if(isInit !== false && self.data.storage !== null){
                self.data.storage.remove(key);
            }
        };
        /**
         * clear identity storage
         */
        function resetUser(){
            self.data = angular.extend({}, dataModel);
        }

        $rootScope.$on('logout', function(){
            resetUser();
        });

        this.init();
    }
]);

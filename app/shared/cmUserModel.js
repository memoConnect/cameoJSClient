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
            userType: 'external',            
            storage: {},
            identity: {}
        }

        this.comesFromRegistration = false;

        
        this.init = function(identity_data){
            this.loadIdentity(identity_data).then(
                function(identity){
                    angular.extend(self.data, identity);

                    self.data.identity = identity;
                    self.data.identity.isAppOwner = true;

                    isAuth = true;
                    self.initStorage();
                    self.syncLocalKeys();
                },
                function(response){
                    if(response.status == 401){
                        self.doLogout();
                    }
                }
            )

            return this;
        };

        this.loadIdentity = function(identity_data){
            var deferred = $q.defer();

            if(typeof identity_data !== 'undefined'){
                deferred.resolve(cmIdentityFactory.create(identity_data));
            } else {
                cmAuth.getIdentity().then(
                    function(data){
                        deferred.resolve(cmIdentityFactory.create(data));
                    },

                    function(response){
                        deferred.reject(response);
                    }
                );
            }

            return deferred.promise;
        };

        this.data = angular.extend({}, dataModel);

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

        this.setIdentity = function(identity_data){
            this.init(identity_data);
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
            isAuth = false;
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
            key.updateKeyList(this.data.identity.keys)
            /*
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
            */
            return this
        }

        /**
         * @todo check ob Key schon vorhanden ist?!?
         * @param key
         * @returns {*}
         */
        this.saveKey = function(key){
            /*
            var deferred = $q.defer(),
                i = 0,
                check = false;
            */
            
            var key_list      =  this.loadLocalKeys() || [],
                key_data_list = []

            key_list.forEach(function(local_key){                
                var data = local_key.exportData()
                key_data_list.push(data)                
            })

            key.updateKeyDataList(key_data_list)

            this.storageSave('rsa', key_data_list)

            /*
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
            */
            return this
        };

        this.loadLocalKeys = function(){
            var stored_keys = this.storageGet('rsa') || [],
                keys        = []            

            stored_keys.forEach(function(stored_key){                
                var data = (new cmCrypt.Key()).importData(stored_key)
                keys.push( data )                
            })
            
            return keys;
        }

        this.hasPrivateKey = function(){
            var keys = this.loadLocalKeys(),
                result = false

            console.log('my private keys:')
            keys.forEach(function(key){                
                console.log(key.getPrivateKey())
                result = result || !!key.getPrivateKey()
            })

            return result
        }

        this.clearLocalKeys = function(){
            this.storageSave('rsa', [])
        }

        this.syncLocalKeys = function(){

            /**
             * check local Keys from Storage
             */
            var localKeys = this.loadLocalKeys() || []

            localKeys.forEach(function(local_key){
                if(typeof local_key.id === 'undefined' || local_key.id == ''){
                    cmAuth.savePublicKey({
                        name:    local_key.name, 
                        key:     local_key.getPublicKey(),
                        keySize: 0, //@Todo                        
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


        this.decryptPassphrase = function(encrypted_passphrase){
            var keys = this.loadLocalKeys() || [],
                decrypted_passphrase

            keys.forEach(function(key){ 
                if(!decrypted_passphrase){
                    decrypted_passphrase = key.decrypt(encrypted_passphrase)                    
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
            if(isAuth !== false && self.data.storage !== null){
                self.data.storage.save(key, value);
            }
        };
        /**
         *  get from identity storage
         * @param key
         */
        this.storageGet = function(key){            
            if(isAuth !== false && self.data.storage !== null){
                return self.data.storage.get(key);
            }

            return null;
        };
        /**
         * remove from identity storage
         * @param key
         */
        this.storageRemove = function(key){
            if(isAuth !== false && self.data.storage !== null){
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

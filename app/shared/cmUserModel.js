'use strict';

angular.module('cmUserModel', ['cmAuth','cmLocalStorage','cmIdentity'])
.service('cmUserModel',['cmAuth', 'cmLocalStorage', 'cmIdentityFactory', '$rootScope', '$q', '$location', 'avatarMocks', function(cmAuth, cmLocalStorage, cmIdentityFactory, $rootScope, $q, $location, avatarMocks){
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
        publicKeys: [],
        storage: {},
        identity: {}
    }

    this.comesFromRegistration = false;

    /**
     * Init Object
     */
    function init(identity_data){
        if(typeof identity_data !== 'undefined'){
            var identity = cmIdentityFactory.create(identity_data);

            angular.extend(self.data, identity);

            self.data.identity = identity;
            // avatar mock for own
            self.data.identity.avatar = avatarMocks.own;

            isInit = true;
            initStorage();
            self.syncLocalKeys();


        } else if(self.isAuth() !== false){
            loadIdentity().then(
                function(){
                    isInit = true;
                    initStorage();
                    self.syncLocalKeys();
                }
            );
        }
    }

    function loadIdentity(){
        var deferred = $q.defer(),
            identity;

        cmAuth.getIdentity().then(
            function(data){
                identity = cmIdentityFactory.create(data);

                angular.extend(self.data, identity);

                self.data.identity = identity;
                // avatar mock for own
                self.data.identity.avatar = avatarMocks.own;

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

    this.setIdentity = function(identity_data){
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

                init();

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

    this.addKey = function(key){
        var i = 0,
            check = false;

        while(i < this.data.publicKeys.length){
            if(key.id == this.data.publicKeys[i].id){
                check = true;
                break;
            }
            i++;
        }

        if(check !== true){
            this.data.publicKeys.push({
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
        if(typeof tmpKeys !== undefined && typeof tmpKeys !== 'undefined' && typeof tmpKeys !== 'string'){
            if(tmpKeys.length > 0){
                while(i < tmpKeys.length){
                    if(key_data.pubKey == tmpKeys[i].pubKey){
                        check = true;
                        angular.extend(tmpKeys[i],key_data);
                        break;
                    }
                    i++;
                }

                if(check !== true){
                    tmpKeys.push(key_data);
                }

                this.storageSave('pgp',tmpKeys);

                deferred.resolve();
            } else {
                this.storageSave('pgp',[key_data]);

                deferred.resolve();
            }
        } else {
            this.storageSave('pgp',[key_data]);

            deferred.resolve();
        }

        return deferred.promise;
    };

    this.loadLocalKeys = function(){
        var keys = this.storageGet('pgp');
        if(keys == 'undefined'){
            return [];
        }
        return keys;
    };

    this.syncLocalKeys = function(){

        /**
         * check local Keys from Storage
         */
        var localKeys = this.loadLocalKeys();

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
    function initStorage(){
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

    init();
}]);

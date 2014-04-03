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

        } else if(self.isAuth() !== false){
            loadIdentity().then(
                function(){
                    isInit = true;
                    initStorage();
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

    this.saveKey = function(key_data){
        var deferred = $q.defer(),
            i = 0,
            check = false;

        var tmpKeys = this.loadKeys();
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

                self.data.publicKeys.push(key_data);

                deferred.resolve();
            } else {
                this.storageSave('pgp',[key_data]);

                self.data.publicKeys.push(key_data);

                deferred.resolve();
            }
        } else {
            this.storageSave('pgp',[key_data]);

            self.data.publicKeys.push(key_data);

            deferred.resolve();
        }

//        cmAuth.savePublicKey({
//            name: key_data.name,
//            key: key_data.pubKey,
//            size: key_data.keySize
//        }).then(
//            function(data){
//                self.data.publicKeys.push(data);
//            },
//            function(){
//                //kA
//            }
//        )

        return deferred.promise;
    };

    this.loadKeys = function(){
        var keys = this.storageGet('pgp');
        if(keys == 'undefined'){
            return [];
        }
        return keys;
    };

    this.syncKeys = function(){
        var deferred = $q.defer(),
            i = 0,
            k = 0;

        // get keys from identity
        cmAuth.getIdentity().then(
            function(data){
                var localKeys = self.loadKeys();
                console.info('Lokale Keys')
                console.dir(localKeys)
//                console.info('Globale Keys')
//                console.dir(data.publicKeys)

                /**
                 * check local Keys from Storage
                 */
                localKeys.forEach(function(key){
                    if(typeof key.id === 'undefined' || key.id == ''){
                        cmAuth.savePublicKey({name:key.name, keySize: key.keySize, key: key.pubKey}).then(
                            function(data){
                                key.id = data.id;

                                self.saveKey(key);
                            }
                        )
                    }
                });


                console.info('merge');
                console.dir(localKeys)

            }
        );


        return deferred.promise;
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

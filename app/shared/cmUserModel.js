'use strict';

angular.module('cmUserModel', ['cmAuth','cmLocalStorage','cmIdentity'])
.service('cmUserModel',['cmAuth', 'cmLocalStorage', 'cmIdentityFactory', '$rootScope', '$q', '$location', function(cmAuth, cmLocalStorage, cmIdentityFactory, $rootScope, $q, $location){
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

    /**
     * Init Object
     */
    function init(identity_data){
        if(typeof identity_data !== 'undefined'){
            var identity = cmIdentityFactory.create(identity_data);

            angular.extend(self.data, identity);

            self.data.identity = identity;

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
                console.log(identity)

                angular.extend(self.data, identity);

                self.data.identity = identity;

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
        var tmpKeys = this.loadKeys();
        if(typeof tmpKeys !== undefined && typeof tmpKeys !== 'undefined' && typeof tmpKeys !== 'string'){
            if(tmpKeys.length > 0){
                tmpKeys.push(key_data);
                this.storageSave('pgp',tmpKeys);
            } else {
                this.storageSave('pgp',[key_data]);
            }
        } else {
            this.storageSave('pgp',[key_data]);
        }

        cmAuth.savePublicKey({
            name: key_data.name,
            key: key_data.pubKey,
            size: key_data.keySize
        }).then(
            function(data){
                self.data.publicKeys.push(data);
            },
            function(){
                //kA
            }
        )

        return true;
    };

    this.loadKeys = function(){
        return this.storageGet('pgp');
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

'use strict';

angular.module('cmUserModel', ['cmAuth','cmLocalStorage'])
.service('cmUserModel',['cmAuth', 'cmLocalStorage', '$rootScope', '$q', '$location', function(cmAuth, cmLocalStorage, $rootScope, $q, $location){
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
        storage: {}
    }

    /**
     * Init Object
     */
    function init(identity_data){
        if(typeof identity_data !== 'undefined'){
            angular.extend(self.data, identity_data);
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
    }

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
     * Token Functions
     * @TODO handle Token with identity
     */
    this.getToken = function(){
//        var r = false;
//
//        if(this.data.storage !== null){
//            var tmp = this.storageGet('token');
//
//            if(tmp != undefined && tmp != 'undefined'){
//                this.data.token = tmp;
//                r = this.data.token;
//            }
//        }
//
//        if(r === false) {
//            this.data.token = $cookieStore.get('token');
//            r = this.data.token;
//        }

        var token = cmAuth.getToken();
        if(token !== undefined && token !== 'undefined' && token !== null){
            return token;
        }

        return false;
    }

    this.storeToken = function(t){
//        if(typeof t !== 'undefined'){
//            $cookieStore.put('token',t);
//            this.storageSave('token', t);
//        }
        cmAuth.storeToken(t);
    }

    this.removeToken = function(){
//        $cookieStore.remove('token');
//        this.storageRemove('token');
        cmAuth.removeToken();
    }

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
    }
    /**
     *  get from identity storage
     * @param key
     */
    this.storageGet = function(key){
        if(isInit !== false && self.data.storage !== null){
            self.data.storage.get(key);
        }
    }
    /**
     * remove from identity storage
     * @param key
     */
    this.storageRemove = function(key){
        if(isInit !== false && self.data.storage !== null){
            self.data.storage.remove(key);
        }
    }
    /**
     * clear identity storage
     */
    function resetUser(){
        self.data = angular.extend({}, dataModel);
    }

    function loadIdentity(){
        var deferred = $q.defer();

        cmAuth.getIdentity().then(
            function(data){
                angular.extend(self.data, data);
                self.data.isActive = true;

                deferred.resolve();
            },
            function(){
                deferred.reject();
            }
        )

        return deferred.promise;
    }

    $rootScope.$on('logout', function(){
        resetUser();
    });

    init();
}]);

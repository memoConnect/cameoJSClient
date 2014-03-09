'use strict';

angular.module('cmUserModel', ['cmAuth','cmLocalStorage'])
.service('cmUserModel',['cmAuth', 'cmLocalStorage', '$rootScope', '$q', function(cmAuth, cmLocalStorage, $rootScope, $q){
    var self = this,
        isInit = false,
        token = '';

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
        storage: {}
    }

    /**
     * Init Object
     */
    function init(){
        if(self.isAuth() !== false){
            loadIdentity();
            isInit = true;
        }
    }

    this.data = angular.extend({}, dataModel);

    this.isAuth = function(){
        return this.getToken();
    };

    this.doLogin = function(user, pass){
        var deferred = $q.defer();

        cmAuth.requestToken(user, pass).then(
            function(token){
                self.storeToken(token);
                loadIdentity();
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
        if(token != ''){
            return token;
        } else {
            var tmp = this.storageGet('token');

            if(tmp != undefined && tmp != 'undefined'){
                token = tmp;
                return token;
            }
        }

        return false;
    }

    this.storeToken = function(t){
        if(typeof t !== 'undefined'){
            token = t;
            this.storageSave('token', t);
        }
    }

    this.removeToken = function(){
        this.storageRemove('token');
    }

    /**
     * LocalStorage Functions
     */

    /**
     * save to identity storage
     * @param key
     * @param value
     */
    this.storageSave = function(key, value){
        if(isInit !== false){
            self.data.storage.save(key, value);
        }
    }
    /**
     *  get from identity storage
     * @param key
     */
    this.storageGet = function(key){
        if(isInit !== false){
            self.data.storage.get(key);
        }
    }
    /**
     * remove from identity storage
     * @param key
     */
    this.storageRemove = function(key){
        if(isInit !== false){
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
        cmAuth.getIdentity().then(
            function(data){
                angular.extend(self.data, data);
                self.data.isActive = true;

                loadStorage();
            }
        )
    }

    function loadStorage(){
        self.data.storage = cmLocalStorage.create(self.data.id,self.data.userKey);
    }

    $rootScope.$on('logout', function(){
        resetUser();
    });

    init();
}]);

'use strict';

function cmUserModel(cmAuth, cmLocalStorage, $q, $rootScope, $location){
    var self = this;

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
        }
    }

    this.data = angular.extend({}, dataModel);

    this.isAuth = function(){
        if(cmAuth.getToken() != undefined && cmAuth.getToken() != 'undefined'){
            return true;
        }
        return false;
    };

    this.doLogin = function(user, pass){
        var deferred = $q.defer();

        cmAuth.requestToken(user, pass).then(
            function(token){
                cmAuth.storeToken(token);
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
        cmAuth.removeToken();
        $rootScope.$broadcast('logout');
        $location.path("/login");
    };

    /**
     * LocalStorage Functions
     */
    /**
     * save to identity storage
     * @param key
     * @param value
     */
    this.storageSave = function(key, value){
        self.data.storage.save(key, value);
    }
    /**
     *  get from identity storage
     * @param key
     */
    this.storageGet = function(key){
        self.data.storage.get(key, value);
    }
    /**
     * remove from identity storage
     * @param key
     */
    this.storageRemove = function(key){
        self.data.storage.remove(key, value);
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
}
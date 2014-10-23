'use strict';

/**
 * @ngdoc object
 * @name LocalStorageAdapter
 * @description
 */
angular.module('cmCore').service('LocalStorageAdapter', [
function(){
    return {
        /**
         * check usability in browser
         * @returns {boolean}
         */
        check: function(){
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch(e){
                return false;
            }
        },
        /**
         * returns a value from a key
         * @param key
         * @returns {*}
         */
        get: function (key) {
            try {
                return localStorage.getItem(key);
            } catch (e){
                return "";
            }
        },
        /**
         * http://stackoverflow.com/questions/8419354/get-html5-localstorage-keys
         * returns an array of all keys
         * @returns {*}
         */
        getAllKeys: function(){
            try {
                return Object.keys(localStorage);
            } catch (e) {
                return false;
            }
        },
        /**
         * set/update keys
         * @param key
         * @param data
         * @returns {boolean}
         */
        save: function (key, data) {
            try {
                localStorage.setItem(key, data);
                return true;
            } catch (e){
                return false;
            }
        },
        /**
         * remove key
         * @param key
         * @returns {boolean}
         */
        remove: function (key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e){
                return false;
            }
        },
        /**
         * remove all keys
         * @returns {boolean}
         */
        clearAll : function () {
            try {
                localStorage.clear();
                return true;
            } catch (e){
                return false;
            }
        }
    }
}]).
/**
 * @ngdoc object
 * @name LocalStorageService
 * @description
 *
 * @requires LocalStorageAdapter
 * @requires cmCrypt
 * @requires $rootScope
 */
factory('LocalStorageService',['LocalStorageAdapter', 'cmCrypt','$rootScope', function(LocalStorageAdapter, cmCrypt, $rootScope){
    var LocalStorageService = function(){
        var self = this,
            useable = false,
            useableCheck = false,
            cryptKey = "",
            storageKey = "CAMEO_LOCAL_STORAGE_IDENTITY",
            storageValue = {};

        function getStorageValue(){

            var value = LocalStorageAdapter.get(storageKey);
            if(value == null){
                return {}
            } else {
                return JSON.parse(cmCrypt.decrypt(cryptKey,cmCrypt.base64Decode(value)));
            }
        }

        function saveStorageValue(value){
            try {
                LocalStorageAdapter.save(storageKey, cmCrypt.base64Encode(cmCrypt.encryptWithShortKey(cryptKey,JSON.stringify(value))));
                return true;
            } catch(e){
                //
            }

            return false;
        }

        /**
         * init
         */
        this.init = function(data){
            if(this.check()){
                cryptKey = cmCrypt.hash(data.id + data.key);
                storageKey = cmCrypt.hash(data.id);

                this.instanceId = data.id;
                this.instanceKey = data.key;
            }
        };
        /**
         * adapter function for check local storage
         * @returns {boolean}
         */
        this.check = function(){
            if(useableCheck !== true){
                useable = LocalStorageAdapter.check();
                useableCheck = true;
            }

            return useable;
        };
        /**
         * get key
         * @param key
         * @returns {*}
         */
        this.get = function (key) {
            if(this.check() !== false){
                storageValue = getStorageValue();
                if(storageValue[key] != undefined){
                    return storageValue[key];
                }
            }

            return undefined;
        };
        /**
         * get all keys from identity storage
         * @returns {*}
         */
        this.getAllKeys = function(){
            if(this.check() !== false){
                var keys = [];
                storageValue = getStorageValue();

                for(var k in storageValue){
                    keys.push(k);
                }

                return keys;
            }

            return [];
        },
        /**
         *  set and update key in identity storage
         *  @returns {boolean}
         */
        this.save = function (key, data) {
            if(this.check() !== false){
                storageValue = getStorageValue();
                if(storageValue == null){
                    storageValue = {};
                }
                storageValue[key] = data;

                saveStorageValue(storageValue);
                return true;
            }

            return false;
        };
        /**
         * remove on key from identity storage
         * @param key
         * @returns {boolean}
         */
        this.remove = function (key) {
            if(this.check() !== false){
                storageValue = getStorageValue();
                if(storageValue[key] != undefined){
                    try {
                        delete(storageValue[key]);
                        saveStorageValue(storageValue);
                        return true;
                    } catch (e){
                        //
                    }
                }
            }

            return false;
        };
        /**
         * remove all from identity storage
         * @returns {boolean}
         */
        this.clearAll = function () {
            if(this.check() !== false){
                storageValue = {};
                LocalStorageAdapter.remove(storageKey);
                return true;
            }

            return false;
        };

        function reset(){
            self.instanceId = "";
            self.instanceKey = "";
            self.storageValue = {};
            self.cryptKey = "";
        }

        $rootScope.$on('logout', function(){ reset(); });

        $rootScope.$on('identity:switched', function(){ reset() });

    };

    return LocalStorageService;
}]).
/**
 * @ngdoc object
 * @name cmLocalStorage
 * @description
 *
 * @requires LocalStorageService
 * @requires $rootScope
 */
factory('cmLocalStorage',['LocalStorageService','$rootScope', function(LocalStorageService, $rootScope){
    var instanceMock = [{id:'',instance:{}}];
    var instances = [];

    $rootScope.$on('logout', function(){
        instances = [];
    });

    $rootScope.$on('identity:switched', function(){
        instances = [];
    });

    return {
        /**
         * returns instances of LocalStorageService
         * @param id
         * @returns {*}
         */
        create: function(id, key){
            if(typeof id !== 'undefined' && id != '' && typeof key !== 'undefined' && key != ''){
                var storage = null;

                for(var i = 0; i < instances.length; i++){
                    if(typeof instances[i] === 'object' &&
                        instances[i].id == id){

                        storage = instances[i].instance;
                        break;
                    }
                }

                if(storage === null){
                    storage = new LocalStorageService();
                    storage.init({id:id,key:key});

                    instances.push({id:id,instance:storage});
                }

                return storage;
            }

            return null;
        },
        getQty: function(){
          return instances.length;
        }
    }

}]);
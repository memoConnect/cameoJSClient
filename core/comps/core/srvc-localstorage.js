'use strict';

/**
 * @ngdoc object
 * @name LocalStorageAdapter
 * @description
 */
angular.module('cmCore').service('LocalStorageAdapter', [
'$window',
'cmLogger',
function($window){
    return {
        /**
         * check usability in browser
         * @returns {boolean}
         */
        check: function(){
            try {
                return 'localStorage' in $window && $window['localStorage'] !== null;
            } catch(e){
                cmLogger.warn('LocalStorage Check - ' + e)
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
                return $window.localStorage.getItem(key);
            } catch (e){
                cmLogger.warn('LocalStorage get - ' + e)
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
                return Object.keys($window.localStorage);
            } catch (e) {
                cmLogger.warn('LocalStorage getAllKeys - ' + e)
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
                $window.localStorage.setItem(key, data);
                return true;
            } catch (e){
                cmLogger.warn('LocalStorage save - ' + e)
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
                $window.localStorage.removeItem(key);
                return true;
            } catch (e){
                cmLogger.warn('LocalStorage remove - ' + e)
                return false;
            }
        },
        /**
         * remove all keys
         * @returns {boolean}
         */
        clearAll : function () {
            try {
                $window.localStorage.clear();
                return true;
            } catch (e){
                cmLogger.warn('LocalStorage clearAll - ' + e)
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
factory('LocalStorageService',['LocalStorageAdapter', 'cmCrypt', 'cmLogger', '$rootScope', function(LocalStorageAdapter, cmCrypt, cmLogger, $rootScope){
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
                //
                //this.instanceId = data.id;
                //this.instanceKey = data.key;
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

        this.reset = function(){
            cmLogger.debug('LocalStorageService.reset');

            self.storageValue = {};
            self.cryptKey = "";
        }
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
factory('cmLocalStorage',['LocalStorageService','cmLogger','$rootScope', function(LocalStorageService, cmLogger, $rootScope){
    var instanceMock = [{id:'',instance:{}}];
    var instances = [];

    function resetInstances(){
        cmLogger.debug('cmLocalStorage resetInstances');
        var i = 0;
        while(i < instances.length){
            instances[i].instance.reset();
            instances[i] = null;

            i++;
        }

        instances = null;
        instances = [];
    }

    $rootScope.$on('logout', resetInstances);

    $rootScope.$on('identity:switched', resetInstances);

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
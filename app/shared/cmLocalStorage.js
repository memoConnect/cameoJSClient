'use strict';

angular.module('cmLocalStorage', ['cmLogger','cmCrypt']).
service('LocalStorageAdapter',function(){
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
}).
factory('LocalStorageService',['LocalStorageAdapter', 'cmCrypt', function(LocalStorageAdapter, cmCrypt){
    var LocalStorageService = function(){
        this.instanceId = "";
        this.instanceKey = "";

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
                return JSON.parse(cmCrypt.decrypt(cryptKey,value));
            }
        }

        function saveStorageValue(value){
            try {
                LocalStorageAdapter.save(storageKey, cmCrypt.encrypt(cryptKey,JSON.stringify(value)));
                return true;
            } catch(e){
                //
            }

            return false;
        }

        /**
         * init
         */
        this.init = function(){
            if(this.check()){
                cryptKey = cmCrypt.hash(this.instanceId + this.instanceKey);
                storageKey = cmCrypt.hash(cryptKey);
            }
        }
        /**
         * set instance Id
         * @param id
         */
        this.setInstanceVars = function(data){
            this.instanceId = data.id;
            this.instanceKey = data.key;
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

            return "undefined";
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
            console.log(key + data);
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
        }

    }

    return LocalStorageService;
}]).
factory('cmLocalStorage',['LocalStorageService', function(LocalStorageService){
    var instanceMock = [{id:'',instance:{}}];
    var instances = [];

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
                    storage.setInstanceVars({id:id,key:key});
                    storage.init();

                    instances.push({id:id,instance:localStorage});
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
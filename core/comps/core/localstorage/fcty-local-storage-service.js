'use strict';

/**
 * @ngdoc object
 * @name LocalStorageService
 * @description
 *
 * @requires cmLocalStorageAdapter
 * @requires cmCrypt
 */
angular.module('cmCore')
.factory('cmLocalStorageService',[
    'cmLocalStorageAdapter', 'cmCrypt', 'cmLogger',
    function(cmLocalStorageAdapter, cmCrypt, cmLogger){

        var cmLocalStorageService = function(){
            var self = this,
                useable = false,
                useableCheck = false,
                cryptKey = "",
                storageKey = "CAMEO_LOCAL_STORAGE_IDENTITY",
                storageValue = {};

            function getStorageValue(){

                var value = cmLocalStorageAdapter.get(storageKey);
                if(value == null){
                    return {}
                } else {
                    return JSON.parse(cmCrypt.decrypt(cryptKey,cmCrypt.base64Decode(value)));
                }
            }

            function saveStorageValue(value){
                try {
                    cmLocalStorageAdapter.save(storageKey, cmCrypt.base64Encode(cmCrypt.encryptWithShortKey(cryptKey,JSON.stringify(value))));
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
                    useable = cmLocalStorageAdapter.check();
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
                    cmLocalStorageAdapter.remove(storageKey);
                    return true;
                }

                return false;
            };

            this.reset = function(){
                cmLogger.debug('cmLocalStorageService.reset');

                self.storageValue = {};
                self.cryptKey = "";
            }
        };

        return cmLocalStorageService;
    }
]);
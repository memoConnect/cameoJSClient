'use strict';

angular.module('cmUser').factory('cmUserKeyStorageService',[
    'cmUserModel',
    'cmUtil',
    'cmLogger',
    function(cmUserModel, cmUtil, cmLogger) {
        function userKeyStorage(key){
            var self = this,
                storageKey = undefined;

            function init(key){
                cmLogger.debug('cmUserKeyStorage.init');

                if(typeof key == 'string' && cmUtil.validateString(key)){
                    storageKey = key;
                } else {
                    throw new Error("cmUserKeyStorage init failed! Key is not a valid string!");
                }
            }

            function getAll(){
                cmLogger.debug('cmUserKeyStorage.getAll');

                return cmUserModel.storageGet(storageKey) || {};
            }

            this.get = function(key){
                cmLogger.debug('cmUserKeyStorage.get');

                var list = getAll(),
                    value = undefined;

                if(typeof list == 'object' && Object.keys(list).indexOf(key)!= -1){
                    value = list[key];
                }

                return value;

            };

            this.set = function(key, value){
                cmLogger.debug('cmUserKeyStorage.set');

                var list = getAll();

                list[key] = value;

                cmUserModel.storageSave(storageKey, list);
            };

            this.is = function(key){
                var list = getAll(),
                    boolReturn = false;

                if(key != undefined && // key exists
                    cmUtil.checkKeyExists(list, key) && // is in properties
                    list[key])// and is true
                {
                    boolReturn = true;
                }

                return boolReturn;
            };

            init(key);
        }

        return userKeyStorage;
    }
]);
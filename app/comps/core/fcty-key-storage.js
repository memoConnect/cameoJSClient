'use strict';

angular.module('cmCore').factory('cmKeyStorageService',[
    'cmUserModel',
    'cmUtil',
    'cmLogger',
    '$rootScope',
    function(cmUserModel, cmUtil, cmLogger, $rootScope) {
        function userKeyStorage(key){
            var self = this,
                storageKey = undefined;

            function init(key){
                //cmLogger.debug('cmUserKeyStorage.init');

                if(typeof key == 'string' && cmUtil.validateString(key)){
                    storageKey = key;
                } else {
                    throw new Error("cmUserKeyStorage init failed! Key is not a valid string!");
                }
            }

            function reset(){
                storageKey = undefined;
            }

            this.getAll = function(){
                return cmUserModel.storageGet(storageKey) || {};
            };

            this.get = function(key){
                //cmLogger.debug('cmUserKeyStorage.get');

                var list = this.getAll(),
                    value = undefined;

                if(typeof list == 'object' && Object.keys(list).indexOf(key)!= -1){
                    value = list[key];
                }

                return value;

            };

            this.set = function(key, value){
                //cmLogger.debug('cmUserKeyStorage.set');

                var list = this.getAll();

                list[key] = value;

                cmUserModel.storageSave(storageKey, list);
            };

            this.is = function(key){
                //cmLogger.debug('cmUserKeyStorage.is');

                var list = this.getAll(),
                    boolReturn = false;

                if(key != undefined && // key exists
                    cmUtil.checkKeyExists(list, key) && // is in properties
                    list[key])// and is true
                {
                    boolReturn = true;
                }

                return boolReturn;
            };

            $rootScope.$on('logout', function(){ reset() });

            $rootScope.$on('identity:switched', function(){ reset() });

            init(key);
        }

        return userKeyStorage;
    }
]);
'use strict';

/**
 * @ngdoc service
 * @name cmSettings
 * @description
 *
 */
angular.module('cmCore')
.service('cmSettings', [
    'cmUserModel',
    'cmUtil',
    function(cmUserModel, cmUtil) {
        var self = this,
            localStorageKey = 'appSettings';

        this.properties = {};

        function init(){
            self.properties = cmUserModel.storageGet(localStorageKey) || {};
        }

        /**
         * @name get
         * @description
         * get the value of an key out of the localstorage
         */
        this.get = function(key){
            // get key
            if(key != undefined){
                var settings = {};

                if(cmUtil.checkKeyExists(this.properties, key)){
                    settings = this.properties[key];
                }

                return settings;
            }
        };

        /**
         * @name is
         * @description
         * check if exists and is true
         */
        this.is = function(key){
            var boolReturn = false;
            if(key != undefined && // key exists
               cmUtil.checkKeyExists(this.properties, key) && // is in properties
               this.properties[key]){// and is true
                boolReturn = true;
            }
            return boolReturn;
        };

        /**
         * @name set
         * @description
         * updates the key in localstorage
         */
        this.set = function(key, value){
            this.properties[key] = value;

            if(cmUserModel.storageSave(localStorageKey, this.properties)){
                return true;
            }

            return false;
        };

        init();
    }
]);
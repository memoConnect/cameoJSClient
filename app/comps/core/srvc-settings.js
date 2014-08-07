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
    'cmLogger',
    '$rootScope',
    function(cmUserModel, cmUtil, cmLogger, $rootScope) {
        var self = this,
            localStorageKey = 'appSettings',
            defaultProperties = {
                convertEmoji: true,
                sendOnReturn: false
            };


        this.properties = {};

        function init(){
//            cmLogger.debug('cmSettings.init');
            self.properties = angular.extend({}, defaultProperties, (cmUserModel.storageGet(localStorageKey) || {}));
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

        $rootScope.$on('logout', function(){
//            cmLogger.debug('cmSettings.on.logout');
            self.properties = {};
        });

        cmUserModel.on('update:finished', function(){
            init();
        });
    }
]);
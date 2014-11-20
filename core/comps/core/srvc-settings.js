'use strict';

/**
 * @ngdoc service
 * @name cmSettings
 * @description
 * @todo combine with service-key-storage
 */
angular.module('cmCore').service('cmSettings', [
    'cmUserModel', 'cmUtil', 'cmLogger', 'cmObject',
    '$rootScope',
    function(cmUserModel, cmUtil, cmLogger, cmObject,
             $rootScope) {

        var self = this,
            localStorageKey = 'appSettings',
            defaultProperties = {
                convertEmoji: true,
                sendOnReturn: false,
                skipKeyInfo: false,
                dateFormat: 'dd.MM.yyyy',
                timeFormat: 'HH:mm',
                pushNotifications: true,
                browserNotifications: true
            };

        cmObject.addEventHandlingTo(this);

        this.properties = {};

        function init(){
//            cmLogger.debug('cmSettings.init');
            self.properties = angular.extend({}, defaultProperties, (cmUserModel.storageGet(localStorageKey) || {}));
            self.trigger('update:finished');
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

        $rootScope.$on('identity:switched', function(){
            self.properties = {};
        });

        cmUserModel.on('update:finished', function(){
            init();
        });
    }
]);
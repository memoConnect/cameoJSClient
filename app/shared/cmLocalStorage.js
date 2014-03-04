define([
    'angular',
    'cmLogger'
],function () {
    'use strict';

    angular.module('cmLocalStorage', ['cmLogger']).
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
        factory('LocalStorageService',['LocalStorageAdapter', function(LocalStorageAdapter){
            var LocalStorageService = function(){
                this.instanceId = "";

                var self = this,
                    useable = false,
                    useableCheck = false,
                    ultimateKey = "MULTIKEY"+this.instanceId,
                    ultimateValue = {};

                function getUltimateValue(){
                    var value = LocalStorageAdapter.get(ultimateKey);
                    if(value == null){
                        return {}
                    } else {
                        return JSON.parse(value);
                    }
                }

                function saveUltimateValue(value){
                    try {
                        LocalStorageAdapter.save(ultimateKey, JSON.stringify(value));
                        return true;
                    } catch(e){
                        //
                    }

                    return false;
                }

                /**
                 * set instance Id
                 * @param id
                 */
                this.setInstanceId = function(id){
                    this.instanceId = id;

                    this.check();
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
                        ultimateValue = getUltimateValue();
                        if(ultimateValue[key] != undefined){
                            return ultimateValue[key];
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
                        ultimateValue = getUltimateValue();

                        for(var k in ultimateValue){
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
                        ultimateValue = getUltimateValue();
                        if(ultimateValue == null){
                            ultimateValue = {};
                        }
                        ultimateValue[key] = data;

                        saveUltimateValue(ultimateValue);
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
                        ultimateValue = getUltimateValue();
                        if(ultimateValue[key] != undefined){
                            try {
                                delete(ultimateValue[key]);
                                saveUltimateValue(ultimateValue);
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
                        ultimateValue = {};
                        LocalStorageAdapter.remove(ultimateKey);
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
                create: function(id){
                    if(typeof id !== 'undefined'){
                        for(var i = 0; i < instances.length; i++){
                            if(typeof instances[i] === 'object' &&
                                instances[i].id == id){

                                return instance[i].instance;
                            }
                        }

                        var localStorage = new LocalStorageService();
                        localStorage.setInstanceId(id);

                        instances.push[{id:id,instance:localStorage}];

                        return localStorage;
                    }

                    return null;
                }
            }

        }]);
});
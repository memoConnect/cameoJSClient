define([
    'angular',
    'cmLogger'
],function () {
    'use strict';

    var cmLocalStorage = angular.module('cmLocalStorage', ['cmLogger']).
        service('LocalStorageAdapter',function(){
            return {
                check: function(){
                    try {
                        return 'localStorage' in window && window['localStorage'] !== null;
                    } catch(e){
                        return false;
                    }
                },

                get: function (key) {
                    try {
                        return localStorage.getItem(key);
                    } catch (e){
                        return "";
                    }
                },

                /**
                 * http://stackoverflow.com/questions/8419354/get-html5-localstorage-keys
                 */
                getAllKeys: function(){
                    try {
                        return Object.keys(localStorage);
                    } catch (e) {
                        return false;
                    }
                },

                save: function (key, data) {
                    try {
                        localStorage.setItem(key, data);
                        return true;
                    } catch (e){
                        return false;
                    }
                },

                remove: function (key) {
                    try {
                        localStorage.removeItem(key);
                        return true;
                    } catch (e){
                        return false;
                    }
                },

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
            var instanceId = "",
                useable = false,
                useableCheck = false,
                ultimateKey = "MULTIKEY"+instanceId,
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

            var LocalStorageService = function(){
                this.setInstanceId = function(id){
                    instanceId = id;

                    this.check();
                };

                this.check = function(){
                    if(useableCheck !== true){
                        useable = LocalStorageAdapter.check();
                        useableCheck = true;
                    }

                    return useable;
                };

                this.get =  function (key) {
                    if(this.check() !== false){
                        ultimateValue = getUltimateValue();
                        if(ultimateValue[key] != undefined){
                            return ultimateValue[key];
                        }
                    }

                    return "undefined";
                };

//                getAllKeys: function(){
//                    if(this.check() !== false){
//                        var keys = [];
//                        ultimateValue = getUltimateValue();
//                        console.log(ultimateValue)
//
//                        for(var k in ultimateValue){
//                            keys.push(k);
//                        }
//
//                        return keys;
//                    }
//
//                    return [];
//                },
//
//                save: function (key, data) {
//                    if(this.check() !== false){
//                        ultimateValue = getUltimateValue();
//                        if(ultimateValue == null){
//                            ultimateValue = {};
//                        }
//                        ultimateValue[key] = data;
//
//                        saveUltimateValue(ultimateValue);
//                        return true;
//                    }
//
//                    return false;
//                },
//
//                remove: function (key) {
//                    if(this.check() !== false){
//                        ultimateValue = getUltimateValue();
//                        if(ultimateValue[key] != undefined){
//                            try {
//                                delete(ultimateValue[key]);
//                                saveUltimateValue(ultimateValue);
//                                return true;
//                            } catch (e){
//                                //
//                            }
//                        }
//                    }
//
//                    return false;
//                },
//
//                clearAll : function () {
//                    if(this.check() !== false){
//                        ultimateValue = {};
//                        LocalStorageAdapter.remove(ultimateKey);
//                        return true;
//                    }
//
//                    return false;
//                }
            }

            return LocalStorageService;
        }]).
        factory('cmLocalStorage',['LocalStorageService', function(LocalStorageService){
            var instanceMock = [{id:'',instance:{}}];
            var instances = [];

            return {
                get: function(id){
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
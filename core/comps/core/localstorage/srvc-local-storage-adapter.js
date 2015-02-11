'use strict';

/**
 * @ngdoc object
 * @name cmLocalStorageAdapter
 * @description
 */
angular.module('cmCore')
.service('cmLocalStorageAdapter', [
    'cmLogger',
    '$window',
    function(cmLogger,
             $window){
        var self = {
            /**
             * check usability in browser
             * @returns {boolean}
             */
            check: function(){
                if(self.checkBrowserPlugin()){
                    return true;
                }

                try {
                    return 'localStorage' in $window && $window['localStorage'] !== null;
                } catch(e){
                    cmLogger.warn('LocalStorage Check - ' + e)

                    return false;
                }
            },

            checkBrowserPlugin: function(){
                return self.callPlugin('cmBrowser:checkAvailability',null,'cmBrowser:isAvailable').answer;
            },

            callPlugin: function(eventName, json, eventNameAnswer){
                var plugin_answer_found = false,
                    data = {},
                    iteration = 0;


                angular.element(window).off(eventNameAnswer);
                angular.element(window).one(eventNameAnswer, function(event){
                    data = event.detail;
                    plugin_answer_found = true;
                });

                function watchPluginAnswer(){
                    if(!plugin_answer_found && iteration <= 5){
                        iteration++;
                        watchPluginAnswer();
                    }

                    //while (!plugin_answer_found){
                    //    // do nothing...
                    //}
                }

                var event = new CustomEvent(eventName,{detail:json||{}});
                window.dispatchEvent(event);

                watchPluginAnswer();

                //if(!plugin_answer_found)
                //    console.log('plugin_answer_not_found',eventName,iteration)

                return {
                    answer: plugin_answer_found,
                    data: data
                };
            },

            /**
             * returns a value from a key
             * @param key
             * @returns {*}
             */
            get: function (key) {
                if(self.checkBrowserPlugin()){
                    var pluginResponse = self.callPlugin('cmBrowser:getItem',{key:key},'cmBrowser:setGetDone')
                    if(pluginResponse.answer) {
                        return pluginResponse.data.value;
                    }
                    //return "";
                }

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
                if(self.checkBrowserPlugin()){
                    var pluginResponse = self.callPlugin('cmBrowser:getAllKeys',null,'cmBrowser:getAllKeysDone')
                    if(pluginResponse.answer)
                        return Object.keys(pluginResponse.data.keys);
                    //return false;
                }

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
                if(self.checkBrowserPlugin()){
                    var pluginResponse = self.callPlugin('cmBrowser:setItem',{key:key,value:data},'cmBrowser:setItemDone');
                    if(pluginResponse.answer){
                        return true;
                    }
                    //return false;
                }

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
                if(self.checkBrowserPlugin()){
                    var pluginResponse = self.callPlugin('cmBrowser:removeItem',{key:key},'cmBrowser:removeItemDone');
                    if(pluginResponse.answer){
                        return true;
                    }
                    //return false;
                }

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
                if(self.checkBrowserPlugin()){
                    var pluginResponse = self.callPlugin('cmBrowser:clear',null,'cmBrowser:clearDone');
                    if(pluginResponse.answer){
                        return true;
                    }
                    //return false;
                }

                try {
                    $window.localStorage.clear();
                    return true;
                } catch (e){
                    cmLogger.warn('LocalStorage clearAll - ' + e)
                    return false;
                }
            }
        };
        return self;
    }
]);
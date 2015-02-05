'use strict';

angular.module('cmCore').provider('cmLogger', [
    '$logProvider',
    function($logProvider){
        var debug_enabled = true;

        this.debugEnabled = function(flag){
            $logProvider.debugEnabled(flag);
            debug_enabled = flag;
        };

        this.$get = [
            '$log',
            function($log){
            /**
            * Format date as a string
            */
            function getTimestampAsString() {
                var d = (new Date()+'').split(' ');
                return [d[3], d[1], d[2], d[4]].join(' ');
            }

            function prefix(type, msg) {
                return getTimestampAsString() + " [cmLogger-"+type.toUpperCase()+"]> "  + msg;
            }

            function log_object(obj) {
                console.groupCollapsed();
                console.dir(obj);
                console.groupEnd();
            }

            return {
                universal: function(type, loggerMessage, object) {
                    $log[type](prefix(type, loggerMessage))
                    if(object) log_object(object)
                },

                 /**
                 * simple info log wrapper
                 * @param loggerMessage String that should logged
                 * @object any object that will be logged using toString()
                 */
                info: function(loggerMessage, object){ this.universal('info', loggerMessage, object) },
                /**
                 * simple warn log wrapper
                 * @param loggerMessage String that should logged
                 * @object any object that will be logged using toString()
                 */
                warn: function(loggerMessage, object){ this.universal('warn', loggerMessage, object) },
                /**
                 * simple error log wrapper
                 * @param loggerMessage String that should logged
                 * @object any object that will be logged using toString()
                 */
                error: function(loggerMessage, object){ this.universal('error', loggerMessage, object) },
                /**
                 * simple debug log wrapper
                 * @param loggerMessage String that should logged
                 * @object any object that will be logged using toString()
                 */
                debug: function(loggerMessage, object){
                    if(!debug_enabled) return(undefined)
                    this.universal('debug', loggerMessage, object)
                }
            }
        }];
    }
]);
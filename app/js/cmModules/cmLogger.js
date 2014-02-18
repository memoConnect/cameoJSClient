define([
    'angular'
], function () {
    'use strict';

    /**
     * Simple wrapper around AngularJS Logger
     * Timestamp and log level will be added to each log message
     */
    var cmLogger = angular.module('cmLogger', []);

    cmLogger.provider('cmLogger', [

        '$logProvider',

        function($logProvider){

            this.debugEnabled = function(flag){
                $logProvider.debugEnabled(flag)
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

                    function prefix(msg) {
                        return getTimestampAsString() + " [cmLogger-INFO]> "  + msg
                    }

                    return {
                         /**
                         * simple info log wrapper
                         * @param loggerMessage String that should logged
                         * @object any object that will be logged using toString()
                         */
                        info: function(loggerMessage, object){
                            $log.info(prefix(loggerMessage) + " " + (object ? object.toString() : ""))
                        },
                        /**
                         * simple warn log wrapper
                         * @param loggerMessage String that should logged
                         * @object any object that will be logged using toString()
                         */
                        warn: function(loggerMessage, object){
                            $log.warn(prefix(loggerMessage) + " " + (object ? object.toString() : ""))
                        },
                        /**
                         * simple error log wrapper
                         * @param loggerMessage String that should logged
                         * @object any object that will be logged using toString()
                         */
                        error: function(loggerMessage, object){
                            $log.error(prefix(loggerMessage) + " " + (object ? object.toString() : ""))
                        },
                        /**
                         * simple debug log wrapper
                         * @param loggerMessage String that should logged
                         * @object any object that will be logged using toString()
                         */
                        debug: function(loggerMessage, object){
                            $log.debug(prefix(loggerMessage) + " " + (object ? JSON.stringify(object) : ""))
                        }
                    }
                }
            ]
        }
    ])

});
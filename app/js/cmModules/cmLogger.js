'use strict';

/**
 * Simple wrapper around AngularJS Logger
 * Timestamp and log level will be added to each log message
 */


var cmLogger = angular.module('cmLogger', [])

cmLogger.factory('cmLogger', [
    '$log',

    function($log){
        /**
         * Format date as a string
         */
        function getTimestampAsString() {
            var d = (new Date()+'').split(' ');
            return [d[3], d[1], d[2], d[4]].join(' ');
        }

        return {
            /**
             * simple info log wrapper
             * @param loggerMessage String that should logged
             */
            info: function(loggerMessage){
              $log.info(getTimestampAsString() + " [cmLogger-INFO]> "  + loggerMessage)
            }
            /**
             * simple info log wrapper
             * @param loggerMessage String that should logged
             * @object any object that will be logged using toString()
             */
            ,infoData: function(loggerMessage, object){
                this.info(loggerMessage + ": " + (object != null ? object.toString() : "NULL"))
            }
            /**
             * simple warn log wrapper
             * @param loggerMessage String that should logged
             */
            ,warn: function(loggerMessage){
                $log.warn(getTimestampAsString() + "[cmLogger-WARN]> " + loggerMessage)
            }
            /**
             * simple warn log wrapper
             * @param loggerMessage String that should logged
             * @object any object that will be logged using toString()
             */
            ,warnData: function(loggerMessage, object){
                this.warn(loggerMessage + ": " + (object != null ? object.toString() : "NULL"))
            }
            /**
             * simple error log wrapper
             * @param loggerMessage String that should logged
             */
            ,error: function(loggerMessage){
                $log.error(getTimestampAsString() + "[cmLogger-ERROR]> " + loggerMessage);
            }
            /**
             * simple error log wrapper
             * @param loggerMessage String that should logged
             * @object any object that will be logged using toString()
             */
            ,errorData: function(loggerMessage, object){
                this.error(loggerMessage + ": " + (object != null ? object.toString() : "NULL"))
            }
            /**
             * simple debug log wrapper
             * @param loggerMessage String that should logged
             */
            ,debug: function(loggerMessage){
                $log.debug(getTimestampAsString() + "[cmLogger-DEBUG]> " + loggerMessage)
            }
            /**
             * simple debug log wrapper
             * @param loggerMessage String that should logged
             * @object any object that will be logged using toString()
             */
            ,debugData: function(loggerMessage, object){
                this.debug(loggerMessage + ": " + (object != null ? object.toString() : "NULL"))
            }
        }
    }
]);

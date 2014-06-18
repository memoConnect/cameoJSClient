'use strict';

angular.module('cmCore')
.service('cmUtil', [
    '$q', 
    function($q){
        /**
         * Checks if Key exists in an Object or Array
         * @param object
         * @param key
         * @returns {boolean}
         */
        this.checkKeyExists = function(object, key){
            if(angular.isDefined(object) && (typeof object === 'object' || typeof object === 'array') && angular.isDefined(key) && key != ''){
                var arr = Object.keys(object);

                if(arr.indexOf(key) !== -1){
                    return true;
                }
            }

            return false;
        };

        /**
         * Creates a String for Limit-Offset Handling in Api-Calls
         * @param limit
         * @param offset
         * @returns {string}
         */
        this.handleLimitOffset = function(limit,offset){
            var s = '';

            if(angular.isDefined(limit) && this.validateInt(limit) !== false){
                s = '?limit=' + parseInt(limit);
            } else {
                //default limit
            }

            if(s != '' && angular.isDefined(offset) && this.validateInt(offset) !== false){
                s += '&offset=' + parseInt(offset);
            }

            return s;
        };

        /**
         * Validate Numbers
         * @param val
         * @returns {boolean}
         */
        this.validateInt = function(val){
            var reg = /^\d+$/;

            return reg.test(val);
        };

        /**
         * Validate Strings without Special Characters and Whitespaces
         * @param val
         * @returns {boolean}
         */
        this.validateString = function(val){
            var reg = /^[a-zA-Z0-9]{1,}$/;

            return reg.test(val);
        };

        /**
         * convert json to more row string
         * @param json
         * @returns well formated string
         */
        this.prettify = function(json){
            return JSON.stringify(json, undefined, 2);
        };

        /**
         * return key length of an object
         * @param obj
         * @returns {Number}
         */
        this.objLen = function(obj){
            if(obj == undefined)
                obj = {};
            return Object.keys(obj).length;
        };

        /**
         * convert first letter of string to Uppercase
         * @param string
         * @returns {string}
         */
        this.ucFirst = function(string){
            if(string == undefined || typeof string != 'string')
                string = '';

            string += '';
            var f = string.charAt(0).toUpperCase();
            return f + string.substr(1);
        };

        /**
         * converts bytes to human readable string
         * @param bytes
         * @returns {string}
         */
        this.bytesToStr = function(bytes) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0 || typeof bytes != 'number') return 'n/a';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        };

        /**
         * return a int between the range of min and max
         * @param min
         * @param max
         * @returns {int}
         */
        this.getRandomInt = function (min, max) {
            if(min == undefined || typeof min != 'number')
                return 0;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        /**
         * convert milliseconds to human readable string
         * @param milliseconds
         * @returns {string}
         */
        this.millisecondsToStr = function(milliseconds) {
            // TIP: to find current time in milliseconds, use:
            // var current_time_milliseconds = new Date().getTime();

            // This function does not deal with leap years, however,
            // it should not be an issue because the output is aproximated.
            function numberEnding (number) {
                return ""//(number > 1) ? '\'s' : '';
            }

            if(typeof milliseconds != 'number')
                return 'n/a';

            var temp = milliseconds / 1000;
            var years = Math.floor(temp / 31536000);
            if (years) {
                return years + 'y' + numberEnding(years);
            }
            var days = Math.floor((temp %= 31536000) / 86400);
            if (days) {
                return days + 'd' + numberEnding(days);
            }
            var hours = Math.floor((temp %= 86400) / 3600);
            if (hours) {
                return hours + 'h' + numberEnding(hours);
            }
            var minutes = Math.floor((temp %= 3600) / 60);
            if (minutes) {
                return minutes + 'm' + numberEnding(minutes);
            }
            var seconds = temp % 60;
            if (seconds) {
                return seconds + 's' + numberEnding(seconds);
            }
            return '< s'; //'just now' //or other string you like;
        };

        /**
         * return type of given variable especially for array and objects
         * @param x
         * @returns {String}
         */
        this.getType = function(x){
            if(typeof x == "string") return("String")

            var regex  = /\[object (.*)\]/,
                results = regex.exec(x.toString())

            return (results && results.length > 1) ? results[1] : "";
        };

        /**
         * check if string starts with needle
         * @param haystack
         * @param needle
         * @returns {boolean}
         */
        this.startsWith = function(haystack, needle){
            if(haystack == undefined || haystack == '' || needle == undefined) return false;
            return haystack.slice(0, needle.length) == needle;
        };

        /**
         * check if string ends with needle
         * @param haystack
         * @param needle
         * @returns {boolean}
         */
        this.endsWith = function (haystack, needle){
            if(haystack == undefined || haystack == '' || needle == undefined) return false;
            return haystack.slice(-needle.length) == needle;
        };

        this.isArray = function(value) {
            return toString.call(value) === '[object Array]';
        }
    }
]);
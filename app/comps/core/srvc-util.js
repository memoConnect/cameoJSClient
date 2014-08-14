'use strict';

angular.module('cmCore')
.service('cmUtil', [
    '$window',
    function($window){
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
            var reg = /^[a-zA-Z0-9\-]{1,}$/;

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

            function addToString(newStr){//addWhiteSpace
                str+= (str != '' ? ' ': '')+newStr
            }

            if(typeof milliseconds != 'number')
                return 'n/a';

            var str = '',
                temp = milliseconds / 1000,
                years = Math.floor(temp / 31536000);

            if (years)
                addToString(years + 'y');

            var days = Math.floor((temp %= 31536000) / 86400);
            if (days)
                addToString(days + 'd');

            var hours = Math.floor((temp %= 86400) / 3600);
            if (hours)
                addToString(hours + 'h');

            var minutes = Math.floor((temp %= 3600) / 60);
            if (minutes)
                addToString(minutes + 'm');

            var seconds = temp % 60;
            if (seconds)
                addToString(Math.floor(seconds) + 's');

            if(str == '')
                addToString('< s');

            return str;
        };

        /**
         * return type of given variable especially for array and objects
         * @param x
         * @returns {String}
         */
        this.getType = function(x){
            if(typeof x == 'string') return('String')

            var regex  = /\[object (.*)\]/,
                results = regex.exec(x.toString())

            return (results && results.length > 1) ? results[1] : '';
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
            return Object.prototype.toString.call(value) === '[object Array]';
        };

        this.isAlphaNumeric = function(id, length){
            var alphNumericRegExp = "^[a-zA-Z0-9]{"+(length||20)+"}$";
            var matches = id ? String(id).match(alphNumericRegExp) : null;
            return matches != null;
        };

        this.detectOSAndBrowser = function() {
            var nVer = $window.navigator.appVersion,
                nAgt = $window.navigator.userAgent,
                browserName = $window.navigator.appName,
                nameOffset, verOffset;

            // In Opera, the true version is after 'Opera' or after 'Version'
            if ((verOffset = nAgt.indexOf('Opera')) != -1 || (verOffset = nAgt.indexOf('OPR')) != -1) {
                browserName = 'Opera';
            }
            // In MSIE, the true version is after 'MSIE' in userAgent
            else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                browserName = 'Internet Explorer';
            }
            // Native Android
            else if ((verOffset = nAgt.indexOf('Linux; U; Android')) != -1) {
                browserName = 'Native Browser';
            }
            // In Chrome, the true version is after 'Chrome'
            else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                browserName = 'Google Chrome';
            }
            // In Safari, the true version is after 'Safari' or after 'Version'
            else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                browserName = 'Safari';
            }
            // In Firefox, the true version is after 'Firefox'
            else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                browserName = 'Mozilla Firefox';
            }
            // In most other browsers, 'name/version' is at the end of userAgent
            else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                browserName = nAgt.substring(nameOffset, verOffset);

                if (browserName.toLowerCase() == browserName.toUpperCase()) {
                    browserName = navigator.appName;
                }
            }
            var OSName = 'unknown OS';

            if (nVer.indexOf('Win') != -1)
                OSName = 'Windows';

            if (nVer.indexOf('like Mac OS X') != -1)
                OSName = 'iOS';
            else if (nVer.indexOf('Mac') != -1)
                OSName = 'Mac OS X';

            if(nVer.indexOf('Android') != -1)
                OSName = 'Android';
            else if (nVer.indexOf('X11') != -1)
                OSName = 'UNIX';
            else if (nVer.indexOf('Linux') != -1)
                OSName = 'Linux';

            return {
                os: OSName,
                browser: browserName
            };
        };
    }
]);
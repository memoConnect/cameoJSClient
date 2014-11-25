'use strict';

angular.module('cmCore')
.service('cmUtil',
    function(cmLogger, $window, $injector, $document){
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
        this.handleLimitOffset = function(limit,offset,timeLimit){
            var s = '';

            if(angular.isDefined(timeLimit) && this.validateInt(timeLimit) !== false){
                s = '?timeLimit=' + parseInt(timeLimit);
            } else {
                if(angular.isDefined(limit) && this.validateInt(limit) !== false){
                    s = '?limit=' + parseInt(limit);
                } else {
                    //default limit
                }

                if(s != '' && angular.isDefined(offset) && this.validateInt(offset) !== false){
                    s += '&offset=' + parseInt(offset);
                }
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
            var reg     = /^[a-zA-Z0-9\-_]{1,}$/,
                valid   = reg.test(val)

            if(!valid)
                cmLogger.debug('cmUtil: validateString() failed for: ' + val)

            return valid;
        };

        /**
         * convert json to more row string
         * @param json
         * @returns well formated string
         */
        this.prettify = function(json){

            function censor(censor) {
                var i = 0;

                return function(key, value) {
                    if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value)
                        return '[Circular]';

                    if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
                        return '[Unknown]';

                    ++i; // so we know we aren't using the original object anymore

                    return value;
                }
            }

            return JSON.stringify(json, censor(json), 2);
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
         *
         * @param current (integer) unix timestamp in ms
         * @param prev (integer) unix timestamp in ms
         * @returns {boolean} returns true, if day is different
         */
        this.compareDate = function(current, prev){
            if (typeof current !== 'undefined' && typeof prev !== 'undefined') {
                if (current > prev) {
                    var cDate = new Date(current);
                    var pDate = new Date(prev);

                    if ((cDate.getUTCFullYear() > pDate.getUTCFullYear())
                        || (cDate.getUTCMonth() > pDate.getUTCMonth())
                        || (cDate.getUTCDate() > pDate.getUTCDate())
                    ) {
                        return true;
                    }
                }
            } else if (typeof current !== 'undefined' && typeof prev === 'undefined') {
                return true;
            }
            return false;
        };

        /**
         * convert milliseconds to human readable string
         * @param milliseconds
         * @returns {string}
         */
        this.millisecondsToStr = function(milliseconds, printOutMs) {
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
            if (seconds && !printOutMs)
                addToString(Math.floor(seconds) + 's');

            if(seconds && printOutMs)
                addToString(temp + 's');

            if(str == '')
                addToString('...');

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

        this.scrollToInputError = function() {

            function getOffsetSum(elem) {
                var top=0, left=0;
                while(elem) {
                    top = top + parseInt(elem.offsetTop);
                    left = left + parseInt(elem.offsetLeft);
                    elem = elem.offsetParent;
                }
                return {top: top, left: left};
            }

            var el          = document.querySelector("cm-input-error") || document.querySelector("form .ng-invalid"),
                offset      = getOffsetSum(el),
                bodyAndHtml = angular.element($document[0].querySelectorAll('body,html')),
                cmHeader    = angular.element($document[0].querySelector('cm-header'))

            console.log(el)

            angular.forEach(bodyAndHtml, function (tag) {
                tag.scrollTop = offset.top - cmHeader[0].offsetHeight - 10; //-10 for the looks
            })
        }
    }
);
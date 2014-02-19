define([
    'angular'
], function () {
    'use strict';

    var util = angular.module('Util',[]);

    util.service('Util', function(){
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
        }

        this.validateInt = function(val){
            var reg = /^\d+$/;

            return reg.test(val);
        }
    });
});
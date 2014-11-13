'use strict';

angular.module('cmPhonegap')
.factory('$cordova', ['cmPhonegap',
    function(cmPhonegap){
        function init(){
            return typeof cordova != 'undefined' ? cordova : 'undefined';
        }

        var $cordova = init();

        cmPhonegap.isReady(function(){
            $cordova = init();
        });

        return {
            get: function () {
                return $cordova;
            }
        }
    }
]);
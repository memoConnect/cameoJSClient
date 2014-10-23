'use strict';

angular.module('cmPhonegap')
.factory('$device', ['cmPhonegap',
    function(cmPhonegap){
        function init(){
            return typeof device != 'undefined' ? device : undefined;
        }

        var $device = init();

        cmPhonegap.isReady(function(){
            $device = init();
        });

        return {
            get: function () {
                return $device;
            }
        }
    }
]);
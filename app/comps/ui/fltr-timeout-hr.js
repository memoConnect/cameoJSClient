'use strict';

angular.module('cmUi').filter('cmTimeoutHumanReadable', [
    'cmUtil',
    function(cmUtil){
        return function(milliseconds){
            return cmUtil.millisecondsToStr(milliseconds);
        }
    }
]);
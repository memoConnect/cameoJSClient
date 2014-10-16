'use strict';

angular.module('cmUi').filter('cmBytesHumanReadable', [
    'cmUtil',
    function(cmUtil){
        return function(bytes){
            return cmUtil.bytesToStr(bytes);
        }
    }
]);
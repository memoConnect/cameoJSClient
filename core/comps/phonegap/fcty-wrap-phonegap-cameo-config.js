'use strict';

angular.module('cmPhonegap')
.factory('$phonegapCameoConfig', [
    function(){
        return typeof phonegapCameoConfig != 'undefined' ? phonegapCameoConfig : 'undefined';
    }
]);
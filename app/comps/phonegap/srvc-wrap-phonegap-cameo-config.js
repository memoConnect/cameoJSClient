'use strict';

angular.module('cmPhonegap')
.factory('$phonegapCameoConfig', function(){
    return typeof phonegap_cameo_config != 'undefined' ? phonegap_cameo_config : undefined;
});
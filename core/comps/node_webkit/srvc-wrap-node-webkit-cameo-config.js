'use strict';

angular.module('cmNodeWebkit').service('$nodeWebkitCameoConfig', [
    function(){
        return typeof nodeWebkitCameoConfig != 'undefined' ? nodeWebkitCameoConfig : 'undefined';
    }
]);
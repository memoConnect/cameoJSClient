'use strict';

angular.module('cmNodeWebkit').service('cmNodeWebkit', [
    'cmDevice', '$nodeWebkitCameoConfig',
    function(cmDevice, $nodeWebkitCameoConfig){
        var cmNodeWebkit = {
            isAvailable: function(whoIs, callback){
                //cmLogger.debug('cmNodeWebkit.isAvailable - called from -> ' + whoIs);

                if(cmDevice.isNodeWebkit() && $nodeWebkitCameoConfig == 'undefined' || !$nodeWebkitCameoConfig.isNodeWebkit){
                    return false;
                }

                if(typeof callback == 'function') {
                    callback();
                }

                return true;
            }
        };

        return cmNodeWebkit;
    }
]);
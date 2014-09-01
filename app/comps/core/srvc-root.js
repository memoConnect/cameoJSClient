'use strict';

angular.module('cmCore').service('cmRoot', [
    'cmLogger',
    'cmJob',
    '$location',
    function(cmLogger, cmJob, $location){
        this.goTo = function(path, replace){
            cmLogger.debug('cmRoot.goTo');

            path = path[0] == '/' ? path : '/'+path;
            $location.path(path);

            //Todo: find foifferent solution:
            if(replace){
                $location.replace();
            }
        };
    }
]);
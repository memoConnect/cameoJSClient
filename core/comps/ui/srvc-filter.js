'use strict';

angular.module('cmUi')
.service('cmFilter',[
    'cmLogger',
    function(cmLogger){
        var self = this,
            currentFilter = '';

        this.clear = function(){
            //cmLogger.debug('cmFilter.clear');

            currentFilter = '';
        };

        this.get = function(){
            //cmLogger.debug('cmFilter.get');

            return currentFilter;
        };

        this.set = function(f){
            //cmLogger.debug('cmFilter.set');

            if(typeof f == 'string' && f != ''){
                currentFilter = f;
            }
        }
    }
]);
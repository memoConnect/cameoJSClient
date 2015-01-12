'use strict';

angular.module('cmUi')
.service('cmFilter',[
    'cmLogger',
    function(cmLogger){
        var self = this,
            currentFilter = '',
            currentResults = 0;

        this.clear = function(){
            //cmLogger.debug('cmFilter.clear');

            currentFilter = '';
            currentResults = 0;
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
        };

        this.getResultLength = function(){
            //cmLogger.debug('cmFilter.getResultLength');

            return currentResults;
        }

        this.setResultLength = function(l){
            //cmLogger.debug('cmFilter.setResultLength');

            if(typeof l == 'number'){
                currentResults = l;
            }
        }
    }
]);
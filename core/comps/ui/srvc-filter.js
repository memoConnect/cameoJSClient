'use strict';

angular.module('cmUi')
.service('cmFilter',[
    'cmLogger',
    '$rootScope',
    function(cmLogger, $rootScope){
        var self = this,
            currentFilter = '',
            currentResults = 0,
            onClearCallbacks = [];

        this.clear = function(bool){
            //cmLogger.debug('cmFilter.clear');

            currentFilter = '';
            currentResults = 0;

            onClearCallbacks.forEach(function(obj){
                obj.callback();
            });
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
        };

        this.setResultLength = function(l){
            //cmLogger.debug('cmFilter.setResultLength');

            if(typeof l == 'number'){
                currentResults = l;
            }
        };

        this.onClear = function(identifer,callback){
            if(typeof identifer == 'string' && typeof callback == 'function'){
                var exists = false,
                    i = 0;

                while(i < onClearCallbacks.length){
                    if(onClearCallbacks[i].identifier == identifer){
                        exists = true;
                        break;
                    }

                    i++;
                }

                if(!exists){
                    onClearCallbacks.push({identifier:identifer,callback:callback});
                }
            }
        };

        /**
         * event handling
         */
        $rootScope.$on('logout', function(){
            self.clear();
            onClearCallbacks = [];
        });
    }
]);
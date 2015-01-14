'use strict';

angular.module('cmUi')
.service('cmFilter',[
    'cmLogger',
    '$rootScope',
    function(cmLogger, $rootScope){
        var self = this,
            currentFilter = '',
            currentResults = 0,
            onClearCallbacks = [],
            onUpdateCallbacks = [];

        this.clear = function(){
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

                onUpdateCallbacks.forEach(function(obj){
                    obj.callback();
                });
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

        this.onUpdate = function(identifer,callback){
            if(typeof identifer == 'string' && identifer.length > 0 && typeof callback == 'function'){
                var exists = false,
                    i = 0;

                while(i < onUpdateCallbacks.length){
                    if(onUpdateCallbacks[i].identifier == identifer){
                        exists = true;
                        break;
                    }

                    i++;
                }

                if(!exists){
                    onUpdateCallbacks.push({identifier:identifer,callback:callback});
                }
            }
        };

        this.onClear = function(identifer,callback){
            if(typeof identifer == 'string' && identifer.length > 0 && typeof callback == 'function'){
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

        this.removeOnUpdate = function(identifer){
            if(typeof identifer == 'string' && identifer.length > 0){
                var i = 0,
                    index;

                while(i < onUpdateCallbacks.length){
                    if(onUpdateCallbacks[i].identifier == identifer){
                        index = i;
                        break;
                    }

                    i++;
                }

                onUpdateCallbacks.splice(index, 1);
            }
        };

        this.removeOnClear = function(identifer){
            if(typeof identifer == 'string' && identifer.length > 0){
                var i = 0,
                    index;

                while(i < onClearCallbacks.length){
                    if(onClearCallbacks[i].identifier == identifer){
                        index = i;
                        break;
                    }

                    i++;
                }

                onClearCallbacks.splice(index, 1);
            }
        };

        /**
         * event handling
         */
        $rootScope.$on('logout', function(){
            self.clear();
            onClearCallbacks = [];
            onUpdateCallbacks = [];
        });
    }
]);
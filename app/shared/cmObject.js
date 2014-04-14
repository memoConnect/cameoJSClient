'use strict';

angular.module('cmObject', [])
.service('cmObject', [
    function(){
        var self = this

        this.addEventHandlingTo = function(obj){
            obj._callbacks = {}

            obj.trigger = function(event_name, data){
                var callback = obj.callbacks[event_name] || function(){}

                callback.apply(obj, [data])

                return obj
            }

            obj.on = function(event_name, callback){
                obj._callbacks[event_name] = callback
                return obj
            }

            return(this)
        }
    }
])
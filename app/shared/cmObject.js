'use strict';

angular.module('cmObject', [])
.service('cmObject', [
    function(){
        var self = this

        this.addEventHandlingTo = function(obj){
            obj._callbacks = {}

            obj.trigger = function(event_name, data){
                obj._callbacks[event_name] = obj._callbacks[event_name] || []

                obj._callbacks[event_name].forEach(function(callback){
                    callback.apply(obj, [data])
                })

                return obj
            }

            obj.on = function(event_name, callback){
                obj._callbacks[event_name] = obj._callbacks[event_name] || []
                obj._callbacks[event_name].push(callback)
                return obj
            }

            return(this)
        }
    }
])
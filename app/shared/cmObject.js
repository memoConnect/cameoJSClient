'use strict';

angular.module('cmObject', [])
.service('cmObject', [

    '$q',

    function($q){
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


        this.addChainHandlingTo = function(obj){
            obj._chains = {}


            obj.$chain = function(name){
                name  = name || 'default'

                obj._chains[name] = {}
                obj._chains[name].deferred = $q.defer()

                obj._chains[name].deferred.resolve()

                for(var key in obj){

                    if(typeof obj[key] == 'function'){
                        obj._chains[name][key] = function(){
                            var args = Array.prototype.slice.call(arguments, 0)

                            obj._chains[name].deferred.promise
                            .then(function(result){
                                return obj[key].apply(obj, args.length > 0 ? args : result)                                 
                            })
                            return obj._chains[name]
                        }

                    } 
                }
                return obj._chains[name]
            }
        }
        
    }
])
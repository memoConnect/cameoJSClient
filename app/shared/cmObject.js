'use strict';

angular.module('cmObject', [])
.service('cmObject', [

    '$q',

    function($q){
        var self = this

        this.addEventHandlingTo = function(obj){
            obj._callbacks = {}

            obj.trigger = function(event_name, data){

                var event = { target : obj }

                obj._callbacks[event_name] = obj._callbacks[event_name] || []

                obj._callbacks[event_name].forEach(function(callback){
                    callback.apply(obj, [event, data])
                })

                return obj
            }

            obj.on = function(event_names, callback){
                var event_names = event_names instanceof Array ? event_names : event_names.split(' ') 

                event_names.forEach(function(event_name){
                    obj._callbacks[event_name] = obj._callbacks[event_name] || []
                    obj._callbacks[event_name].push(callback)
                })

                return obj
            }

            return this 
        }


        this.addChainHandlingTo = function(obj){
            obj._chains = {}

            function Chain(obj){
                var deferred     = $q.defer(),
                    self         = this,
                    last_promise = deferred.promise


                angular.forEach(obj, function(value, key){                    
                    if(typeof obj[key] != 'function')  return null

                    self[key] = function(){
                        var args = Array.prototype.slice.call(arguments, 0)

                        last_promise = last_promise.then(function(result){                                
                            return obj[key].apply(obj, args.length > 0 ? args : [result])                                 
                        })

                        return self
                    }
                })

                self.then = function(){                    
                    last_promise = last_promise.then.apply(last_promise, Array.prototype.slice.call(arguments, 0))
                    return self
                }

                deferred.resolve()

                return self
            }


            obj.$chain = function(name){
                name  = name || 'default'

                obj._chains[name] = obj._chains[name] || new Chain(obj)
                
                return obj._chains[name]
            }

            return this 
        }
        
    }
])
'use strict';

angular.module('cmObject', [])
.service('cmObject', [

    '$q',

    function($q){
        var self = this

        this.addEventHandlingTo = function(obj){
            obj._callbacks = {}

            function _call(cb, event, data){
                var cb_result    = cb.fn.apply(obj, [event, data]),
                    limit_set    = typeof cb.limit == "number",
                    cb_complete  = limit_set 
                                   ?    cb_result == true || cb_result == undefined     
                                   :    cb_result == true 
                    
                 
                if(limit_set && cb_complete) cb.limit--

                var call_again   = limit_set
                                   ?    cb.limit > 0
                                   :    !cb_complete

                return call_again
            }

            obj.trigger = function(event_name, data){                
                var event = { target : obj }

                obj._callbacks[event_name] = obj._callbacks[event_name] || []

                obj._callbacks[event_name].forEach(function(callback_obj, index){
                    if(!_call(callback_obj, event, data)) delete obj._callbacks[event_name][index]
                })

                return obj
            }

            obj.on = function(event_names, callback, limit){
                var event_names = event_names instanceof Array ? event_names : event_names.split(' ') 

                event_names.forEach(function(event_name){
                    obj._callbacks[event_name] = obj._callbacks[event_name] || []
                    obj._callbacks[event_name].push({
                        'fn' : callback,
                        'limit': limit || false
                    })
                })

                return obj
            }

            obj.off = function(event_names, callback){
                var event_names = event_names instanceof Array ? event_names : event_names.split(' ') 
                
                event_names.forEach(function(event_name){
                    if(!callback) obj._callbacks[event_name] = []

                    obj._callbacks[event_name].forEach(function(cb, index){
                        if(cb == callback) delete obj._callbacks[event_name][index]
                    })
                })
            }

            obj.one = function(event_names, callback){
                obj.on(event_names, callback, 1)
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
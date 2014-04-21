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

            function Chain(obj){
                var deferred = $q.defer()
                    self     = deferred.promise

                for(var key in obj){
                    
                    if(typeof obj[key] == 'function'){
                        var function_name = key
                        self[function_name] = function(){
                            console.log(function_name)
                            var args = Array.prototype.slice.call(arguments, 0)

                            self.then(function(result){                                
                                return obj[function_name].apply(obj, args.length > 0 ? args : result)                                 
                            })

                            return self
                        }

                    } 
                }

                deferred.resolve()



                return self
            }


            obj.$chain = function(name){
                name  = name || 'default'

                obj._chains[name] = new Chain(obj)
                
                return obj._chains[name]
            }
        }
        
    }
])
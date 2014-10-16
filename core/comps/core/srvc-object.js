'use strict';

//This service provides extra funcionality for core objects

/**
 * @ngdoc service
 * @name cmObject
 * @description
 *  
 */
angular.module('cmCore')
.service('cmObject', [

    'cmLogger',
    'cmUtil',
    '$q',
    '$timeout',

    function(cmLogger, cmUtil, $q, $timeout){
        var self = this

        /**
         * @ngdoc method
         * @methodOf cmObject
         * @name addEventHandlingTo
         * @description
         * Function to add basic event handling to any object, to bubbling up or down provided
         * @param {Object} obj any object to extend with event ahndlung capabilities
         */

        this.addEventHandlingTo = function(obj){
            obj._callbacks = {}
            obj._receptors = []


            /**
             * Function to call a callback bound to an event. This function is not meant to me called from outside the object.
             * @param  {Function} cb    callback function
             * @param  {Object}   event event data to be passed to the callback function
             * @param  {Object}   data  extra data to be passed to the callback function
             * @return {boolean}  returns if the callback should be called on the next occurance of event or not         
             */
            
            function _call(cb, event, data){
                var cb_result    = cb.fn.apply(obj, [event, data]),     //call the callback on the base object
                    limit_set    = typeof cb.limit == "number",         //check if the number of calls should be limited
                    cb_complete  = limit_set                            //check if the call should count as successful (and thus recude the number number of future calls)
                                   ?    cb_result == true || cb_result == undefined //if there is no return value treat the call as successful (default)
                                   :    cb_result == true               //if there is no limit set, the number of calls is unlimited anyway
                    
                 
                if(limit_set && cb_complete) cb.limit-- //reduce number of future calls of callback for event

                var call_again   = limit_set            
                                   ?    cb.limit > 0
                                   :    !cb_complete

                return call_again
            }


            /**
             * Function to trigger callback bound to an event
             * @param  {string} event_name Name of the event to trigger
             * @param  {Object} data       Data to be passsed to the callback function
             * @return {Object}            returns the base object for chaining
             */
            
            obj.trigger = function(event_name, data, event_data){
                var event = {
                                target :    obj,  
                                source :    obj ,
                                name :      event_name
                            }

                angular.extend(event, event_data)

                obj._callbacks[event_name] = obj._callbacks[event_name] || []   //create the according callback array, if neccessary

                //if(obj._callbacks[event_name].length == 0)
                    //cmLogger.debug('Event "'+event_name+'" triggered, but no callbacks registered.')

                obj._callbacks[event_name].forEach(function(callback_obj, index){
                    // call callback function and delete if need be, see ._call()
                    if(!_call(callback_obj, event, data)){
                        delete obj._callbacks[event_name][index]
                    }
                })

                // Remove undefined entries:
                obj._callbacks[event_name] = obj._callbacks[event_name].filter(function(item){ return item != undefined})

                obj._receptors.forEach(function(receptor){
                    receptor.trigger(event_name, data, {source : event.source} )
                })

                return obj
            }

            /**
             * Function to bind a call back to event(s).
             * @param  {String}   event_names Names of the events to bind to. Multiple event names should be separated by ' '.
             * @param  {Function} callback    Function to call, when the event is triggered. Should return wether the call was successfull or not.
             * @param  {number}   [limit]     Number of times the callback should be (succsessfully) called. If not provided, there is no limit to the number of calls.
             * @return {Object}               returns the object for chaining.
             */
            
            obj.on = function(event_names, callback, limit){
                var event_names = event_names instanceof Array ? event_names : event_names.split(' ') 

                event_names.forEach(function(event_name){
                    obj._callbacks[event_name] = obj._callbacks[event_name] || [] //create according callback array, if neccessary
                    obj._callbacks[event_name].push({       // add callback object with callback function an limit for number of calls
                        'fn' : callback,
                        'limit': limit || false
                    })
                })

                return obj
            }

            /**
             * Function to remove binding of a callback function to an event.
             * @param  {String}   event_names Names of the events to bind to. Multiple event names should be separated by ' '.
             * @param  {Function} callback    Funcation that has been bound to an event.
             * @return {Object}               returns the object for chaining.
             */
            obj.off = function(event_names, callback){
                var event_names = event_names instanceof Array ? event_names : event_names.split(' ') 
                
                event_names.forEach(function(event_name){
                    if(!callback) obj._callbacks[event_name] = []

                    obj._callbacks[event_name] = obj._callbacks[event_name] || []

                    if(event_name in obj._callbacks) {
                        obj._callbacks[event_name].forEach(function (callback_obj, index) {
                            if (callback_obj.fn == callback) delete obj._callbacks[event_name][index]
                        })
                    }
                })

                return obj
            }

            /**
             * Function to bind a call back to event(s). Unbind after triggered once.
             * @param  {String}   event_names Names of the events to bind to. Multiple event names should be separated by ' '.
             * @param  {Function} callback    Function to call, when the event is triggered. Should return wether the call was successfull or not.
             * @param  {number}   [limit]     Number of times the callback should be (succsessfully) called. If not provided, there is no limit to the number of calls.
             * @return {Object}               returns the object for chaining.
             */
            obj.one = function(event_names, callback){
                obj.on(event_names, callback, 1)
                return obj
            }

            /**
             * Function to convert an event to a promise
             * @param  {String} event_names     Names of the events to listen to. Multiple event names should be separated by ' '.
             * @return {promise}                Promise to be resolved when the event triggers for the first time
             */
            obj.when = function(event_names_to_resolve, event_names_to_reject, timeout){
                if(event_names_to_reject && isNaN(event_names_to_reject)){
                    obj.one(event_names_to_reject, function(event, data){
                        deferred.reject( {event: event, data: data} )
                        return true
                    })
                } else {
                    timeout = timeout || event_names_to_reject
                }

                var deferred = $q.defer()

                obj.one(event_names_to_resolve, function(event, data){
                    deferred.resolve( {event: event, data: data} )
                    return true
                })

                if(typeof timeout == 'number'){
                    $timeout(function(){
                        deferred.reject('timeout')
                    }, timeout)
                }

                return deferred.promise
            }

            /**
             * @methodOf 
             * @name  brodcastEventsTo
             *
             * @description
             * Function to brodacast event from on event to another.
             * 
             * @param  {object} receptor    Any object with event handling.
             * @returns {*}     this        Returns itself for chaining.         
             */
            obj.broadcastEventsTo = function(receptor){
                if(receptor && typeof receptor.trigger == 'function'){
                    this._receptors.push(receptor)
                } else {
                    //cmLogger.debug('cmObject: EventHandling: unable to add receptor.', obj)
                }

                return obj
            }

            /**
             * @name echoEventsFrom
             * @description 
             * Retriggers every event of source object on itself.
             *
             * @param   {*}          source Source object.
             * @returns {*}  this    Returns itself for chaining.
             */
            obj.echoEventsFrom = function(source){
                if(source && typeof source.broadcastEventsTo == 'function'){
                    source.broadcastEventsTo(obj)
                } else {
                    //cmLogger.debug('cmObject: EventHandling: unable to echo Events.', obj)
                }
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
]);
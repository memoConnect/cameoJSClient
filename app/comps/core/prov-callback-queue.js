'use strict';

angular.module('cmCore')
.provider('cmCallbackQueue', [

    function(){

        var queueTime = 250

        this.setQueueTime = function(time){
            queueTime = time
        }

        this.$get = [

            'cmObject',
            'cmStateManagement',
            '$timeout',
            '$q',

            function(cmObject, cmStateManagement, $timeout, $q){
                cmObject.addEventHandlingTo(this)

                var self    = this,
                    queue   = []

                this.state = new cmStateManagement(['working'])

                this.push = function(callbacks, timeout){

                    if(!(callbacks instanceof Array)) 
                        callbacks = [callbacks]

                    var promise = $q.all(
                        callbacks.map(function(callback){
                            var deferred = $q.defer()

                            queue.push({fn: callback, deferred: deferred})

                            return deferred.promise
                        })
                    )

                    if(!self.state.is('working')){
                        self.state.set('working')
                        $timeout(self.advance, timeout || 0)
                    }

                    return promise
                }

                this.advance = function(){
                    var callback = queue.shift()
                
                    if(callback && callback.fn && callback.deferred){
                        try{                            
                            callback.deferred.resolve(callback.fn())  
                        } catch(e) {
                            callback.deferred.reject(e)
                        }
                    }
                    
                    if(queue.length != 0){
                        $timeout(self.advance, queueTime)
                    } else {
                        self.state.unset('working')
                    }



                }

                return this
            }
        ]
    }
])
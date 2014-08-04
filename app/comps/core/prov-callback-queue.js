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

                this.push = function(callbacks){

                    if(!(callbacks instanceof Array)) 
                        callbacks = [callbacks]


                    return $q.all(
                        callbacks.map(function(callback){
                            var deferred = $q.defer()

                            queue.push({fn: callback, deferred: deferred})

                            if(!self.state.is('working')){
                                self.state.set('working')
                                self.advance()
                            }

                            return deferred.promise
                        })
                    )
                }

                this.advance = function(){
                    $timeout(function(){ 
                        var callback = queue.shift()
                    
                        if(callback && callback.fn && callback.deferred){
                            try{                            
                                callback.deferred.resolve(callback.fn())  
                            } catch(e) {
                                callback.deferred.reject(e)
                            }
                        }
                        
                        if(queue.length != 0){
                            self.advance()                             
                        } else {
                            self.state.unset('working')
                        }

                    }, queueTime)

                }

                return this
            }
        ]
    }
])
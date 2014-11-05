'use strict';

angular.module('cmCore')
.service('cmWebworkerFactory',[

    '$q',
    '$timeout',
    'cmObject',

    function cmWebWorkerFactory($q, $timeout, cmFactory){

        function cmWebWorker(data){
            var self        =   this

            this.worker     =   new Worker('webworker/'+data.jobName+'.js')
            this.params     =   data.params
            this.deferred   =   undefined

            cmObject.addEventHandlingTo(this)

            var onMessage   =   function(event){
                                    if(event.data.msg == 'finished'){
                                        self.deferred.resolve(event.data.result);
                                        self.terminate()
                                    }

                                    if(['canceled', 'failed', 'error'].indexOf(event.data.msg) != -1){
                                        self.deferred.reject(event.data);
                                        self.terminate()
                                    }

                                    if(event.data.msg == 'notify')
                                        self.deferred.notify(event.data.notify)
                                }

            this.run = function(timeout){

                //if the worker is already running, return its promise
                if(self.deferred)
                    return this.deferred.promise

                self.deferred = $q.defer()

                if(timeout)
                    $timeout(function(){ 
                        self.deferred.reject('timeout');
                        self.cancel()
                    }, timeout);


                data.cmd = 'start'

                worker.addEventListener('message', onMessage)
                worker.postMessage(this.params)

                return  self.deferred.promise
            };

            this.cancel = function(){                
                worker.postMessage({cmd: 'cancel'})
                return  self.deferred.promise
                        .catch(function(reason){
                            return  data.msg == 'canceled'
                                    ?   $q.when('canceled')
                                    :   $q.reject(reason)
                        })
            };

            this.terminate = function(){
                worker.removeEventListener('message', onMessage)
                worker.terminate()
                this.worker      = null
                this.deferred    = null
                this.params      = null
                this.trigger('done')
            }
        }
        
        var self =  cmFactory(cmWebWorker, 
                        //sameByData:
                        function(instance, data){
                        return      instance.jobName = data.jobName
                                &&  JSON.stringify(instance.params) == JSON.stringify(data.params)
                        }
                    )


        this.new = function(data){
            return  !!window.Worker
                    ?   $q.when(
                            self.create(data)
                            .on('done', function(event){
                                console.dir(event)
                                self.trigger('worker:done', this)
                            })
                        )
                    :   $q.reject('Browser does not support webWorkers.')
        }    

    }

]);
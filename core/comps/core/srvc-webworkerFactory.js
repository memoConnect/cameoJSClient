'use strict';

angular.module('cmCore')
.service('cmWebworkerFactory',[

    '$q',
    'cmFactory',
    'cmObject',

    function cmWebWorkerFactory($q, cmFactory, cmObject){

        var limit = 5

        function cmWebWorker(data){
            var instance    =   this,
                worker      =   undefined,
                deferred    =   undefined,
                onMessage   =   undefined

            instance.params     =   data.params
            instance.jobName    =   data.jobName

            cmObject.addEventHandlingTo(instance)

            this.run = function(timeout){

                //if the worker is already running, return its promise
                if(deferred)
                    return deferred.promise

                worker      = new Worker('webworker/'+data.jobName+'.js')
                deferred    = $q.defer()

                if(timeout)
                    $timeout(function(){ 
                        deferred.reject('timeout');
                        instance.cancel()
                    }, timeout);


                onMessage   =   function(event){
                                    if(event.data.msg == 'finished'){
                                        deferred.resolve(event.data.result);
                                        instance.terminate()
                                    }

                                    if(['canceled', 'failed', 'error'].indexOf(event.data.msg) != -1){
                                        deferred.reject(event.data);
                                        instance.terminate()
                                    }

                                    if(event.data.msg == 'notify')
                                        deferred.notify(event.data)
                                }

                worker.addEventListener('message', onMessage)
                worker.postMessage({
                    cmd:        'start',
                    params:     data.params
                })


                return deferred.promise
            };

            this.cancel = function(){                
                worker.postMessage({cmd: 'cancel'})
                return  deferred.promise
                        .catch(function(reason){
                            return  data.msg == 'canceled'
                                    ?   $q.when('canceled')
                                    :   $q.reject(reason)
                        })
            };

            this.terminate = function(){
                worker.removeEventListener('message', onMessage)
                worker.terminate()
                worker      = null
                deferred    = null
                instance.params     = null
                instance.jobName    = null
                instance.trigger('done')
            }
        }
        
        var self =  cmFactory(cmWebWorker, 
                        //sameByData:
                        function(instance, data){
                        return      instance.jobName = data.jobName
                                &&  JSON.stringify(instance.params) == JSON.stringify(data.params)
                        }
                    )


        self.get = function(data){
            if(!window.Worker)
                return $q.reject('Browser does not support webWorkers.')


            var worker      =   self.create(data),
                promise     =   worker
                                .when('available')
                                .then(function(){
                                    return worker
                                })


            worker.on('done', function(event){
                self.trigger('worker:done', event.target)
            })

            self.advance()

            return  promise

        }

        self.advance = function(){
            for(var i = 0; i < limit; i++){
                self[i] && self[i].trigger('available')
            }

            return this
        }

        self.on('worker:done', function(worker){
            self.deregister(worker)
            self.advance()
        })

        return self
    }

]);
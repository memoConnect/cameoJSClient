'use strict';

angular.module('cmCore')
.provider('cmWebworkerFactory',[

    function(){

        var default_global_limit    = 2,
            default_mobile_limit    = 2,
            default_app_limit       = 2,
            default_desktop_limit   = 5,
            limit                   = default_global_limit

        this.setGlobalDefaultLimit = function(l){
            default_global_limit = l || default_global_limit
            return this
        };

        this.setMobileDefaultLimit = function(l){
            default_mobile_limit = l || default_mobile_limit
            return this
        };

        this.setDesktopDefaultLimit = function(l){
            default_desktop_limit = l || default_desktop_limit
            return this
        };

        this.setAppDefaultLimit = function(l){
            default_desktop_limit = l || default_desktop_limit;
            return this
        };


        this.$get = [

            '$q',
            'cmFactory', 'cmObject', 'cmLogger', 'cmDevice',

            // this is not an angular factory but an anglar service, that uses the generic Factory Service oO
            function cmWebworkerFactory($q, cmFactory, cmObject, cmLogger, cmDevice){

                function cmWebworker(data){
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

                        instance.trigger("run", instance)

                        //console.warn('running WebWorker "'+data.jobName)

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
                        instance.trigger('done')

                    }

                    return instance
                }

                var self =  cmFactory(cmWebworker,
                                //sameByData:
                                function(instance, data){
                                    return      instance.jobName == data.jobName
                                            &&  JSON.stringify(instance.params) == JSON.stringify(data.params)
                                }, 
                                //sameByInstance:
                                function(instance1, instance2){
                                    return      instance1.jobName == instance2.jobName
                                            &&  JSON.stringify(instance1.params) == JSON.stringify(instance2.params)
                                }
                            )


                self.get = function(data){
                    if(!window.Worker)
                        return $q.reject('Browser does not support webWorkers.')

                    var worker      =   self.create(data),
                        promise     =   worker
                                        .when('available')
                                        .then(function(){
                                            //console.log('Worker available:', data.jobName)
                                            return $q.when(worker)
                                        })

                    //console.warn('new WebWorker "'+data.jobName+'" Number of queued webworkers: '+ self.length)


                    worker.on('done', function(event){
                        self.trigger('worker:done', worker)
                    })

                    worker.on('run', function(event, worker){

                    })

                    self.advance()

                    return  promise

                }

                self.advance = function() {
                    if (cmDevice.isApp())
                        limit = default_app_limit;
                    else if(cmDevice.isMobile('cmWebworkerFactory'))
                        limit = default_mobile_limit;
                    else if(cmDevice.isDesktop('cmWebworkerFactory'))
                        limit = default_desktop_limit;

                    for(var i = 0; i < limit; i++){
                        self[i] && self[i].trigger('available')
                    }

                    return this
                }

                self.on('worker:done', function(event, worker){
                    self.deregister(worker)
                    //console.info('Worker done; number of queued webworkers: ' + self.length)
                    self.advance()
                })

                return self
            }
        ]
    }

]);
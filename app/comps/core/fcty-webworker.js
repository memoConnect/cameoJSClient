'use strict';

        /*
        var webworker = {
            stack: [],
            isAvailable: function(){
                return !(window.Worker === undefined)
            },
            start: function(jsPath, data, onFinished){

                var worker = new Worker(jsPath);

                worker.addEventListener('message', function(e){
                    var result = e.data;
                    switch(result.msg){
                        case 'finished':
                            onFinished(result);
                        break;
                    }
                });

                worker.postMessage = worker.webkitPostMessage || worker.postMessage;

                worker.postMessage(data);

                this.stack.push({jsPath:jsPath,instance:worker});
            },
            cancel: function(jsPath, data, onFinished){
                var worker = this.stack.filter(function(worker){
                    return worker.jsPath == jsPath
                });

                if(worker.length > 0){
                    worker = worker[0].instance;

                    worker.addEventListener('message', function(e){
                        var result = e.data;
                        switch(result.msg){
                            case 'canceled':
                                onFinished(result);
                            break;
                        }
                    });

                    worker.postMessage(data);
                }
            }
        };
        */

angular.module('cmCore')
.factory('cmWebworker',[

    '$q',
    '$timeout',
    
    function cmWebWorker($q, $timeout){

        if(!window.Worker)
            return false

        return function WebWorkerInstance(job_name){
            var worker      = new Worker('webworker/'+job_name+'.js'),
                deferred    = $q.defer(),
                self        = this


            this.start = function(data, timeout){
                var onMessage   =  function(event){
                                        if(event.data.msg == 'finished'){
                                            deferred.resolve(event.data)
                                            self.terminate()
                                        }

                                        if(['canceled', 'failed', 'error'].indexOf(event.data.msg) != -1){
                                            deferred.reject(event.data)
                                            self.terminate()
                                        }

                                        if(event.data.msg == 'notify')
                                            deferred.notify(event.data)
                                    }

                if(timeout)
                    $timeout(function(){ 
                        deferred.reject('timeout')
                        self.cancel()
                    }, timeout)

                deferred.promise
                .then(function(){
                    worker.removeEventListener('message', onMessage)
                }) 

                data.cmd = 'start'

                worker.addEventListener('message', onMessage)
                worker.postMessage(data)


                return  deferred.promise
            }

            this.cancel = function(){                
                worker.postMessage({cmd: 'cancel'})
                return  deferred.promise.catch(function(data){
                            return  data.msg == 'canceled'
                                    ?   $q.when('canceled')
                                    :   $q.reject(data)
                        })
            }

            this.terminate = function(){
                worker.terminate()
                delete worker
            }
        }
    }

])
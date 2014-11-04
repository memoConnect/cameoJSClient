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
.service('cmWebworker',[

    '$q',
    '$timeout',
    'cmDevice',
    'cmLogger',

    function cmWebWorker($q, $timeout, cmDevice, cmLogger){

        this.available = !!window.Worker;

        var self                = this,
            number_of_workers   = 0;

        function WebWorkerInstance(job_name){
            var worker      = new Worker('webworker/'+job_name+'.js'),
                deferred    = $q.defer(),
                self        = this;

            number_of_workers ++;

            cmLogger.debug("New webworker \"" + job_name +"\". Total: " + number_of_workers)

            var onMessage   =  function(event){
                                        if(event.data.msg == 'finished'){
                                            deferred.resolve(event.data);
                                            self.terminate()
                                        }

                                        if(['canceled', 'failed', 'error'].indexOf(event.data.msg) != -1){
                                            deferred.reject(event.data);
                                            self.terminate()
                                        }

                                        if(event.data.msg == 'notify')
                                            deferred.notify(event.data)
                                };

            this.start = function(data, timeout){
                if(timeout)
                    $timeout(function(){
                        deferred.reject('timeout');
                        self.cancel()
                    }, timeout);


                data.cmd = 'start';

                worker.addEventListener('message', onMessage);
                worker.postMessage(data);

                return  deferred.promise;
            };

            this.cancel = function(){
                worker.postMessage({cmd: 'cancel'})
                return  deferred.promise.catch(function(data){
                            return  data.msg == 'canceled'
                                    ?   $q.when('canceled')
                                    :   $q.reject(data)
                        })
            };

            this.terminate = function(){
                worker.removeEventListener('message', onMessage);
                worker.terminate();
                number_of_workers --;
                cmLogger.debug('Webworker terminated. Total: ' +number_of_workers);
                //delete worker;
                worker = null;
                //delete deferred;
                deferred = null;
            }
        }


        this.new = function(job_name){

            var maxWebWorkers = cmDevice.isApp() ? 5 : 20;
            cmLogger.debug("isApp: " + cmDevice.isApp())

            return  number_of_workers < maxWebWorkers
                    ?   $q.when(new WebWorkerInstance(job_name))
                    :   $timeout(function(){
                            return self.new(job_name)
                        }, 1000, false)
        }
    }

]);
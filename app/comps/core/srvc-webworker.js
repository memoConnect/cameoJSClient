'use strict';
angular.module('cmCore')
.service('cmWebworker',[

    '$q',
    
    function WebWorker($q){

        if(!window.Worker){
            return false
        } 

        return function WebWorkerInstance(job_name){
            var worker      = new Worker('webworker/'+job_name+'.js')
                deferred    = $q.defer()


            console.log(job_name)


            this.start = function(data){
                var onMessage   =  function(event){
                                        if(event.data.msg == 'finished')
                                            deferred.resolve(event.data)

                                        if(['canceled', 'failed', 'error'].indexOf(event.data.msg) != -1)
                                            deferred.reject(event.data)

                                        if(event.data.msg == 'notify')
                                            deferred.notify(event.data)
                                    }
                data.cmd = 'start'

                worker.addEventListener('message', onMessage)
                worker.postMessage(data)

                deferred.promise
                .finally(function(){
                    worker.removeEventListener('message', onMessage)
                }) 

                return  deferred.promise
            }

            this.cancel = function(){
                worker.postMessage({cmd: 'cancel'})
            }

            this.close = function(){
                worker.close()
            }
        }
    }

])
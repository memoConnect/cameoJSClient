'use strict';

angular.module('cmCore').service('cmCron', [
    function(){
        this.jobs           =  {};
        this.interval       = null;
        this.intervalSec    = 5;

        this.init = function(){
            this.startInterval();
        };

        this.add = function(identifier,job){
            var defaults = {"instance":{}, "task":angular.noop, "callback": angular.noop, "isRunning":false, "isActive":true, "seconds":0, "lastRun":0};

            if(identifier != undefined && identifier != ""){

//                var jobs = $.map(this.jobs, function(element,index) {return index});
                var jobs = Object.keys(this.jobs);

                if(jobs.length == 0 || (jobs.length > 0 && jobs.indexOf(identifier) == -1)){
                    this.jobs[identifier] = angular.extend({},defaults,job);

                    this.init();
                    this.process(identifier);
                } else if(jobs.length > 0 && jobs.indexOf(identifier) != -1){
                    this.jobs[identifier].instance = job.instance;
                    this.jobs[identifier].task = job.task;
                    this.jobs[identifier].isActive = true;
                    this.process(identifier);
                }
            }
        };

        this.kill = function(identifier){
            if(identifier != "" && this.jobs[identifier] != undefined){
                delete this.jobs[identifier];
            }
        };

        this.stop = function(identifier){
            if(identifier != "" && this.jobs[identifier] != undefined){
                this.jobs[identifier].isActive = false;
            }
        };

        this.startInterval = function(){
            if(this.interval == null){
                this.interval = window.setInterval(this.process,(this.intervalSec * 1000));
            }
        };

        this.stopInterval = function(){
            if(this.interval != null){
                window.clearInterval(this.interval);
                this.interval = null;
            }
        };

        this.process = function(identifier){
            if(identifier != undefined && identifier != ""){
                this._process(this.jobs[identifier]);
            } else {
                var self = this;
                angular.forEach(this.jobs, function(job){
                    self._process(job);
                });
            }
        };

        this._process = function(job){
            console.dir(job.instance)
            if(job.isActive == true && job.isRunning == false){
                job.isRunning = true;

                job.task(function(){
//                    console.log('hier')
//                    job.callback(arguments[0]);

                    job.isRunning = false;
                    job.lastRun = new Date().getTime()/1000;
                });
            }
        }
    }
]);
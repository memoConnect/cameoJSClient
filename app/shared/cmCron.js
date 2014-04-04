'use strict';

angular.module('cmCron', [])
.service('cmCron', [
    '$q',
    function($q){
        this.jobs           =  {};
        this.interval       = null;
        this.intervalSec    = 15;

        this.init = function(){
            this.startInterval();
        };

        this.add = function(identifier,job){
            var defaults = {"task":$.noop, "callback": $.noop, "isRunning":false, "isActive":true, "seconds":0, "lastRun":0};

            if(identifier != undefined && identifier != ""){
                var jobs = $.map(this.jobs, function(element,index) {return index});
                if(jobs.length == 0 || (jobs.length > 0 && jobs.indexOf(identifier) == -1)){
                    this.jobs[identifier] = $.extend({},defaults,job);

                    this.init();
                    this.process(identifier);
                } else if(jobs.length > 0 && jobs.indexOf(identifier) != -1){
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
                this.interval = window.setInterval($.proxy(this.process,this),(this.intervalSec * 1000));
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
                $.each(this.jobs, function(){
                    self._process(this);
                })
            }
        };

        this._process = function(job){
            if(job.isActive == true && job.isRunning == false){
                job.isRunning = true;
                job.task($.proxy(function(){
                    this.callback(arguments[0]);

                    this.isRunning = false;
                    this.lastRun = new Date().getTime()/1000;
                }, job));
            }
        }
    }
]);
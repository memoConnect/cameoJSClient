'use strict';

angular.module('cmCore')
.service('cmNotify', [
    'cmFactory', 'cmNotifyModel',
    '$rootScope',
    function(cmFactory, cmNotifyModel,
             $rootScope){

        var self = new cmFactory(cmNotifyModel),
            notifyTpl = {
                label: undefined,
                severity: 'info',
                icon: 'cm-attention',
                displayType: undefined,
                ttl: 3000,
                bell: false,
                callbackRoute: undefined
            };

        function handleAdapter(args){
            var notify = angular.extend({} ,notifyTpl);

            if(typeof args == 'object'){
                notify = angular.extend(notify, args);  
                self.create(notify);
            }
        }

        self.error = function(label, args){
            var options = {};

            if(typeof label == 'string' && label.length > 0){
                if(typeof args == 'object'){
                    options = angular.extend(options, args);
                }

                options.displayType = 'modal';
                options.label = label;
                options.severity = 'error';
                options.icon = 'cm-reject';

                handleAdapter(options);
            }
        };

        self.info = function(label, args){
            var options = {};

            if(typeof label == 'string' && label.length > 0){
                if(typeof args == 'object'){
                    options = angular.extend(options, args);
                }

                options.severity = 'info';
                options.label = label;
                options.icon = 'cm-info';

                handleAdapter(options);
            }
        };

        self.success = function(label, args){
            var options = {};

            if(typeof label == 'string' && label.length > 0){
                if(typeof args == 'object'){
                    options = angular.extend(options, args);
                }

                options.severity = 'success';
                options.label = label;
                options.icon = 'cm-checker';

                handleAdapter(options);
            }
        };

        self.warn = function(label, args){
            var options = {};

            if(typeof label == 'string' && label.length > 0) {
                if (typeof args == 'object') {
                    options = angular.extend(options, args);
                }

                options.displayType = 'modal';
                options.severity = 'warn';
                options.label = label;
                options.icon = 'cm-attention';

                handleAdapter(options);
            }
        };

        var bimmelJobs = [],
            unringForce = false;

        /**
         * set a new type of notification and ring the bell
         * unset the unringForce
         * communicate via event 'bell:ring' with drtv-notify-signal
         * @param identifier of ring type ex.: markHelp or friendRequest
         */
        self.ringBimmel = function(identifier){
            unringForce = false;

            //if(bimmelJobs.indexOf(identifier) == -1)
                bimmelJobs.push(identifier);

            self.trigger('bell:ring');
        };

        /**
         * check method for the bell if she should ring or not
         * is no identifier given and unringForce == true the method will always return false
         * is unringForce == false and identifier is given will check if some ring type is registered
         * otherwise it will check if the length of regisitred types
         *
         * @param identifier of ring type
         * @returns {boolean} is bell should ring
         */
        self.isBimmel = function(identifier){
            if(!identifier && unringForce)
                return false;

            if(identifier)
                return bimmelJobs.indexOf(identifier) >= 0;
            else
                return bimmelJobs.length > 0;
        };

        /**
         * delete registred ring type out of the bimmel context
         * and communicate via event 'bell:unring' with drtv-notify-signal
         * @param identifier of ring type
         */
        self.unringBimmel = function(identifier){
            if(bimmelJobs.indexOf(identifier) >= 0)
                bimmelJobs.splice(bimmelJobs.indexOf(identifier), 1);

            if(!self.isBimmel())
                self.trigger('bell:unring');
        };

        /**
         * force unring for menu toggle
         */
        self.unringBimmelForce = function(){
            unringForce = true;
            self.trigger('bell:unring');
        };

        /**
         * Event Handling
         */
        $rootScope.$on('logout', function(){ self.reset() });

        $rootScope.$on('identity:switched', function(){ self.reset() });

        self.on('notify:remove', function(event){
            self.deregister(event.source);
        });

        return self;
    }
]);
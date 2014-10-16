'use strict';

angular.module('cmCore')
.service('cmNotify', [
    'cmFactory',
    'cmNotifyModel',
    '$rootScope',
    function(cmFactory, cmNotifyModel, $rootScope){
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

        self.bellCounter = 0;

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

        /**
         * Event Handling
         */
        $rootScope.$on('logout', function(){ self.reset() });

        $rootScope.$on('identity:switched', function(){ self.reset() });


        self.on('bell:ring', function(event, instance){
            self.bellCounter++;
        });

        self.on('notify:remove', function(event){
            self.deregister(event.source);
        });

        return self;
    }
]);
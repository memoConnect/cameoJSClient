'use strict';

angular.module('cmCore')
.factory('cmNotifyModel', [
    'cmStateManagement',
    'cmObject',
    'cmUtil',
    'cmLogger',
    '$rootScope',
    function(cmStateManagement, cmObject, cmUtil, cmLogger, $rootScope){
        function cmNotifyModel(data){
            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = new cmStateManagement(['new','read','error']);

            this.label = undefined;
            this.severity = undefined;
            this.displayType = undefined;
            this.callbackRoute = undefined;
            this.bell = false;
            this.ttl = -1;

            /**
             * {
                "id": TRANSLATION.KEY
                "severity: "info || warn || error || ..."
                "displayType: "modal || banner || none"
                "callbackRoute": "/conversation/id"
                }
             * @param data
             */
            function init(data){
//                cmLogger.debug('cmNotifyModel.init');

                self.state.set('new');

                if(typeof data !== 'undefined'){
                    self.importData(data);
                }
            }

            this.importData = function(data){
//                cmLogger.debug('cmNotifyModel.importData');
//                console.log('importData', data);

                if(typeof data == 'object' || typeof data == 'array'){
                    this.label = data.label || this.label;

                    this.severity = data.severity || this.severity;

                    this.displayType = data.displayType || this.displayType;

                    this.callbackRoute = data.callbackRoute || this.callbackRoute;

                    this.bell = data.bell || this.bell;

                    this.ttl = data.ttl || this.ttl;
                } else {
                    this.state.set('error');
                }

                self.state.unset('new');
                this.trigger('update:finished');
            };

            this.render = function(){
//                cmLogger.debug('cmNotifyModel.render');

                if(this.bell !== false){
                    this.trigger('bell:ring');
                }
            };

            this.on('bell:ring', function(){
//                cmLogger.debug('cmNotifyModel.on.bell:ring');
                $rootScope.$broadcast('bell:ring');
            })

            this.on('update:finished', function(){
//                cmLogger.debug('cmNotifyModel.on.update:finished');
                self.render();
            });

            // after events!!!
            this.on('init:ready', function(){
                init(data);
            });
        }

        return cmNotifyModel;
    }
])
.service('cmNotify', [
   'cmFactory',
   'cmNotifyModel',
   '$rootScope',
   function(cmFactory, cmNotifyModel, $rootScope){
       var self = new cmFactory(cmNotifyModel),
            notifyTpl = {
                label: undefined,
                severity: 'info',
                displayType: 'modal',
                ttl: 3000,
                callbackRoute: undefined
            };

       $rootScope.$on('logout', function(){ self.reset() });

       function handleAdapter(args){
           var notify = notifyTpl;

           if(typeof args == 'object'){
               notify = angular.extend(notify, args);
           }

           self.new(notify);
       }

       self.error = function(label, args){
           var options = {};

           if(typeof label == 'string' && label.length > 0){
               if(typeof args == 'object'){
                   options = angular.extend(options, args);
               }

               options.label = label;
               options.severity = 'error';

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

               handleAdapter(options);
           }
       };

       self.warn = function(label, args){
           var options = {};

           if(typeof label == 'string' && label.length > 0) {
               if (typeof args == 'object') {
                   options = angular.extend(options, args);
               }

               options.severity = 'warn';
               options.label = label;

               handleAdapter(options);
           }
       };

       return self;
   }
])
.directive('cmNotifySignal', [
    '$rootScope',
    'cmNotify',
    function ($rootScope, cmNotify) {
        return {
            restrict: 'E',
            template: '<i class="fa" ng-class="{\'cm-notification-on cm-orange\': ring, \'cm-notification\': !ring}"></i>',
            scope: true,
            controller: function ($scope) {
                $scope.ring = false;

                $rootScope.$on('bell:ring', function(){
                    $scope.ring = true;
                });
            }
        }
    }
]);
'use strict';

angular.module('cmCore')
.factory('cmNotifyModel', [
    'cmStateManagement',
    'cmObject',
    'cmModal',
    'cmUtil',
    'cmTranslate',
    'cmLogger',
    '$timeout',
    function(cmStateManagement, cmObject, cmModal, cmUtil, cmTranslate, cmLogger, $timeout){
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
                    label: undefined,
                    severity: 'info',
                    displayType: 'modal',
                    ttl: 3000,
                    callbackRoute: undefined
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

                if(this.displayType == 'modal'){
                    this.renderModal();
                }
            };

            this.renderModal = function(){
//                cmLogger.debug('cmNotifyModel.renderModal');
                cmModal.create({
                        id: 'fast-registration',
                        'class': 'webreader',
                        type: 'alert',
//                        nose: 'top-right',
                        'cm-close-btn': true,
                    },'' +
                    '<div class="attention">' +
                    '<i class="fa cm-attention cm-lg-icon"></i> NOTIFACTION' +
                    '</div>'+
                    '' + cmTranslate(this.label)
                );
                cmModal.open('fast-registration');

                if(this.ttl > 0){
                    $timeout(function(){
                        //cmModal.close('fast-registration');
                        cmModal.closeAll();
                    }, this.ttl);
                }
            };

            this.on('update:finished', function(){
//                cmLogger.debug('cmNotifyModel.on.update:finished');
                self.render();
            });

            // after events!!!
            this.on('init:ready', function(){
//                cmLogger.debug('cmNotifyModel.on.init:ready');
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
                bell: false,
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
    'cmNotify',
    function (cmNotify) {
        return {
            restrict: 'E',
            template: '<i class="fa" ng-class="{\'cm-notification-on cm-orange\': ring, \'cm-notification\': !ring}"></i>',
            scope: true,
            controller: function ($scope) {
                $scope.ring = false;

                cmNotify.on('bell:ring', function(event, instance){
                    $scope.ring = true;
                });
            }
        }
    }
]);
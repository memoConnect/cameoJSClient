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
            this.icon = undefined;
            this.displayType = undefined;
            this.callbackRoute = undefined;
            this.bell = false;
            this.ttl = -1;

            /**
             * {
                    label: undefined,
                    severity: 'info',
                    icon: 'cm-attention',
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

                    this.icon = data.icon || this.icon;

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
                        id: 'modal-notification',
                        type: 'alert',
                        'class': 'modal-notification modal-type-'+this.severity,
                        //'nose': 'top-right',
                        'cm-close-btn': true,
                        'cm-footer-label': 'MODAL.LABEL.CLOSE',
                        'cm-footer-icon': 'cm-close'
                    },
                    '<div class="header">'+
                        '<i class="fa '+this.icon+' cm-lg-icon"></i> '+cmTranslate('NOTIFICATIONS.MODAL_HEADER.'+this.severity.toUpperCase())+
                    '</div>'+
                    '<div class="body">'+
                        cmTranslate(this.label)+
                    '</div>'
                );
                cmModal.open('modal-notification');

                if(this.ttl > 0){
                    this.ttlTimeout = $timeout(function(){
                        cmModal.close('modal-notification');
                    }, this.ttl);
                }

                cmModal.on('instance:closed', function(){
                    if(self.ttlTimeout){
                        $timeout.cancel(self.ttlTimeout);
                    }
                    self.trigger('notify:remove', this);
                });
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
                icon: 'cm-attention',
                displayType: undefined,
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

        self.bellCounter = 0;
        self.on('bell:ring', function(event, instance){
            self.bellCounter++;
        });

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

        self.on('notify:remove', function(event){
            self.deregister(event.source);
        });

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

                function init(){
                    if(cmNotify.bellCounter > 0){
                        $scope.ring = true;
                    }
                }

                cmNotify.on('bell:ring', function(){
                    $scope.ring = true;
                });

                cmNotify.on('bell:unring', function(){
                    cmNotify.bellCounter = 0;
                    $scope.ring = false;
                });

                init();
            }
        }
    }
]);
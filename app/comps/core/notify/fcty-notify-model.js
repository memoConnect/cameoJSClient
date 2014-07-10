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
            this.severity = 'none';
            this.icon = undefined;
            this.displayType = undefined;
            this.callbackRoute = undefined;
            this.bell = false;
            this.ttl = -1;
            this.i18n = {};

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

                    this.i18n = data.i18n || this.i18n;
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
                var modalId = 'modal-notification-' + new Date().getTime();
                cmModal.create({
                        id: modalId,
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
                        cmTranslate(this.label, this.i18n)+
                        '</div>'
                );
                cmModal.open(modalId);

                if(this.ttl > 0){
                    this.ttlTimeout = $timeout(function(){
                        cmModal.close(modalId);
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
]);
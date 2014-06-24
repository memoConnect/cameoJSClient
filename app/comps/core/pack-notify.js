'use strict';

angular.module('cmCore')
.factory('cmNotifyModel', [
    'cmStateManagement',
    'cmObject',
    'cmUtil',
    'cmLogger',
    function(cmStateManagement, cmObject, cmUtil, cmLogger){
        function cmNotifyModel(data){
            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = new cmStateManagement(['new','read','error']);

            this.label = undefined;
            this.severity = undefined;
            this.displayType = undefined;
            this.callbackRoute = undefined;
            this.bell = false;

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
                } else {
                    this.state.set('error');
                }

                self.state.unset('new');
                this.trigger('update:finished');
            };

            this.render = function(){
//                cmLogger.debug('cmNotifyModel.render');
                this.trigger('bell:ring');
            };

            this.on('bell:ring', function(){
                cmLogger.debug('cmNotifyModel.on.bell:ring');
            })

            this.on('update:finished', function(){
//                cmLogger.debug('cmNotifyModel.on.update:finished');
                self.render();
            });

            // after events!!!
            init(data);
        }

        return cmNotifyModel;
    }
])
.service('cmNotify', [
   'cmFactory',
   'cmNotifyModel',
   '$rootScope',
   function(cmFactory, cmNotifyModel, $rootScope){
       var self = cmFactory(cmNotifyModel);

       $rootScope.$on('logout', function(){ self.reset() });

       return self;
   }
])
.directive('cmNotifySignal', [
    '$rootScope',
    'cmNotify',
    function ($rootScope, cmNotify) {
        return {
            restrict: 'E',
            template: '<i class="fa" ng-class="{\'cm-notification-on cm-orange\': ring, \'cm-notification\' : !ring}"></i>',
            scope: true,
            controller: function ($scope, $element, $attrs) {
                $scope.ring = false;

                cmNotify.on('bell:ring', function(event, notifyModel){
                    console.log('notfiy signal event');
                    $scope.ring = true;
                });
            }
        }
    }
]);
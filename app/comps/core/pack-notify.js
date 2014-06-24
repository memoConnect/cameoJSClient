'use strict';

angular.module('cmCore')
.factory('cmNotifyModel', [
    'cmStateManagement',
    'cmObject',
    'cmLogger',
    function(cmStateManagement, cmObject, cmLogger){
        function cmNotifyModel(){
            var self = this;

            cmObject.addEventHandlingTo(this);
            this.state = new cmStateManagement(['new','read']);


            function init(data){
                cmLogger.debug('cmNotifyModel.init');

                self.state.set('new');

                if(typeof data != undefined){
                    self.importData(data);
                }
            }

            this.importData = function(data){
                cmLogger.debug('cmNotifyModel.importData');

                console.log('importData', data);

                self.state.unset('new');
                this.trigger('update:finished');
            }
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

        $rootScope.$on('logout', function(){
            self.reset();
        });

        $scope.$on('cmNotify:update', function(){
            $scope.unreadNotifications = cmNotify.getNotifications().length > 0;
        });

    return self;
    }
]);
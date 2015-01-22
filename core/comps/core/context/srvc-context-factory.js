'use strict';

angular.module('cmCore').service('cmContextFactory', [
    'cmContextModel', 'cmFactory', 'cmStateManagement', 'cmObject', 'cmLogger',
    '$rootScope', '$q',
    function(cmContextModel, cmFactory, cmStateManagement, cmObject, cmLogger,
             $rootScope, $q) {
        var self = cmFactory(cmContextModel);

        self.state = new cmStateManagement();

        self.clear = function(){
            self.reset();
            self.trigger('clear');
        };

        self.delete = function(){
            cmLogger.debug('cmFactory.delete -> proceed delete context objects')
        };


        /**
         * EventHandling
         */
        $rootScope.$on('logout', function(){
            self.reset();
        });

        $rootScope.$on('identity:switched', function(){
            self.reset();
        });

        $rootScope.$on('login', function(){
            self.reset();
        });

        return self;
    }
]);
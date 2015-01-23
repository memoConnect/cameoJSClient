'use strict';

angular.module('cmUi').service('cmContextFactory', [
    'cmContextModel', 'cmFactory', 'cmStateManagement', 'cmLogger',
    '$rootScope', '$q',
    function(cmContextModel, cmFactory, cmStateManagement, cmLogger,
             $rootScope, $q) {

        var self = cmFactory(cmContextModel,
            function sameByData(instance, data){
                return (data &&
                        data.type &&
                        data.type != '' &&
                        data.model &&
                        data.model.id &&
                        data.model.id != '' &&
                        data.model.id == instance.model.id &&
                        data.type == instance.type)
            },
            function sameByInstance(instance_1, instance_2){
                return (instance_1 &&
                        instance_1.type &&
                        instance_1.model &&
                        instance_1.model.id &&
                        instance_2 &&
                        instance_2.type &&
                        instance_2.model &&
                        instance_1.model.id &&
                        instance_1.model.id == instance_2.model.id &&
                        instance_1.type == instance_2.type)

            });

        self.state = new cmStateManagement();

        self.clear = function(){
            self.reset();
            self.trigger('clear');
        };

        self.delete = function(){
            cmLogger.debug('cmFactory.delete -> proceed delete context objects')
        };

        self.validate = function(data){
            if(typeof data != 'undefined' && typeof data.type == 'string' && data.type != '' && typeof data.model == 'object' && typeof data.model.id != 'undefined' && data.model.id != ''){
                return true;
            } else {
                // error
            }

            return false;
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

        $rootScope.$on('$routeChangeSuccess', function(){
            self.reset();
        });

        return self;
    }
]);
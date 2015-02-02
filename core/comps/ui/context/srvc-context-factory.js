'use strict';

angular.module('cmUi').service('cmContextFactory', [
    'cmFactory', 'cmContextModel', 'cmStateManagement', 'cmNotify', 'cmLogger',
    '$rootScope', '$q',
    function(cmFactory, cmContextModel, cmStateManagement, cmNotify, cmLogger,
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
            //cmLogger.debug('cmFactory.delete -> proceed delete context objects');

            var defered = $q.defer(),
                done = [];


            self.forEach(function(instance){
                done.push(instance.delete())
            });

            $q.all(done).then(
                function(){
                    defered.resolve();
                },
                function(){
                    cmNotify.warn('SYSTEM.CONTEXT.MODAL.NOTIFY.DELETE_ERROR')
                    defered.reject();
                }
            );

            return defered.promise;
        };

        self.validate = function(data){
            if(data != null && typeof data == 'object' && typeof data.type == 'string' && data.type != '' && data.model != null && typeof data.model == 'object' && typeof data.model.id != 'undefined' && data.model.id != ''){
                return true;
            } else {
                // error
            }

            return false;
        };

        self.hasSelection = function(){
            return self.length > 0;
        };

        /**
         * EventHandling
         */

        self.on('deleted:finished', function(event, data){
            console.log('factory on delete:finished', data)
        });

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
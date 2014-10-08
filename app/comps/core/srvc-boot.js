'use strict';
// TODO: doku and tests
angular.module('cmCore')
.service('cmBoot', [
    'cmObject',
    '$q', '$rootScope', '$document',
    function(cmObject,
             $q, $rootScope, $document) {
        var promises = {};

        function reset(){
            //promises = {};
            delete promises.userModel;
        }

        $rootScope.$on('logout', function(){
            reset();
        });

        $rootScope.$on('identity:switched', function(){
            reset();
        });

        $rootScope.$on('appSpinner', function(event, action){
            // hide app spinner
            angular.element($document[0].querySelector('.app-spinner'))
                .css('display',action == 'hide'?'none':null);
        });

        function onAllPromises(){
            var allPromises = Object.getOwnPropertyNames(promises).map(function(key) {
                return promises[key].promise;
            });

            $q.all(allPromises)
            .then(function(){
                $rootScope.$broadcast('appSpinner','hide');
            });
        }

        var self = {
            init: {
                userModel: function(){
                    if(!('userModel' in promises)){
                        promises.userModel = $q.defer();
                        onAllPromises();

                        self.on('yeahItsReady',function(){
                            promises.userModel.resolve();
                        });
                    }
                }
            },

            isReady: {
                i18n: function(){
                    if(!('i18n' in promises)){
                        promises.i18n = $q.defer();
                        onAllPromises();

                        $rootScope.$on('$translateLoadingSuccess', function(){
                            promises.i18n.resolve();
                        });
                    }

                    return promises.i18n.promise;
                },
                userModel: function(){
                    self.init.userModel();

                    return promises.userModel.promise;
                }
            },

            ready: {
                userModel: function(){
                    console.log('yeahItsReady',promises)

                    self.init.userModel();

                    self.trigger('yeahItsReady');
                }
            }
        };

        cmObject.addEventHandlingTo(self);

        return self;
    }
]);
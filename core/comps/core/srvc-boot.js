'use strict';
// TODO: doku and tests
angular.module('cmCore')
.service('cmBoot', [
    'cmObject',
    '$q', '$rootScope', '$document', '$injector',
    function(cmObject,
             $q, $rootScope, $document, $injector) {
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

        $rootScope.$on('cmBoot:appSpinner', function(event, action, where){
            console.log('appSpinner',action)
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
                console.log('allPromises')
                $rootScope.$broadcast('cmBoot:appSpinner','hide');
            });
        }

        var self = {
            init: {
                userModel: function(){
                    if(!('userModel' in promises)){
                        promises.userModel = $q.defer();
                        onAllPromises();

                        self.on('userModel:ready',function(){
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
                },
                purl: function(idPurl){
                    return $injector.get('cmPurlModel').getPurl(idPurl).catch(function(r){return $q.when(r)});
                }
            },

            ready: {
                userModel: function(){
                    self.init.userModel();

                    self.trigger('userModel:ready');
                }
            }
        };

        cmObject.addEventHandlingTo(self);

        return self;
    }
]);
'use strict';
// TODO: doku and tests
angular.module('cmCore')
.service('cmBoot', [
    'cmObject', 'cmLogger',
    '$q', '$rootScope', '$document', '$injector', '$timeout',
    function(cmObject, cmLogger,
             $q, $rootScope, $document, $injector, $timeout) {
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
            angular.element($document[0].querySelector('.app-spinner'))
                .css('display',action == 'hide'?'none':null);
        });

        $rootScope.$on('$routeChangeSuccess',function(){
            var currentRoute = $injector.get('$route').current.$$route;
            if(currentRoute)
                $rootScope.$broadcast('cmBoot:appSpinner','hide','routeSuccess');
        });

        var self = {
            init: {
                userModel: function(){
                    if(!('userModel' in promises)){
                        promises.userModel = $q.defer();

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

                        $rootScope.$on('$translateLoadingSuccess', function(){
                            promises.i18n.resolve();
                        });
                    }

                    return promises.i18n.promise;
                },
                firstBoot: function(){
                    promises.firstBoot = $q.when();
                    // propably waiting for account, browserinfo etc.

                    //$timeout(function(){
                    //    console.log('firstboot ready')
                    //    promises.firstBoot.resolve();
                    //},2000);

                    return promises.firstBoot.promise;
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
                    //cmLogger.debug('usermodel ready')

                    self.init.userModel();

                    self.trigger('userModel:ready');
                },
                account: function(){
                    //cmLogger.debug('account ready')
                },
                browserInfo: function(){
                    //cmLogger.debug('browserinfo ready')
                }
            }
        };

        cmObject.addEventHandlingTo(self);

        return self;
    }
]);
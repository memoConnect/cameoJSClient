'use strict';

angular.module('cmPhonegap')
    .service('cmMigrate', [
        'cmPhonegap', '$phonegapCameoConfig', '$window', '$q', 'cmLogger',
        function (cmPhonegap, $phonegapCameoConfig, $window, $q, cmLogger){

            var self = {

                plugin: null,

                init: function(){

                    cmPhonegap.isReady('cmMigrate',function(){
                        if(!('cmMigrate' in $window)) {
                            cmLogger.info('MIGRATION PLUGIN IS MISSING');
                            return false;
                        } else {
                            cmLogger.info('MIGRATION PLUGIN FOUND');
                        }

                        self.plugin = $window.cmMigrate;
                    });
                },

                isAvailable: function(){
                    return this.plugin != null;
                },

                migrateLocalStorage: function() {

                    cmLogger.info('STARTING LOCAL STORAGE MIGRATION');

                    var deferred = $q.defer();
                    var isCrosswalk = $phonegapCameoConfig.isCrosswalk || false

                    cmLogger.info('IS CROSSWALK: ' + isCrosswalk);

                    if(this.isAvailable()){
                        cmLogger.info('CALLING LOCAL STORAGE PLUGIN');
                        this.plugin.migrateLocalStorage(
                            function (hasCompleted) {
                                cmLogger.debug("RESULT: "+ hasCompleted)
                                deferred.resolve(hasCompleted == "true");
                            }, function (reason) {
                                deferred.reject(reason);
                            },
                            isCrosswalk
                        );
                    } else {
                        cmLogger.error('MIGRATION PLUGIN IS MISSING');
                        deferred.reject('MIGRATION PLUGIN IS MISSING');
                    }

                    return deferred.promise;
                }
            };

            self.init();

            return self;
        }
    ]);
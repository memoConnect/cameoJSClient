'use strict';

angular.module('cmPhonegap')
    .service('cmMigrate', [
        'cmPhonegap',
        '$phonegapCameoConfig', '$window', '$q', 'cmLogger',
        function (cmPhonegap,
                  $phonegapCameoConfig, $window, $q, cmLogger){

            var self = {

                plugin: null,

                init: function(){

                    cmPhonegap.isReady('cmMigrate',function(){
                        if(!('cmMigrate' in $window)) {
                            //cmLogger.info('MIGRATION PLUGIN IS MISSING');
                            return false;
                        }
                        self.plugin = $window.cmMigrate;
                    });
                },

                isAvailable: function(){
                    return this.plugin != null;
                },

                migrateLocalStorage: function() {

                    cmLogger.debug('Starting local storage migration');

                    var deferred = $q.defer();

                    if(this.isAvailable()){
                        cmLogger.info('Calling migration plugin...');
                        this.plugin.getOldLocalStorage(
                            function (values) {
                                try {
                                    var jsonObj = JSON.parse(values)
                                    deferred.resolve(jsonObj)
                                } catch (e) {
                                    deferred.reject(e)
                                }

                            }, function (reason) {
                                deferred.reject(reason);
                            },
                            $phonegapCameoConfig.isCrosswalk
                        );
                    } else {
                        deferred.reject('MIGRATION PLUGIN IS MISSING');
                    }

                    return deferred.promise;
                },
                migrationComplete: function() {
                    this.plugin.migrationComplete()
                }
            };

            self.init();

            return self;
        }
    ]);
'use strict';

// https://github.com/memoConnect/de.cameonet.cordova.crypto

angular.module('cmPhonegap')
    .service('cmCryptoHelper', [
        'cmPhonegap', 'cmDevice', 'cmLogger', 'cmUtil',
        '$window', '$q',
        function (cmPhonegap, cmDevice, cmLogger, cmUtil,
                  $window, $q) {

            var self = {
                plugin: null,
                keySize: 2048,

                init: function(){
                    cmPhonegap.isReady(function(){

                        if(!('cmCryptoHelper' in $window)){
                            //cmLogger.info('CRYPTOHELPER PLUGIN IS MISSING');
                            return false;
                        }

                        // only for ios
                        if(!cmDevice.isiOS()){
                            return false;
                        }

                        self.plugin = $window.cmCryptoHelper;
                    });
                },

                isAvailable: function(){
                    return this.plugin != null;
                },

                getPrivateKey: function(length){
                    var deffered = $q.defer();

                    if(this.isAvailable()){
                        this.plugin.getPrivateKey(function (privKey) {
                                deffered.resolve(privKey);
                            }, function () {
                                deffered.reject();
                            },
                                length | self.keySize
                        );
                    } else {
                        deffered.reject('NO PLUGIN EXISTS');
                    }

                    return deffered.promise;
                }
            };

            self.init();

            return self;
        }
    ]);
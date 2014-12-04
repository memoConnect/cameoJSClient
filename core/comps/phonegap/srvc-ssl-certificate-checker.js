'use strict';

// https://github.com/EddyVerbruggen/SSLCertificateChecker-PhoneGap-Plugin/tree/21a98bf

angular.module('cmPhonegap')
.service('cmSslCertificateChecker', [
    'cmPhonegap', 'cmConfig',
    '$rootScope', '$window',
    function (cmPhonegap, cmConfig,
              $rootScope, $window) {

        var self = {
            plugin: null,

            init: function(){
                cmPhonegap.isReady(function(){
                    if(!('plugins' in $window)
                        || !('sslCertificateChecker' in $window.plugins)) {
                        //cmLogger.info('NETWORK-INFORMATION PLUGIN IS MISSING');
                        return false;
                    }

                    self.plugin = $window.plugins.sslCertificateChecker;

                    self.control();
                })
            },

            control: function(){
                var target = (function(){
                    if(cmConfig.target == 'test' || cmConfig.target == 'default')
                        return 'stage';
                    return cmConfig.target;
                })(),
                    certificate = ('certificates' in cmConfig.static && target in cmConfig.static.certificates)
                                   ? cmConfig.static.certificates[target]
                                   : null,
                    server = certificate != null ? certificate.server : '',
                    fingerprint = certificate != null ? certificate.fingerprint.replace(/:/g,' ') : '';

                console.log(target,server,'"'+fingerprint+'"')

                if(server != '' && fingerprint != '') {
                    self.plugin.check(
                        self.handler.success,
                        self.handler.error,
                        server,
                        fingerprint
                    );
                } else {
                    this.handler.error('NO_CREDENTIALS');
                }
            },

            handler: {
                success: function(message){
                    console.log('success',message);
                    // Message is always: CONNECTION_SECURE.
                    // Now do something with the trusted server.
                },
                error: function(message){
                    console.log('error',message);
                    switch(true){
                        // There is likely a man in the middle attack going on, be careful!
                        case message == 'CONNECTION_NOT_SECURE':
                            // todo modal ssl certifcate isnt right block all app actions
                        break;
                        // There was no connection (yet). Internet may be down.
                        case message.indexOf('CONNECTION_FAILED') >= 0:
                            // todo offline online check!!!
                        break;
                        case message == 'NO_CREDENTIALS':
                            // default none app way
                        break;
                    }
                }
            }
        };

        return self;
    }
]);
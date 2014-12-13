'use strict';

// https://github.com/EddyVerbruggen/SSLCertificateChecker-PhoneGap-Plugin/tree/21a98bf

angular.module('cmPhonegap')
.service('cmSslCertificateChecker', [
    'cmPhonegap', 'cmConfig', 'cmLogger',
    '$rootScope', '$window', '$document',
    function (cmPhonegap, cmConfig, cmLogger,
              $rootScope, $window, $document) {

        var self = {
            plugin: null,
            isSecure: false,

            init: function(){
                cmPhonegap.isReady(function(){
                    if(!('plugins' in $window)
                        || !('sslCertificateChecker' in $window.plugins)) {
                        //cmLogger.info('NETWORK-INFORMATION PLUGIN IS MISSING');
                        return false;
                    }

                    self.plugin = $window.plugins.sslCertificateChecker;

                    $document.on('online', function(){
                        self.control();
                    });

                    self.control();
                })
            },

            control: function(){
                var target = (function(){
                    if(cmConfig.target != 'prod')
                        return 'stage';
                    return cmConfig.target;
                })(),
                    certificate = ('certificates' in cmConfig.static && target in cmConfig.static.certificates)
                                   ? cmConfig.static.certificates[target]
                                   : null,
                    server = certificate != null ? certificate.server : '',
                    fingerprint = certificate != null ? certificate.fingerprint : '';

                cmLogger.info('cmSslCertificateChecker '+cmConfig.target+'/'+target+' '+server+' '+fingerprint);

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
                success: function(){
                    cmLogger.info('cmSslCertificateChecker secure');
                    self.isSecure = true;
                },
                error: function(message){
                    cmLogger.error('cmSslCertificateChecker insecure '+message);
                    switch(true){
                        case message == 'CONNECTION_NOT_SECURE':
                        case message.indexOf('CONNECTION_FAILED') >= 0:
                        case message == 'NO_CREDENTIALS':
                            $rootScope.$broadcast('cmConnectionHandler:notSecure',function(){
                                self.control();
                            });
                        break;
                    }

                    self.isSecure = false;
                }
            }
        };

        return self;
    }
]);
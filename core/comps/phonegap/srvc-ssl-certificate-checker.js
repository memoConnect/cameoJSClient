'use strict';

// https://github.com/EddyVerbruggen/SSLCertificateChecker-PhoneGap-Plugin/tree/21a98bf

angular.module('cmPhonegap')
.service('cmSslCertificateChecker', [
    '$rootScope', '$window',
    function ($rootScope, $window) {

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

                var server = "https://build.phonegap.com";
                var fingerprint = "29 96 0F D5 FE 78 AA EF F4 36 CC 51 79 E4 8C 3C C7 B0 B7 8E"; // valid until sep 2014

                self.plugin.check(
                    self.handler.success,
                    self.handler.error,
                    server,
                    fingerprint
                );
            },

            handler: {
                success: function(message){
                    console.log(message);
                    // Message is always: CONNECTION_SECURE.
                    // Now do something with the trusted server.
                },
                error: function(message){
                    console.log(message);
                    if (message == "CONNECTION_NOT_SECURE") {
                        // There is likely a man in the middle attack going on, be careful!
                    } else if (message == "CONNECTION_FAILED") {
                        // There was no connection (yet). Internet may be down. Try again (a few times) after a little timeout.
                    }
                }
            }

        };

        return self;
    }
]);
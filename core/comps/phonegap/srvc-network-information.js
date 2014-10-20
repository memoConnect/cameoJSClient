'use strict';

// https://github.com/apache/cordova-plugin-network-information/blob/cd67d7a30f51efe7b2e3adb098ae65409d292d21/doc/index.md

angular.module('cmPhonegap')
.service('cmNetworkInformation', [
    'cmPhonegap', 'cmUtil', 'cmLogger',
    '$navigator', '$document', '$phonegapCameoConfig',
    function (cmPhonegap, cmUtil, cmLogger,
              $navigator, $document, $phonegapCameoConfig) {
        var self = {
            state: '',

            init: function(){
                if(typeof $phonegapCameoConfig == 'undefined') {
                    return false;
                }

                cmPhonegap.isReady(function(){
                    if(!('connection' in $navigator)
                    || !('type' in $navigator.connection)) {
                        //cmLogger.info('NETWORK-INFORMATION PLUGIN IS MISSING');
                        return false;
                    }

                    self.checkConnection();
                })
            },

            checkConnection: function(){
                var networkState = $navigator.connection.type;

                var states = {};
                states[Connection.UNKNOWN] = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI] = 'WiFi connection';
                states[Connection.CELL_2G] = 'Cell 2G connection';
                states[Connection.CELL_3G] = 'Cell 3G connection';
                states[Connection.CELL_4G] = 'Cell 4G connection';
                states[Connection.CELL] = 'Cell generic connection';
                states[Connection.NONE] = 'No network connection';

//                console.log('Connection type: ' + states[networkState]);
                this.state = states[networkState];
            },
            goesOffline: function(){

            },
            goesOnline: function(){

            }
        };

        $document[0].addEventListener('offline', self.goesOffline, false);
        $document[0].addEventListener('online', self.goesOnline, false);

        return self;
    }
]);
'use strict';

//https://github.com/apache/cordova-plugin-network-information/blob/cd67d7a30f51efe7b2e3adb098ae65409d292d21/doc/index.md

angular.module('cmPhonegap').service('cmNetworkInformation', [
    'cmPhonegap', 'cmUtil', 'cmLogger',
    function (cmPhonegap, cmUtil, cmLogger) {
        var self = {
            state: '',

            init: function(){

                if(!('connection' in navigator) || !('type' in navigator.connection)) {
                    //cmLogger.info('NETWORK-INFORMATION PLUGIN IS MISSING');
                    return false;
                }

                cmPhonegap.isReady(function(){
                    self.checkConnection();
                });
            },

            checkConnection: function(){
                var networkState = navigator.connection.type;

                var states = {};
                states[Connection.UNKNOWN] = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI] = 'WiFi connection';
                states[Connection.CELL_2G] = 'Cell 2G connection';
                states[Connection.CELL_3G] = 'Cell 3G connection';
                states[Connection.CELL_4G] = 'Cell 4G connection';
                states[Connection.CELL] = 'Cell generic connection';
                states[Connection.NONE] = 'No network connection';

                console.log('Connection type: ' + states[networkState]);
                this.state = states[networkState];
            },
            goesOffline: function(){

            },
            goesOnline: function(){

            }
        };

        document.addEventListener('offline', self.goesOffline, false);
        document.addEventListener('online', self.goesOnline, false);

        return self;
    }
]);
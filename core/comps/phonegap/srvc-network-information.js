'use strict';

// https://github.com/apache/cordova-plugin-network-information/blob/cd67d7a30f51efe7b2e3adb098ae65409d292d21/doc/index.md

angular.module('cmPhonegap')
.service('cmNetworkInformation', [
    'cmPhonegap', 'cmUtil', 'cmLogger', 'cmApi',
    '$navigator', '$document', '$window', '$rootScope',
    function (cmPhonegap, cmUtil, cmLogger, cmApi,
              $navigator, $document, $window, $rootScope) {
        var self = {
            plugin: null,
            state: '',

            init: function(){
                cmPhonegap.isReady('cmNetworkInformation',function(){
                    if(!('connection' in $navigator) || !('type' in $navigator.connection) || !Connection) {
                        //cmLogger.info('NETWORKINFORMATION PLUGIN IS MISSING');
                        return false;
                    }

                    self.plugin = $navigator.connection;

                    $document.on('online', function(){
                        self.checkConnection();
                        self.goesOnline();
                    });

                    $document.on('offline', function(){
                        self.checkConnection();
                        self.goesOffline();
                    });

                    self.checkConnection();
                })
            },

            checkConnection: function(){
                var networkState = this.plugin.type;

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
                $rootScope.$emit('cmApi:sleep');
            },
            goesOnline: function(){
                $rootScope.$emit('cmApi:wakeup');
            }
        };
        
        // html5 events
        if('onLine' in $navigator && $navigator.onLine) {
            // is already offline
            if(!$navigator.onLine){
                //api.state.unset('event_call_running');
                self.goesOffline();
            }
            // handle event states
            angular.element($window)
            .on('online', function () {
                self.goesOnline();
            })
            .on('offline', function () {
                self.goesOffline();
            });
        }

        return self;
    }
]);
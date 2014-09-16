'use strict';

angular.module('cmPhonegap').service('cmDevice', [
    'cmPhonegap', 'cmPushIp', 'cmApi',
    'cmLanguage', 'cmLogger', 'cmUtil',
    '$rootScope',
    function (cmPhonegap, cmPushIp, cmApi,
              cmLanguage, cmLogger, cmUtil,
              $rootScope) {

        var self = {
            currentDeviceId: '',

            existsPlugin: function () {
                if(typeof device == 'undefined'){
                    //cmLogger.info('DEVICE PLUGIN IS MISSING');
                    return false;
                }
                return true;
            },

            getPlatform: function(){
                return device.platform.toLowerCase();
            },

            isApp: function(){
                return this.existsPlugin();
            },
            isAndroid: function(){
                return this.existsPlugin()
                    && this.getPlatform().indexOf('android') >= 0;
            },
            isiOS: function(){
                return this.existsPlugin()
                   && (this.getPlatform().indexOf('iphone') >= 0
                    || this.getPlatform().indexOf('ipad') >= 0
                    || this.getPlatform().indexOf('ios') >= 0);
            },
            isWinPhone: function(){
                return this.existsPlugin()
                    && this.getPlatform().indexOf('win') >= 0;
            },
            isBlackBerry: function(){
                return this.existsPlugin()
                    && this.getPlatform().indexOf('blackberry') >= 0;
            },

            getCurrentOS: function(){
                var os = 'unknown';

                if(!this.existsPlugin())
                    return os;

                if (this.isAndroid()) {
                    os = 'and';
                } else if (this.isWinPhone()) {
                    os = 'win';
                } else if (this.isiOS()) {
                    os = 'ios';
                } else if (this.isBlackBerry()){
                    os = 'bby';
                }

                return os;
            },

            checkRegisteredDevice: function(accountPushDevices){
                /*
                 accountPushDevices = [
                     {
                         "deviceId": "id",
                         "language": "en-US",
                         "platform": "android"
                     }
                 ]
                */

                var accountPushDevices = accountPushDevices || [],
                deviceIsRegistered = accountPushDevices.filter(function(deviceId){
                    return deviceId == cmPushIp.deviceId
                }).length == 1;

                if(!deviceIsRegistered){
                    this.registerPushDevice();
                }

            },
            registerPushDevice: function(){
                /*
                 {
                     "deviceId":"id",
                     "language":"en-US",
                     "platform":"android"
                 }
                */
                cmPushIp.getDeviceId()
                .then(
                    function(deviceId){
                        self.currentDeviceId = deviceId;

                        cmApi.post({
                            path: '/pushDevice',
                            data: {
                                deviceId: deviceId,
                                language: cmLanguage.getCurrentLanguage().replace('_','-'),
                                platform: self.getCurrentOS()
                            }
                        });
                    }
                );
            },
            deleteDevice: function(token){
                if(this.currentDeviceId != '' && token && token != '') {
                    cmApi.delete({
                        path: '/deviceId/' + this.currentDeviceId,
                        overrideToken: token
                    });
                }
            }
        };

        $rootScope.$on('logout', function(event, data){
            self.deleteDevice(data.token);
        });

        return self;
    }
]);
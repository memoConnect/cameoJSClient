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
                    cmLogger.info('CAMERA PLUGIN IS MISSING');
                    return false;
                }
                return true;
            },

            isAndroid: function(){
                return this.existsPlugin()
                    && device.platform.indexOf('android') >= 0
            },
            getCurrentOS: function(){
                if(!this.existsPlugin())
                    return 'unknown';

                var platform = device.platform.toLowerCase(),
                    os = 'unknown';

                if (platform.indexOf('android') >= 0) {
                    os = 'and';
                }
                else if (platform.indexOf('win') >= 0) {
                    os = 'win';
                }
                else if (platform.indexOf('iphone') >= 0
                      || platform.indexOf('ipad') >= 0
                      || platform.indexOf('ios') >= 0) {
                    os = 'ios';
                }
                else if (platform.indexOf('blackberry') >= 0){
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
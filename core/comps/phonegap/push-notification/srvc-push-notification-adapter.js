'use strict';

// https://github.com/phonegap-build/PushPlugin

angular.module('cmPhonegap')
.service('cmPushNotificationAdapter', [
    'cmPhonegap', 'cmDevice', 'cmPushNotifications',
    'cmUtil', 'cmLanguage', 'cmApi', 'cmLogger', 'cmObject',
    '$rootScope', '$window', '$phonegapCameoConfig', '$injector',
    function (cmPhonegap, cmDevice, cmPushNotifications,
              cmUtil, cmLanguage, cmApi, cmLogger, cmObject,
              $rootScope, $window, $phonegapCameoConfig, $injector) {

        var self = {
            plugin: null,
            currentDeviceData: {
                token: undefined,
                id: undefined
            },
            deviceIsRegistrated: false,
            isDeviceRegistrated: function(){
                return this.deviceIsRegistrated;
            },

            init: function(){
                if ($phonegapCameoConfig == 'undefined'){
                    return false;
                }

                cmPhonegap.isReady(function(){
                    if(!('plugins' in $window) || !('pushNotification' in $window.plugins)) {
                        //cmLogger.info('PUSHNOTIFICATION PLUGIN IS MISSING');
                        return false;
                    }

                    self.plugin = $window.plugins.pushNotification;
                    self.registerAtService();
                })
            },

            registerAtService: function(){
                //cmLogger.info('cmPushNotificationAdapter.registerAtService')
                cmPushNotifications.registerAtService(self.plugin);
            },

            unregisterAtService: function(){
                cmPushNotifications.unregisterAtService();
            },

            getDeviceData: function(){
                return cmPushNotifications.getDeviceData();
            },

            checkRegisteredDevice: function(accountPushDevices){
//                cmLogger.info('cmPushNotificationAdapter.checkRegisteredDevice')
                // BE MOCK
                /*
                 accountPushDevices = [
                     {
                         "deviceToken": "id",
                         "language": "en-US",
                         "platform": "android"
                     }
                 ]
                 */
                // check if BE knows the registered device
//                this.getDeviceData()
//                .then(function(deviceData){
//                    var accountPushDevices = accountPushDevices || [],
//                        deviceIsRegistered = accountPushDevices.filter(function(deviceToken){
//                            return deviceToken == deviceData.token
//                        }).length == 1;
//
//                    if(!deviceIsRegistered){
//                        self.registerDevice();
//                    }
//                });
                cmPhonegap.isReady(function(){
                    if($injector.get('cmSettings').get('pushNotifications')) {
                        self.registerDevice();
                    }
                });
            },

            registerDevice: function(){
//                cmLogger.info('cmPushNotificationAdapter.registerDevice')
                // BE MOCK
                /*
                 {
                 "deviceId":"id",
                 "language":"en-US",
                 "platform":"android"
                 }
                 */
                this.getDeviceData()
                .then(function(deviceData){
                    //cmLogger.info('post pushDevice: '+ deviceData.token)
                    self.currentDeviceData = deviceData;
                    cmApi.post({
                        path: '/pushDevice',
                        data: {
                            deviceToken: deviceData.token,
                            language: cmLanguage.getCurrentLanguage().replace('_','-'),
                            platform: cmDevice.getCurrentOS()
                        }
                    }).then(
                        function(){
                            self.deviceIsRegistrated = true;
                            self.trigger('device:registrated');
                        }
                    );
                });
            },

            deleteDevice: function(token){
//                cmLogger.info('cmPushNotificationAdapter.deleteDevice')
                if(cmDevice.getCurrentOS() != 'unknown'
                && this.currentDeviceData.token) {

                    //cmLogger.info('delete pushDevice: '+ this.currentDeviceData.token)

                    var data = {
                        path: '/pushDevice/'+cmDevice.getCurrentOS()+'/'+this.currentDeviceData.token,
                    };

                    // this token for logout
                    if(token)
                        data.overrideToken = token;

                    cmApi.delete(data)
                    .then(function(){
                        self.deviceIsRegistrated = false;
                        self.trigger('device:unregistrated');
                    });
                }
            }
        };

        cmObject.addEventHandlingTo(self);

        $rootScope.$on('logout', function(event, data){
            self.deleteDevice(data.token);
        });

        return self;
    }
]);
'use strict';

// https://github.com/phonegap-build/PushPlugin

angular.module('cmPhonegap')
.service('cmPushNotificationAdapter', [
    'cmPhonegap', 'cmDevice', 'cmPushNotifications',
    'cmUtil', 'cmLanguage', 'cmApi',
    '$rootScope', '$window', '$phonegapCameoConfig',
    function (cmPhonegap, cmDevice, cmPushNotifications,
              cmUtil, cmLanguage, cmApi,
              $rootScope, $window, $phonegapCameoConfig) {

        var self = {
            plugin: null,

            currentDeviceData: {
                token: undefined,
                id: undefined
            },

            init: function(){

                if (typeof $phonegapCameoConfig == 'undefined'){
                    return false;
                }

                cmPhonegap.isReady(function(){
                    if(!('plugins' in $window) || !('pushNotification' in $window.plugins)) {
                        //cmLogger.info('PUSHNOTIFICATION PLUGIN IS MISSING');
                        return false;
                    }

                    self.plugin = $window.plugins.pushNotification;
                    self.register();
                })
            },

            register: function(){
                cmPushNotifications.plugin = self.plugin;
                cmPushNotifications.register();
            },

            unregister: function(){
                cmPushNotifications.unregister();
            },

            getDeviceData: function(){
                return cmPushNotifications.getDeviceData();
            },

            checkRegisteredDevice: function(accountPushDevices){
                if(!cmDevice.isApp())
                    return false;

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

                self.registerDevice();
            },

            registerDevice: function(){
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
                    self.currentDeviceData = deviceData;

                    cmApi.post({
                        path: '/pushDevice',
                        data: {
                            deviceToken: deviceData.token,
                            language: cmLanguage.getCurrentLanguage().replace('_','-'),
                            platform: cmDevice.getCurrentOS()
                        }
                    });
                });
            },

            deleteDevice: function(token){
                if(cmDevice.getCurrentOS() != 'unknown'
                && this.currentDeviceData.token
                && token && token != '') {
                    cmApi.delete({
                        path: '/deviceToken/'+cmDevice.getCurrentOS()+'/'+this.currentDeviceData.token,
                        overrideToken: token // this token for logout
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
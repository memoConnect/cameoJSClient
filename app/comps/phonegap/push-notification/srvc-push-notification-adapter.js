'use strict';

angular.module('cmPhonegap').service('cmPushNotificationAdapter', [
    'cmPhonegap', 'cmDevice', 'cmPushNotifications',
    'cmUtil', 'cmLanguage', 'cmApi',
    '$rootScope',
    function (cmPhonegap, cmDevice, cmPushNotifications,
              cmUtil, cmLanguage, cmApi,
              $rootScope) {

        var self = {

            currentDeviceData: {
                token: undefined,
                id: undefined
            },

            init: function(){
                if(!('plugins' in window) || !('pushNotification' in window.plugins) || !Puship) {
                    //cmLogger.info('PUSHNOTIFICATION PLUGIN IS MISSING');
                    return false;
                }
                cmPhonegap.isReady(function(){
                    self.plugin = window.plugins.pushNotification;
                    self.register();
                });
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
                this.getDeviceData()
                .then(function(deviceData){
                    var accountPushDevices = accountPushDevices || [],
                        deviceIsRegistered = accountPushDevices.filter(function(deviceToken){
                            return deviceToken == deviceData.token
                        }).length == 1;

                    if(!deviceIsRegistered){
                        self.registerDevice();
                    }
                });
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
                            token: deviceData.token,
                            language: cmLanguage.getCurrentLanguage().replace('_','-'),
                            platform: cmDevice.getCurrentOS()
                        }
                    });
                });
            },

            deleteDevice: function(token){
                if(cmDevice.getCurrentOS() != ''
                && this.currentDeviceData.token != ''
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
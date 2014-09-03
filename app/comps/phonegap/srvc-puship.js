'use strict';

//http://www.puship.com/documentations/common-guide/

angular.module('cmPhonegap').service('cmPushIp', [
    'cmPhonegap', 'cmLogger', 'cmUtil',
    function (cmPhonegap, cmLogger, cmUtil) {

        var self = {
            deviceToken: '',
            deviceId: '',

            init: function(){
                if(!('plugins' in window) || !('pushNotification' in window.plugins) || !Puship) {
                    //cmLogger.info('PUSHNOTIFICATION PLUGIN IS MISSING');
                    return false;
                }

                cmPhonegap.isReady(function(){
                    self.register();
                });
            },

            reset: function(){
                this.deviceToken = '';
                this.deviceId = '';
            },

            register: function(){
                this.reset();

                Puship.PushipAppId = phonegap_cameo_config.PushIpAppId;

                this.addTags();

                if (Puship.Common.GetCurrentOs() == Puship.OS.ANDROID) {
                    Puship.GCM.Register(phonegap_cameo_config.GoogleSenderId,{
                        successCallback: function (pushipresult) {
                            self.setDeviceData(pushipresult);
                        },
                        failCallback: function (pushipresult) {
                            console.info('error during registration: ' + JSON.stringify(pushipresult))
                        }
                    });
                } else if (Puship.Common.GetCurrentOs() == Puship.OS.IOS) {
                    Puship.APNS.Register({
                        successCallback: function (pushipresult) {
                            self.setDeviceData(pushipresult);
                        },
                        failCallback: function (pushipresult) {
                            console.info('error during registration: ' + JSON.stringify(pushipresult))
                        }
                    });
                } else {
                    console.info('Not supported platform');
                }

                this.initPushNotifcationReciever();
            },

            setDeviceData: function(pushipresult){
                console.info('Device registered')
                console.info('DeviceToken: '+pushipresult.DeviceToken)
                console.info('DeviceId: '+pushipresult.DeviceId)
                self.deviceToken = pushipresult.DeviceToken;
                self.deviceId = pushipresult.DeviceId;
            },

            unregister: function(){
                Puship.Common.UnRegister(
                    function() {
                        navigator.notification.alert('success unregistered');
                    },
                    function(err) {
                        navigator.notification.alert('error: '+ err);
                    }
                );
            },

            addTags: function(){
                Puship.Common.CleanTagFilter();
                //Puship.Common.AddTagFilter('Moep',{removePrevTag:true})
            },

            initPushNotifcationReciever: function(){
                Puship.Common.OnPushReceived(function (event) {
                    console.log('OnPushReceived')
                    try {
                        self.getMessageId(event.notification);
                    }
                    catch (err) {
                        console.info('Cannot display alert in background');
                    }
                });
            },

            getMessageId: function(commonPush){
                Puship.Common.GetPushMessagesByDevice({
                    limit:1,
                    successCallback: function (regresult){
                        console.log('GetPushMessagesByDevice ')
                        console.log(cmUtil.prettify(commonPush))
                        // only coldstart and background
                        if(!('foreground' in commonPush) && regresult.length > 0){
                            self.jumpTo(regresult[0], commonPush);
                        }
                    },
                    failCallback: function (regresult){
                        console.warn('error during GetPushMessagesByDevice: '+ regresult);
                    }
                });
            },

            jumpTo: function(lastPushNotification, commonPush){
                console.log('##jumpTo##')
                // at coldstart (off to on) deviceId & deviceToken empty
                // on background (on but not foregound) deviceId & deviceToken exists
                console.log(this.deviceId+' '+this.deviceToken)
                //lastPushNotification.Date
                //lastPushNotification.Message
                //lastPushNotification.PushMessageId
                console.log(cmUtil.prettify(lastPushNotification))
            }
        };

        return self;
    }
]);
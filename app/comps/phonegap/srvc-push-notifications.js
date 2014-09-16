'use strict';

// https://github.com/phonegap-build/PushPlugin

angular.module('cmPhonegap').service('cmPushNotifications', [
    'cmPhonegap', 'cmUtil',
    '$q', '$injector',
    function (cmPhonegap, cmUtil,
              $q, $injector) {

        var cmDevice = $injector.get('cmDevice');

        var self = {
            plugin: null,
            deviceToken: '',
            deviceId: '',

            init: function(){
                if(!('plugins' in window) || !('pushNotification' in window.plugins) || !Puship) {
                    //cmLogger.info('PUSHNOTIFICATION PLUGIN IS MISSING');
                    return false;
                }
                console.log('plugins ready check phonegap ready')
                cmPhonegap.isReady(function(){
                    console.log('phonegap ready pn register')
                    self.plugin = window.plugins.pushNotification;
                    self.register();
                });
            },

            reset: function(){
                this.deviceToken = '';
                this.deviceId = '';
            },

            register: function(){

                if ( cmDevice.isAndroid() ){
                    console.log('register android')
                    self.plugin.register(
                        this.successHandler,
                        this.errorHandler,
                        {
                            senderID:phonegap_cameo_config.googleSenderId,
                            ecb:'window.onNotification.Android'
                        }
                    );
                } else {
                    console.log('register other')
                    self.plugin.register(
                        this.tokenHandler,
                        this.errorHandler,
                        {
                            badge:true,
                            sound:true,
                            alert:true,
                            ecb:'window.onNotification.iOS'
                        }
                    );
                }
            },
            successHandler: function(result){
                // result contains any message sent from the plugin call
                console.log('##success#################');
                self.setDeviceData(result);
            },
            tokenHandler: function(result){
                console.log('##device registered token#################');
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
                self.setDeviceData(result);
            },
            errorHandler: function(error) {
                // result contains any error description text returned from the plugin call
                console.log('##error#################')
                console.log(error);
            },

            onNotification: {
                Android: function (event) {
                    switch (event.event) {
                        case 'registered':
                            console.log('##device registered regID#####################');
                            console.log(event)
                            if (event.regid.length > 0) {
                                // Your GCM push server needs to know the regID before it can push to this device
                                // here is where you might want to send it the regID for later use.
                                console.log('regID = ' + event.regid);
                            }
                            break;
                        case 'message':
                            if (event.foreground) {
                                console.log('##foreground inline push notification#####################');
                                //                                // on Android soundname is outside the payload.
                                //                                // On Amazon FireOS all custom attributes are contained within payload
                                //                                var soundfile = e.soundname || e.payload.sound;
                                //                                // if the notification contains a soundname, play it.
                                //                                var my_media = new Media("/android_asset/www/"+ soundfile);
                                //                                my_media.play();
                            } else {
                                if (event.coldstart) {
                                    console.log('##coldstart push notification#####################');
                                } else {
                                    console.log('##background push notification#####################');
                                }
                            }

                            console.log('message: ' + event.payload.message);
                            console.log('count: ' + event.payload.msgcnt);
                            console.log('time: ' + event.payload.timeStamp);
                            break;

                        case 'error':
                            console.log('##error#####################');
                            console.log(event.msg);
                            break;

                        default:
                            console.log('##default#####################');
                            console.log(cmUtil.prettify(event));
                            break;
                    }
                },
                iOS: function (event) {
//                    if ( event.alert ){
//                        navigator.notification.alert(event.alert);
//                    }

//                    if ( event.sound ){
//                        var snd = new Media(event.sound);
//                        snd.play();
//                    }

                    if (event.badge) {
                        self.plugin.setApplicationIconBadgeNumber(
                            this.successHandler,
                            this.errorHandler,
                            event.badge
                        );
                    }
                }
            },

            setDeviceData: function(result){
                //console.info('Device registered')
                //console.info('DeviceToken: '+pushipresult.DeviceToken)
                console.log('setDeviceData')
                console.log(result)

                return false;
                //this.deviceToken = result.DeviceToken;
                //this.deviceId = result.DeviceId;

                this.initDevicePromise();
                this.devicePromise.resolve(this.deviceId);
            },

            devicePromise: undefined,
            initDevicePromise: function(){
                if(!this.devicePromise)
                    this.devicePromise = $q.defer();
            },
            getDeviceId: function(){
                this.initDevicePromise();
                return this.devicePromise.promise;
            }
        };

        window.onNotification = self.onNotification;

        return self;
    }]
);
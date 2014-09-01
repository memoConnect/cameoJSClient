'use strict';

// https://github.com/phonegap-build/PushPlugin

angular.module('cmPhonegap').service('cmPushNotification', [
    'cmPhonegap', 'cmUtil',
    function (cmPhonegap, cmUtil) {

        var plugin;

        if(!('plugins' in window) || !('pushNotification' in window.plugins)) {
            console.info('PUSHNOTIFICATION PLUGIN IS MISSING');
        } else {
            plugin = window.plugins.pushNotification
        }

        var service = {
            existsPlugin: function(){
                if(plugin == undefined) {
                    return false;
                }
                return true;
            },
            register: function(){

                if(!this.existsPlugin())
                    return false;

                if ( cmPhonegap.isAndroid() ){
                    console.log('register with senderId:'+cameo_config.pushNotification.senderID)
                    plugin.register(
                        this.successHandler,
                        this.errorHandler,
                        {
                            senderID:cameo_config.pushNotification.senderID,
                            ecb:'window.onNotification.Android'
                        }
                    );
                } else {
                    plugin.register(
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
                console.log('result = ' + result);
            },
            tokenHandler: function(result){
                console.log('##device registered token#################');
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
                console.log('device token = ' + result);
            },
            errorHandler: function(error) {
                // result contains any error description text returned from the plugin call
                console.log('##error#################')
                console.log('error = ' + error);
            },

            onNotification: {
                Android: function (event) {
                    switch (event.event) {
                        case 'registered':
                            console.log('##device registered regID#####################');
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
                        plugin.setApplicationIconBadgeNumber(
                            this.successHandler,
                            this.errorHandler,
                            event.badge
                        );
                    }
                }
            }
        };

        window.onNotification = service.onNotification;

        return service;
    }]
);
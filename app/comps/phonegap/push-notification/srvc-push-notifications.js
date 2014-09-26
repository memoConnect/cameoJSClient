'use strict';

// https://github.com/phonegap-build/PushPlugin
// https://github.com/phonegap-build/PushPlugin#plugin_api

angular.module('cmPhonegap')
.service('cmPushNotifications', [
    'cmPhonegap', 'cmUtil', 'cmDevice', 'cmLogger',
    '$q', '$rootScope', '$phonegapCameoConfig',
    function (cmPhonegap, cmUtil, cmDevice, cmLogger,
              $q, $rootScope, $phonegapCameoConfig) {

        var self = {
            plugin: null,
            deviceToken: '',
            promise: undefined,
            channelName: 'cameo',

            reset: function(){
                this.deviceToken = '';
            },

            register: function(plugin){

                this.plugin = plugin;

                this.reset();
                // only gcm needs an senderid
                if (cmDevice.isAndroid()) {
                    this.plugin.register(
                        function() {
                            self.handler.success(arguments);
                        },
                        function() {
                            self.handler.error(arguments);
                        },
                        {
                            senderID: $phonegapCameoConfig.googleSenderId,
                            ecb: 'window.PushNotificationsCB.onNotification.Android'
                        }
                    );
                } else if(cmDevice.isiOS()){
                    this.plugin.register(
                        function(result){
                            self.handler.token(result);
                        },
                        function(){
                            self.handler.error(arguments);
                        },
                        {
                            badge: true,
                            sound: true,
                            alert: true,
                            ecb: 'window.PushNotificationsCB.onNotification.iOS'
                        }
                    );
                } else if(cmDevice.isWinPhone8()) {
                    this.plugin.register(
                        function(result) {
                            self.handler.channel(result);
                        },
                        function() {
                            self.handler.error(arguments);
                        },
                        {
                            channelName: this.channelName,
                            ecb: 'window.PushNotificationsCB.onNotification.WP8',
                            uccb: 'window.PushNotificationsCB.handler.channel',
                            errcb: 'window.PushNotificationsCB.handler.error'
                        }
                    );
                }
            },

            unregister: function(){
                this.plugin.unregister(
                    function(){
                        self.handler.success(arguments)
                    },
                    function(){
                        self.handler.error(arguments)
                    },
                    {
                        channelName: this.channelName
                    }
                );
            },

            setDeviceToken: function(token){
                console.log('##setDeviceToken#################');
                console.log(token);
                this.deviceToken = token;

                this.initPromise();
                this.promise.resolve({token:this.deviceToken,id:0});
            },

            initPromise: function(){
                if(!this.promise)
                    this.promise = $q.defer();
            },
            getDeviceData: function(){
                this.initPromise();
                return this.promise.promise;
            },

            handler: {
                success: function(result){
                    //console.log('##succesHandler#################');
                    //console.log(cmUtil.prettify(result));
                },
                token: function(token){
//                    console.log('##tokenHandler#################');
                    self.setDeviceToken(token);
                },
                channel: function(result){
                    //console.log('##channelHandler###############');
                    //console.log(cmUtil.prettify(result));
                },
                error: function(result) {
                    // result contains any error description text returned from the plugin call
                    console.log('##errorHandler#################');
                    console.log(cmUtil.prettify(result));
                }
            },

            onNotification: {
                Android: function (event) {
                    switch (event.event) {
                        case 'registered':
                            if (event.regid.length > 0) {
                                self.setDeviceToken(event.regid);
                            } else {
                                cmLogger.warn('Device couldn\'t register at GCM');
                            }
                            break;
                        case 'message':
                            console.log('##on pn#####################');
                            console.log(cmUtil.prettify(event))

                            if(!event.foreground){
                                var context = event.payload.context.split(':');
                                switch(context[0]){
                                    case 'message':
                                        $rootScope.goTo('conversation/'+context[1], true);
                                    break;
                                    case 'friendRequest':
                                        $rootScope.goTo('contact/request/list', true);
                                    break;
                                }
                                //$rootScope.goTo('talks', true);
                            } else {
                                console.log('cmBimmel!!!',event.payload.context)
                            }
//                            if (event.foreground) {
//                                console.log('##foreground inline push notification#####################');
////                                // on Android soundname is outside the payload.
////                                // On Amazon FireOS all custom attributes are contained within payload
////                                var soundfile = e.soundname || e.payload.sound;
////                                // if the notification contains a soundname, play it.
////                                var my_media = new Media("/android_asset/www/"+ soundfile);
////                                my_media.play();
//                            } else {
//                                if (event.coldstart) {
//                                    console.log('##coldstart push notification#####################');
//                                } else {
//                                    console.log('##background push notification#####################');
//                                }
//                            }
//
//                            console.log('message: ' + event.payload.message);
//                            console.log('count: ' + event.payload.msgcnt);
//                            console.log('time: ' + event.payload.timeStamp);
                            break;

                        case 'error':
                            console.log('##on pn error#####################');
                            console.log(cmUtil.prettify(event));
                            break;
                        default:
                            console.log('##on pn default###################');
                            console.log(cmUtil.prettify(event));
                            break;
                    }
                },
                iOS: function (event) {
                    console.log('##on pn#####################');
                    console.log(cmUtil.prettify(event))

//                    if ( event.alert ){
//                        navigator.notification.alert(event.alert);
//                    }

//                    if ( event.sound ){
//                        var snd = new Media(event.sound);
//                        snd.play();
//                    }

                    if('sound' in event && event.sound != '') {
                        var context = event.sound.split(':');
                        switch (context[0]) {
                            case 'message':
                                $rootScope.goTo('conversation/' + context[1], true);
                            break;
                            case 'friendRequest':
                                $rootScope.goTo('contact/request/list', true);
                            break;
                        }
                    }

                    if (event.badge) {
                        self.plugin.setApplicationIconBadgeNumber(
                            function(result) {
                                self.handler.success(arguments);
                            },
                            function() {
                                self.handler.error(arguments);
                            },
                            event.badge
                        );
                    }
                },
                WP8: function(event){
                    if (event.type == "toast" && event.jsonContent) {
                        self.plugin.showToastNotification(
                            function(){
                                self.handler.success(arguments);
                            },
                            function(){
                                self.handler.error(arguments);
                            },
                            {
                                Title: event.jsonContent["wp:Text1"],
                                Subtitle: event.jsonContent["wp:Text2"],
                                NavigationUri: event.jsonContent["wp:Param"]
                            });
                    }

                    if (event.type == "raw" && event.jsonContent) {
                        alert(event.jsonContent.Body);
                    }
                }
            }
        };
        // for callback
        window.PushNotificationsCB = self;

        return self;
    }
]);
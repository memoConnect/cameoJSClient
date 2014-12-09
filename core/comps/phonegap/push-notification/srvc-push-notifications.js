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

            registerAtService: function(plugin){
                //cmLogger.info('cmPushNotifications.registerAtService')

                this.plugin = plugin;
                this.reset();

                // only gcm needs an senderid
                if (cmDevice.isAndroid()) {
                    this.plugin.register(
                        function() {
                            self.handler.success('registerAtService.isAndroid',arguments);
                        },
                        function() {
                            self.handler.error('registerAtService.isAndroid',arguments);
                        },
                        {
                            senderID: $phonegapCameoConfig.googleSenderId,
                            ecb: 'window.PushNotificationsCB.onNotification.Android'
                        }
                    );
                } else if(cmDevice.isiOS()){
                    this.unregisterAtService();

                    this.plugin.register(
                        function(result){
                            self.handler.success('registerAtService.isiOS',arguments);
                            self.handler.token(result);
                        },
                        function(){
                            self.handler.error('registerAtService.isiOS',arguments);
                        },
                        {
                            badge: true,
                            sound: true,
                            alert: true,
                            ecb: 'window.PushNotificationsCB.onNotification.iOS'
                        }
                    );
                } else if(cmDevice.isWinPhone()) {
                    this.plugin.register(
                        function(result) {
                            self.handler.channel(result);
                        },
                        function() {
                            self.handler.error('registerAtService.isWinPhone8',arguments);
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

            unregisterAtService: function(){
                this.plugin.unregister(
                    function(){
                        self.handler.success('unregisterAtService',arguments)
                    },
                    function(){
                        self.handler.error('unregisterAtService',arguments)
                    },
                    {
                        channelName: this.channelName
                    }
                );
            },

            setDeviceToken: function(token){
                //cmLogger.info('cmPushNotifications.setDeviceToken: '+token)
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
                    //cmLogger.info('cmPushNotifications.handler.success: '+cmUtil.prettify(result))
                },
                token: function(token){
                    self.setDeviceToken(token);
                },
                channel: function(result){
                    //console.log('##channelHandler###############');
                    //console.log(cmUtil.prettify(result));
                },
                error: function(result) {
                    cmLogger.error('cmPushNotifications.handler.error: '+cmUtil.prettify(result))
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
                            if(!event.foreground){
                                self.onContext(event.payload.context);
                            } else {
                                //console.log('cmBimmel!!!',event.payload.context)
                            }
                            break;

                        case 'error':
                            self.handler.error('onNotification.Android.error',event);
                        break;
                        default:
                            self.handler.error('onNotification.Android.default',event);
                        break;
                    }
                },
                iOS: function (event) {
                    if('sound' in event && event.sound != '' && event.foreground != 1) {
                        self.onContext(event.sound);
                    }

                    if (event.badge) {
                        self.plugin.setApplicationIconBadgeNumber(
                            function(result) {
                                self.handler.success('onNotification.iOS.setApplicationIconBadgeNumber',arguments);
                            },
                            function() {
                                self.handler.error('onNotification.iOS.error',arguments);
                            },
                            event.badge
                        );
                    }
                },
                WP8: function(event){
                    if (event.type == "toast" && event.jsonContent) {
                        self.plugin.showToastNotification(
                            function(){
                                self.handler.success('onNotification.WP8.showToastNotification',arguments);
                            },
                            function(){
                                self.handler.error('onNotification.WP8.error',arguments);
                            },
                            {
                                Title: event.jsonContent["wp:Text1"],
                                Subtitle: event.jsonContent["wp:Text2"],
                                NavigationUri: event.jsonContent["wp:Param"]
                            });
                    }

                    if (event.type == "raw" && event.jsonContent) {
                        self.onContext(event.jsonContent.Body);
                    }
                }
            },

            onContext: function(data){
                cmLogger.error('cmPushNotifications.onContext: '+data);
                var context = data.split(':');
                switch(context[0]){
                    case 'message':
                        $rootScope.goTo('conversation/'+context[1], true);
                    break;
                    case 'friendRequest':
                        $rootScope.goTo('contact/request/list', true);
                    break;
                }
            }
        };
        // for callback
        window.PushNotificationsCB = self;

        return self;
    }
]);
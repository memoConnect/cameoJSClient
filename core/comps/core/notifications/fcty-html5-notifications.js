'use strict';

angular.module('cmCore').factory('cmHTML5Notifications', [
    'cmConfig', 'cmSettings', 'cmDevice', 'cmVisibility', 'cmLogger',
    '$rootScope', '$window', '$filter', '$timeout',
    function(cmConfig, cmSettings, cmDevice, cmVisibility, cmLogger,
             $rootScope, $window, $filter, $timeout){
        function cmHTML5Notifications(){
            var self = this,
                tabVisibility = true;

            /**
             * Service initialize
             */
            function init(){
                //cmLogger.debug('cmBrowserNotifications.init');
                cmVisibility.add('cmBrowserNotifications', checkBrowserVisibility)
            }

            /**
             * Callback for cmVisibility Server
             * @param isHidden {boolean}
             */
            function checkBrowserVisibility(isHidden){
                //cmLogger.debug('cmBrowserNotifications.checkBrowserVisibility');
                tabVisibility = !isHidden;
            }

            /**
             * Callback for Notification Clicks
             */
            function callbackOnClick(){
                //cmLogger.debug('cmBrowserNotifications.callbackOnClick');

                try {
                    $window.focus();
                } catch (e) {
                    // doesn't matter
                }
            }

            /**
             * Close Notification
             * @param notification {object}
             */
            function close(notification){
                //cmLogger.debug('cmBrowserNotifications.close');

                notification.close();
            }

            /**
             * check if Notification API exists in Browser
             * @returns {boolean}
             */
            this.checkBrowser = function(){
                //cmLogger.debug('cmBrowserNotifications.checkBrowser');

                if(!cmDevice.isApp() && "Notification" in $window) {
                    return true;
                }

                return false;
            };

            /**
             * check Notification Permission
             * @returns {boolean}
             */
            this.checkPermission = function(){
                //cmLogger.debug('cmBrowserNotifications.checkPermission');

                if(Notification.permission === "granted"){
                    return true;
                }

                return false;
            };

            /**
             * start Permission Request
             */
            this.askPermission = function(notify){
                //cmLogger.debug('cmBrowserNotifications.askPermission');

                if(this.checkBrowser() && !this.checkPermission()){
                    Notification.requestPermission(function (permission) {
                        if (permission === "granted") {
                            cmSettings.set('browserNotifications', true);

                            self.show(notify);
                        } else if(permission !== 'granted'){
                            cmSettings.set('browserNotifications', false);
                        }
                    });
                }
            };

            /**
             * initialize a new notification
             * @param notify {object}
             */
            this.show = function(notify){
                //cmLogger.debug('cmBrowserNotifications.show');

                if(this.checkBrowser() && this.checkPermission() && cmSettings.get('browserNotifications') && typeof notify == 'object' && !tabVisibility){

                    var title = $filter('cmTranslate')('CAMEO.NAME') + ' - ' + notify.title;

                    var options = {
                        body: notify.body,
                        icon: $window.location.origin + $window.location.pathname + cmConfig.static.appIcon
                    };

                    var notification = new Notification(title, options);

                    if(typeof notify.callbackOnClick == 'function'){
                        notification.onclick = notify.callbackOnClick;
                    } else {
                        notification.onclick = callbackOnClick;
                    }

                    $timeout(function(){
                        close(notification);
                    }, cmConfig.browserNotificationTimeout)

                } else if(cmSettings.get('browserNotifications')) {
                    this.askPermission(notify);
                }
            };

            init();
        }

        return cmHTML5Notifications;
    }
]);

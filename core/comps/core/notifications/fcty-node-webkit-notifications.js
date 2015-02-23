'use strict';

angular.module('cmCore').factory('cmNodeWebkitNotifications', [
    'cmConfig', 'cmSettings', 'cmDevice', 'cmLogger',
    '$rootScope', '$window', '$filter', '$timeout',
    function(cmConfig, cmSettings, cmApi, cmDevice, cmLogger,
             $rootScope, $window, $filter, $timeout){
        function cmNodeWebkitNotifications(){
            var self = this;

            /**
             * Service initialize
             */
            function init(){
                //cmLogger.debug('cmBrowserNotifications.init');
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
             * check Notification Permission
             * @returns {boolean}
             */
            this.checkPermission = function(){
                //cmLogger.debug('cmBrowserNotifications.checkPermission');

                if(cmSettings.get('browserNotifications')){
                    return true;
                }

                return false;
            };

            /**
             * initialize a new notification
             * @param notify {object}
             */
            this.show = function(notify){
                //cmLogger.debug('cmBrowserNotifications.show');

                if(this.checkPermission() && cmSettings.get('browserNotifications') && typeof notify == 'object'){

                    var title = $filter('cmTranslate')('CAMEO.NAME') + ' - ' + notify.title;

                    var options = {
                        body: notify.body,
                        icon: $window.location.origin + $window.location.pathname + cmConfig.static.appIcon
                    };

                    var notification = new DesktopNotification(title, options);

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
        }

        return cmNodeWebkitNotifications;
    }
]);

'use strict';

angular.module('cmCore').service('cmBrowserNotifications', [
    'cmConfig',
    'cmSettings',
    'cmApi',
    'cmDevice',
    'cmVisibility',
    'cmLogger',
    'cmUserModel',
    'cmIdentityModel',
    '$rootScope',
    '$filter',
    '$timeout',
    function(cmConfig, cmSettings, cmApi, cmDevice, cmVisibility, cmLogger, cmUserModel, cmIdentityModel, $rootScope, $filter, $timeout){
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
         * @param notification {object}
         */
        function callbackOnClick(notification){
            cmLogger.debug('cmBrowserNotifications.callbackOnClick');

            //close(notification);
        }

        /**
         * Close Notification
         * @param notification {object}
         */
        function close(notification){
            cmLogger.debug('cmBrowserNotifications.close');

            notification.close();
        }

        /**
         * check if Notification API exists in Browser
         * @returns {boolean}
         */
        this.checkBrowser = function(){
            //cmLogger.debug('cmBrowserNotifications.checkBrowser');

            if(!cmDevice.isApp() && "Notification" in window) {
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

            if(this.checkBrowser() && this.checkPermission() && cmSettings.get('browserNotifications') && typeof notify == 'object'){

                var options = {
                    body: notify.body,
                    icon: window.location.origin + window.location.pathname + cmConfig.appIcon
                };

                var notification = new Notification(notify.title, options);
                notification.onclick = callbackOnClick(notification);

                /**
                 * @TODO
                 * TTL in settings
                 */
                $timeout(function(){
                    close(notification);
                }, 3000)

           } else if(cmSettings.get('browserNotifications')) {
                this.askPermission(notify);
                cmLogger.debug('cmBrowserNotifications.send:nope!')
            }
        };

        /**
         * Adapter Function for Friend Request Notifications
         * @param identity {object} cmIdentityModel
         */
        this.showFriendRequest = function(identity){
            //cmLogger.debug('cmBrowserNotifications.showFriendRequest');

            if(identity instanceof cmIdentityModel && cmUserModel.data.identity.id != identity.id){
                this.show({
                    title: $filter('cmTranslate')('SYSTEM.EVENTS.FRIEND_REQUEST.TITLE'),
                    body: $filter('cmTranslate')('SYSTEM.EVENTS.FRIEND_REQUEST.MSG', {sender: identity.getDisplayName()})
                });
            }
        };

        /**
         * Adapter Function for new Message Notifications
         * @param identity {object} cmIdentityModel
         * @param conversationId {string}
         */
        this.showNewMessage = function(identity, conversationId){
            //cmLogger.debug('cmBrowserNotifications.showNewMessage');

            if(identity instanceof cmIdentityModel && cmUserModel.data.identity.id != identity.id){

                if(typeof conversationId == 'string' && !$rootScope.checkConversationRoute(conversationId) || !tabVisibility){
                    this.show({
                        title: $filter('cmTranslate')('SYSTEM.EVENTS.NEW_MESSAGE.TITLE'),
                        body: $filter('cmTranslate')('SYSTEM.EVENTS.NEW_MESSAGE.MSG',{sender: identity.getDisplayName()})
                    });
                }
            }
        };

        init();
    }
]);

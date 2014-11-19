'use strict';

angular.module('cmCore').service('cmBrowserNotifications', [
    'cmConfig',
    'cmSettings',
    'cmApi',
    'cmDevice',
    'cmLogger',
    'cmUserModel',
    'cmIdentityModel',
    '$filter',
    function(cmConfig, cmSettings, cmApi, cmDevice, cmLogger, cmUserModel, cmIdentityModel, $filter){

        function callbackOnClick(notification){
            cmLogger.debug('cmBrowserNotifications.callbackOnClick');
            notification.close();
        }

        var self = {
            /**
             * check if Notification API exists in Browser
             * @returns {boolean}
             */
            checkBrowser: function(){
                //cmLogger.debug('cmBrowserNotifications.checkBrowser');
                if(!cmDevice.isApp() && "Notification" in window) {
                    return true;
                }

                return false;
            },
            /**
             * check Notification Permission
             * @returns {boolean}
             */
            checkPermission: function(){
                //cmLogger.debug('cmBrowserNotifications.checkPermission');
                if(Notification.permission === "granted"){
                    return true;
                }

                return false;
            },
            /**
             * start Permission Request
             */
            askPermission: function(notify){
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
            },
            show: function(notify){
                //cmLogger.debug('cmBrowserNotifications.show');

                if(this.checkBrowser() && this.checkPermission() && cmSettings.get('browserNotifications') && typeof notify == 'object'){
                    /**
                     * @TODO
                     * TTL checken -> selber machen auf show event
                     */
                    var options = {
                        body: notify.body,
                        icon: window.location.origin + window.location.pathname + cmConfig.appIcon
                    };

                    var notification = new Notification(notify.title, options);
                    notification.onclick = callbackOnClick(notification);
               } else if(cmSettings.get('browserNotifications')) {
                    this.askPermission(notify);
                    cmLogger.debug('cmBrowserNotifications.send:nope!')
                }
            },
            showFriendRequest: function(identity){
                //cmLogger.debug('cmBrowserNotifications.show');
                if(identity instanceof cmIdentityModel && cmUserModel.data.identity.id != identity.id){
                    this.show({
                        title: $filter('cmTranslate')('SYSTEM.EVENTS.FRIEND_REQUEST.TITLE'),
                        body: $filter('cmTranslate')('SYSTEM.EVENTS.FRIEND_REQUEST.MSG', {sender: identity.getDisplayName()})
                    });
                }
            },
            showNewMessage: function(identity){
                //cmLogger.debug('cmBrowserNotifications.show');
                if(identity instanceof cmIdentityModel && cmUserModel.data.identity.id != identity.id){
                        this.show({
                        title: $filter('cmTranslate')('SYSTEM.EVENTS.NEW_MESSAGE.TITLE'),
                        body: $filter('cmTranslate')('SYSTEM.EVENTS.NEW_MESSAGE.MSG',{sender: identity.getDisplayName()})
                    });
                }
            }

        };

        return self;
    }
]);

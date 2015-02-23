'use strict';

angular.module('cmCore').service('cmBrowserNotifications', [
    'cmDevice', 'cmLogger', 'cmUserModel', 'cmIdentityModel',
    'cmHTML5Notifications', 'cmNodeWebkitNotifications',
    '$rootScope', '$window', '$filter',
    function(cmDevice, cmLogger, cmUserModel, cmIdentityModel,
             cmHTML5Notifications, cmNodeWebkitNotifications,
             $rootScope, $window, $filter){

        var self = this,
            service = null;

        /**
         * Service initialize
         */
        this.init = function(){
            //cmLogger.debug('cmBrowserNotifications.init');

            if(service == null && !cmDevice.isApp() && "Notification" in $window){
                //if(cmDevice.isNodeWebkit()){
                //    service = new cmNodeWebkitNotifications();
                //} else if(!cmDevice.isApp() && "Notification" in $window){
                    service = new cmHTML5Notifications();
                //}
            }
        };

        /**
         * Adapter Function for Friend Request Notifications
         * show Notification only if Tab/Browser are inactive
         *
         * @param identity {object} cmIdentityModel
         */
        this.showFriendRequest = function(identity){
            //cmLogger.debug('cmBrowserNotifications.showFriendRequest');
            if(identity instanceof cmIdentityModel && cmUserModel.data.identity.id != identity.id){
                service.show({
                    title: $filter('cmTranslate')('SYSTEM.EVENTS.FRIEND_REQUEST.TITLE'),
                    body: $filter('cmTranslate')('SYSTEM.EVENTS.FRIEND_REQUEST.MSG', {sender: identity.getDisplayName()}),
                    callbackOnClick: function(){
                        try {
                            $rootScope.goTo('/contact/request/list');

                            $window.focus();
                        } catch (e) {
                            // doesn't matter
                        }
                    }
                });
            }
        };

        /**
         * Adapter Function for new Message Notifications
         * show Notification only if Tab/Browser is active and Route is not current Conversation or if Tab/Browser is inactive
         *
         * @param identity {object} cmIdentityModel
         * @param conversationId {string}
         */
        this.showNewMessage = function(identity, conversationId){
            //cmLogger.debug('cmBrowserNotifications.showNewMessage');

            if(identity instanceof cmIdentityModel && cmUserModel.data.identity.id != identity.id){
                if(typeof conversationId == 'string' && (!$rootScope.checkConversationRoute(conversationId))){
                    service.show({
                        title: $filter('cmTranslate')('SYSTEM.EVENTS.NEW_MESSAGE.TITLE'),
                        body: $filter('cmTranslate')('SYSTEM.EVENTS.NEW_MESSAGE.MSG',{sender: identity.getDisplayName()}),
                        callbackOnClick: function(){
                            try{
                                if(!$rootScope.checkConversationRoute(conversationId) && !$rootScope.checkPurlRoute()){
                                    $rootScope.goTo('/conversation/' + conversationId);
                                }

                                $window.focus();
                            } catch(e){
                                // doesn't matter
                            }
                        }
                    });
                }
            }
        };
    }
]);

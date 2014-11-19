'use strict';

angular.module('cmCore').service('cmBrowserNotifications', [
    'cmConfig',
    'cmSettings',
    'cmApi',
    'cmDevice',
    'cmLogger',
    function(cmConfig, cmSettings, cmApi, cmDevice, cmLogger){

        function callbackOnClick(notification){
            console.log('callbackOnClick!!!');
            notification.close();
        }

        var self = {
            /**
             * check if Notification API exists in non mobile App Browser
             * @returns {boolean}
             */
            checkBrowser: function(){
                if (!cmDevice.isApp() && "Notification" in window) {
                    return true;
                }

                return false;
            },
            checkPermission: function(){
                if(Notification.permission === "granted"){
                    return true;
                }

                return false;
            },
            askPermission: function(){
                cmLogger.debug('cmBrowserNotifications.askPermission');

                if(this.checkBrowser() && !this.checkPermission()){
                  Notification.requestPermission(function (permission) {
                      console.log('permission', permission)

                      if (permission === "granted") {
                          cmSettings.set('browserNotifications', true);

                          self.send('Merci!!!!');
                      } else if(permission !== 'granted'){
                          cmSettings.set('browserNotifications', false);
                      }
                  });
                }
            },
            check: function(){
                if(this.checkBrowser() && !this.checkPermission() && cmSettings.get('browserNotifications')){
                    this.askPermission();
                }
            },
            send: function(title){
                if(this.checkBrowser() && this.checkPermission() && cmSettings.get('browserNotifications')){
                    /**
                     * @TODO
                     * TTL checken -> selber machen auf show event
                     */
                    var options = {
                        body: 'Notification Body',
                        icon: window.location.origin + window.location.pathname + cmConfig.appIcon
                    };

                    var notification = new Notification(title, options);
                    notification.onclick = callbackOnClick(notification);
               } else if(cmSettings.get('browserNotifications')) {
                    this.askPermission();
                    cmLogger.debug('cmBrowserNotifications.send:nope!')
                }
            }
        };

        return self;
    }
]);

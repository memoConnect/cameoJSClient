'use strict';

angular.module('cmCore').service('cmBrowserNotifications', [
    'cmSettings',
    'cmApi',
    'cmDevice',
    'cmLogger',
    function(cmSetting, cmApi, cmDevice, cmLogger){
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
              if(Notification.permission !== 'denied'){
                  Notification.requestPermission(function (permission) {
                      // If the user is okay, let's create a notification
                      if (permission === "granted") {
                          this.send('Merci!!!!');
                      }
                  });
              }
            },
            check: function(){
                if(this.checkBrowser() && !this.checkPermission()){
                    this.askPermission()
                } else {
                    this.send('du bist schon dabei');
                }
            },
            send: function(message){
                var notification = new Notification(message);
            }
        };

        return self;
    }
]);

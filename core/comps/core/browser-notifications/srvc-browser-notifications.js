'use strict';

angular.module('cmCore').service('cmBrowserNotifications', [
    'cmSettings',
    'cmApi',
    'cmDevice',
    'cmLogger',
    function(cmSetting, cmApi, cmDevice, cmLogger){
        var self = {
            check: function(){
                console.log('tada')
            }
        };

        return self;
    }
]);

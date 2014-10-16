'use strict';

angular.module('cmConversations').directive('cmRecipientCounter',[
    function(){
        return {
            restrict : 'AE',
            transclude: true,
            template : '<i class="fa cm-group background"></i><div class="foreground" ng-transclude></div>'
        }
    }
])
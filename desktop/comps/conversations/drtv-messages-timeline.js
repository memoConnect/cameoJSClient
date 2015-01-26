'use strict';

angular.module('cmDesktopConversations').directive('cmMessagesTimeline',[
    function (){
        return {
            restrict: 'E',
            templateUrl: 'comps/conversations/drtv-messages-timeline.html'
        }
    }
]);
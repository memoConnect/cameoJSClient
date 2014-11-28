'use strict';

angular.module('cmAppConversations').directive('cmMessagesTimeline',[
    function (){
        return {
            restrict: 'E',
            templateUrl: 'comps/conversations/drtv-messages-timeline.html'
        }
    }
]);
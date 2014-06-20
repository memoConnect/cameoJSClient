'use strict';

angular.module('cmConversations').directive('cmConversationTag',[
    function (){
        return {
            restrict: 'AE',
            scope: {
                conversation: "=cmData"
            },
            templateUrl: 'comps/conversations/drtv-conversation-tag.html',
            priority: 0
        }
    }
])
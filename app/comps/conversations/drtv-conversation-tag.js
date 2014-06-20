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
//            link: function(scope){
//                scope.conversation.on('update:finished', function(){
//                   console.log(scope.conversation.lastMessage.text);
//                    scope.conversation = {};
//                });
//            }
        }
    }
])
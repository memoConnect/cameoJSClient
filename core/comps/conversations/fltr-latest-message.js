'use strict';

angular.module('cmConversations')
.filter('cmLatestMessage', [
    function(){
        return function(conversation){
            return conversation.messages.reduce(function(latest_so_far, message){
                return  parseInt( (message && message.created) || 0) >= parseInt( (latest_so_far && latest_so_far.created) || 0)
                        ?   message
                        :   latest_so_far
            }, null)
        }
    }
])
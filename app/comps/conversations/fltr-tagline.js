'use strict';

angular.module('cmConversations').filter('cmTagline', [

    '$filter',

    function($filter){
        return function(conversation){               
            var latest_message = $filter('cmLatestMessage')(conversation)

            return      conversation.subject
                    || (latest_message && latest_message.from && latest_message.from.displayName
                    || (conversation.recipients.map( function(recipient){ console.dir(recipient); return recipient.displayName || 'CONTACT.ERROR.MISSING_DISPLAYNAME' }).join(', ') )
        }
    }
])
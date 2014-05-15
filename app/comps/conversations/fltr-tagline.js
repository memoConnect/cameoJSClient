'use strict';

angular.module('cmConversations').filter('cmTagline', [

    '$filter',

    function($filter){
        return function(conversation){               
            var latest_message = $filter('cmLatestMessage')(conversation)

            console.dir(latest_message)

            return      conversation.subject
                    || (latest_message && latest_message.from && latest_message.from.displayName)
                    || (conversation.recipients.map( function(recipient){ return recipient.displayName || 'CONTACT.ERROR.MISSING_DISPLAYNAME' }).join(', ') )
        }
    }
])
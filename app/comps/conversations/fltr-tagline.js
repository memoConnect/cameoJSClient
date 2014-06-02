'use strict';

angular.module('cmConversations').filter('cmTagline', [
    '$filter',
    function($filter){
        return function(conversation) {
            var latest_message = $filter('cmLatestMessage')(conversation)

            var subject;

            if (conversation.subject) {
                subject = conversation.subject
            } else if (latest_message && latest_message.from && latest_message.from.displayName) {
                subject = latest_message.from.getDisplayName();
            } else {
                subject = (conversation.recipients.map(function (recipient) {
                    return recipient.getDisplayName()
                }).join(', '));
            }

            return subject;
        }
    }
]);
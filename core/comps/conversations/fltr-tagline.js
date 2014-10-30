'use strict';

angular.module('cmConversations')
.filter('cmTagline', [
    '$filter',
    function($filter){
        return function(conversation) {
            var subject;

            if (conversation.subject) {
                subject = conversation.subject
            } else if (conversation.lastMessage && conversation.lastMessage.from && conversation.lastMessage.from.displayName) {
                subject = conversation.lastMessage.from.getDisplayName();
            } else {
                // TODO: show own user in subject???
                subject = (conversation.recipients.map(function (recipient) {
                    return recipient.getDisplayName();
                }).join(', '));
            }

            subject = $filter('cmParse')(subject);

            return subject;
        }
    }
]);
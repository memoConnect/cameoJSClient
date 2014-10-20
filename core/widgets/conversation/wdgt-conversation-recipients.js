'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */

angular.module('cmWidgets')
.directive('cmWidgetConversationRecipients', [
    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-recipients.html',
            scope: {
                conversation: '=cmData',
                search: '=cmSearch'
            },
            controller: function () {

            }
        }
    }
]);
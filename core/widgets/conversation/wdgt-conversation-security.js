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
.directive('cmWidgetConversationSecurity', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-security.html',
            scope: {
                conversation: '=cmData'
            },
            controller: function () {

            }
        }
    }
]);
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
.directive('cmWidgetConversation', [

    'cmWidget',

    function (cmWidget){
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation.html',
            scope: {
               conversation: '=cmData'
            },
            link: function(scope, element, attrs){
                cmWidget.setup(scope, element, attrs)
            },
            controller: function ($scope) {

            }
        }
    }
]);
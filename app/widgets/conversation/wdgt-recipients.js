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
.directive('cmWidgetRecipients', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-recipients.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
]);
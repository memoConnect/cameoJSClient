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
.directive('cmWidgetSecuritySettings', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-security-settings.html',
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
'use strict';

angular.module('cmConversations').directive('cmMessageFiles', [
    'cmFileFactory',
    'cmLogger',
    function (cmFileFactory, cmLogger) {
        return {
            restrict: 'E',
            require: '^cmMessage',
            templateUrl: 'comps/conversations/drtv-message-files.html',
            controller: function ($scope, $element, $attrs) {

            }
        }
    }
])
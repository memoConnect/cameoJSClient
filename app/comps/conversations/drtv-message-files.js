'use strict';

angular.module('cmConversations').directive('cmMessageFiles', [
    'cmAssetFactory',
    'cmLogger',
    function (cmAssetFactory, cmLogger) {
        return {
            restrict: 'E',
            require: '^cmMessage',
            templateUrl: 'comps/conversations/drtv-message-files.html',
            controller: function ($scope, $element, $attrs) {

            }
        }
    }
])
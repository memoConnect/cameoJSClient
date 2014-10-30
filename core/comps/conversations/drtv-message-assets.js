'use strict';

angular.module('cmConversations').directive('cmMessageAssets', [
    'cmSettings',
    function (cmSettings) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'comps/conversations/drtv-message-assets.html',
            controller: function($scope){
                $scope.settings = cmSettings;
            }
        }
    }
]);
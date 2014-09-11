'use strict';

angular.module('cmConversations').directive('cmRecipientsCommaSeperated', [
    function(){
        return {
            restrict: 'E',
            template: '<span>{{list}}}</span>',
            controller: function($scope){
                $scope.list = '';
            }
        }
    }
]);
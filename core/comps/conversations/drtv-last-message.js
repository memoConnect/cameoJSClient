'use strict';

angular.module('cmConversations').directive('cmLastMessage', [
    '$rootScope',
    function($rootScope){
        return {
            restrict: 'A',
            scope: true,
            controller: function($scope){
                if($scope.$last && $scope.message.state.is('sending')){
                    $rootScope.$emit('scroll:to');
                }
            }
        }
    }
]);
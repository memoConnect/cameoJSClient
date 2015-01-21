'use strict';

angular.module('cmConversations').directive('cmLastMessage', [
    '$rootScope',
    function($rootScope){
        return {
            restrict: 'A',
            scope: true,
            controller: function($scope){
                function encryptedCallback(){
                    $rootScope.$emit('scroll:to');
                }

                if($scope.$last){
                    if($scope.message.state.is('sending')){
                        $rootScope.$emit('scroll:to');
                    }

                    $scope.message.trigger('last-message:read', $scope.message);


                    $scope.message.on('decrypt:success',encryptedCallback);

                    $scope.$on('$destroy',function(){
                        $scope.message.off('decrypt:success',encryptedCallback);
                    });
                }
            }
        }
    }
]);
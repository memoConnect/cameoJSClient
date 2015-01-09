'use strict';

angular.module('cmConversations')
    .directive('cmModalHandshakeInfo',[
        '$rootScope',
        function ($rootScope){
            return {
                restrict: 'E',
                templateUrl: 'comps/conversations/modal/drtv-handshake-info.html',
                scope: {
                    modalId: "@id",
                    nosePosition: "@nosePosition"
                },
                controller: function($scope){
                    $scope.goTo = $rootScope.goTo;
                }
            }
        }
    ]);
'use strict';

angular.module('cmRouteConversation').directive('cmRecipients', [
    '$rootScope',
    '$location',
    '$window',
    function($rootScope, $location, $window){
        return {
            restrict: 'E',
            templateUrl: 'routes/conversation/comps/drtv-recipients.html',
            controller: function ($scope) {
                // TODO: pending conversation generate in drtv not in route controller
                var conversation = $rootScope.pendingConversation;
                if(!conversation){
                    $location.path('/conversation/new');
                    return null;
                }

                $scope.selected = {};

                $scope.disabled_remove = !!conversation.id;

                conversation.recipients.forEach(function(recipient){
                    $scope.selected[recipient.id] = true;
                });

                $scope.addRecipient = function(recipient){
                    $scope.selected[recipient.id] = true;
                    conversation.addRecipient(recipient);
                };

                $scope.removeRecipient = function(recipient){
                    if($scope.disabled_remove) return null;
                    delete $scope.selected[recipient.id];
                    conversation.removeRecipient(recipient);
                };

                $scope.toggleRecipient = function(recipient){
                    $scope.selected[recipient.id]
                        ?   $scope.removeRecipient(recipient)
                        :   $scope.addRecipient(recipient);
                };

                $scope.goBack = function(){
                    //goto('conversation/'+(conversation.id||'new'))
                    $window.history.back();
                }
            }
        }
    }
]);
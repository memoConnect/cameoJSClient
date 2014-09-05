'use strict';

angular.module('cmConversations').directive('cmRecipientTag',[
    // no dependencies
    function (){
        return {
            restrict: 'AE',
            scope: {
                selected: "=cmDataSelected",
                contact: "=cmDataContact",
                conversation: "=cmDataConversation"
            },
            templateUrl: 'comps/conversations/drtv-recipient-tag.html',
            controller: function($scope){
                $scope.addRecipient = function(recipient){
                    $scope.selected[recipient.id] = true;
                    $scope.conversation.addRecipient(recipient);
                };

                $scope.removeRecipient = function(recipient){
                    if($scope.disabled_remove) return null;
                    delete $scope.selected[recipient.id];
                    $scope.conversation.removeRecipient(recipient);
                };

                $scope.toggleRecipient = function(recipient){
                    $scope.selected[recipient.id]
                        ?   $scope.removeRecipient(recipient)
                        :   $scope.addRecipient(recipient);
                };
            }
        }
    }
]);
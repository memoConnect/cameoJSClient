'use strict';

angular.module('cmConversations').directive('cmRecipientsCommaSeperated', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict: 'E',
            scope: {
                conversation: '=cmData'
            },
            template: '<span class="is-selectable">{{entries}}</span>',
            controller: function($scope){
                $scope.entries = '';

                function refresh(){
                    if($scope.conversation.recipients.length > 2){
                        /**
                         * Groups
                         */
                        $scope.entries = $scope.conversation.recipients.filter(function(recipient){
                            return (recipient.id != cmUserModel.data.identity.id);
                        }).map(function(recipient){
                            return recipient.getDisplayName();
                        }).join(', ');
                    } else if($scope.conversation.recipients.length == 2){
                        /**
                         * Chat
                         */
                        $scope.entries =  $scope.conversation.recipients.filter(function(recipient){
                            return (recipient.id != cmUserModel.data.identity.id);
                        })[0].getDisplayName();
                    } else {
                        /**
                         * Own
                         */
                        $scope.entries = cmUserModel.data.identity.getDisplayName();
                    }
                }

                refresh();

                $scope.conversation.recipients.on('register deregister update:finished', refresh);
            }
        }
    }
]);
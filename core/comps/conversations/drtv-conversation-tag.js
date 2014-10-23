'use strict';

angular.module('cmConversations').directive('cmConversationTag',[
    'cmUserModel',
    '$routeParams',
    function (cmUserModel,
              $routeParams){
        return {
            restrict: 'AE',
            scope: {
                conversation: "=cmData"
            },
            templateUrl: 'comps/conversations/drtv-conversation-tag.html',
            priority: 0,
            link: function(scope, element){
                if('conversationId' in $routeParams
                && scope.conversation
                && scope.conversation.id == $routeParams.conversationId){
                    element.addClass('is-active');
                }
            },
            controller: function($scope){
                /**
                 * set Avatar Identity
                 */

                if($scope.conversation.id == 'Z8mCmNkfdYZsUY3KS8g6')
                    console.log('drtv',$scope.conversation)

                if($scope.conversation.recipients.length > 2){
                    $scope.avatarIdentity = $scope.conversation.lastMessage.from;
                } else {
                    if($scope.conversation.recipients.length == 1){
                        $scope.avatarIdentity = cmUserModel.data.identity;
                    } else {
                        var arr_recipients = $scope.conversation.recipients.filter(function(recipient){
                            return recipient.id != cmUserModel.data.identity.id;
                        });

                        $scope.avatarIdentity = arr_recipients[0];
                    }
                }
            }
        }
    }
]);
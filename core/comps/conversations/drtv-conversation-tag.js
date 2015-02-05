'use strict';

angular.module('cmConversations').directive('cmConversationTag',[
    'cmUserModel',
    'cmSettings',
    '$routeParams',
    function (cmUserModel, cmSettings, $routeParams){
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

                $scope.settings = cmSettings;

                function update(){
                    /**
                     * set Avatar Identity
                     */
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

                    $scope.timeOfLastUpdate = $scope.conversation.timeOfLastUpdate;
                }

                $scope.conversation.on('update:finished message:new',update);

                $scope.conversation.recipients.on('deregister', update)

                update();

                $scope.$on('$destroy', function () {
                    $scope.conversation.off('update:finished message:new', update);
                    $scope.conversation.recipients.off('deregister', update)
                });
            }
        }
    }
]);
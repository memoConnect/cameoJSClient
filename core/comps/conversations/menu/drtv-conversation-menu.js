'use strict';


angular.module('cmConversations')
.directive('cmConversationMenu', [
    'cmConversationFactory', 'cmModal', 'cmUtil',
    '$window', '$rootScope', '$q',
    function (cmConversationFactory, cmModal, cmUtil,
              $window, $rootScope, $q) {
        return {
            restrict: 'E',
            templateUrl: 'comps/conversations/menu/drtv-conversation-menu.html',
            scope: {
                conversation: '=cmData'
            },

            link: function(scope, element){
                function clickOutside(e){
                    if(e.target != element[0] &&
                        !cmUtil.findParent('cmConversationMenu',e.target)
                    ) {
                        scope.$apply(function(){
                            scope.handleMenu('close');
                        })
                    }
                }

                angular.element($window).on('click',clickOutside);

                scope.$on('$destroy', function(){
                    angular.element($window).off('click',clickOutside);
                });
            },

            controller: function ($scope, $element, $attrs) {
                $scope.goto = $rootScope.goto;

                $scope.menuVisible = false;

                $scope.handleMenu = function(forceClose){
                    $scope.menuVisible = !forceClose && $scope.menuVisible || forceClose ? false : true;
                }

                $scope.delete = function(){
                    cmModal.confirm({
                        title:  'CONVERSATION.MODAL.DELETE.HEADER',
                        text:   'CONVERSATION.MODAL.DELETE.TEXT'
                    })
                        .then(function() {

                            if($scope.conversation.recipients.length > 1){
                                var message = $scope.conversation.messages.create({
                                    conversation:$scope.conversation,
                                    id:'#new_message',
                                    fromIdentity: cmUserModel.data.identity,
                                    text:'$${SYSTEM.CONVERSATION.DELETE}'
                                });

                                return $scope.conversation.sendMessage(message);
                            } else {
                                return $q.when();
                            }
                        })
                        .then(function(){
                            return cmConversationFactory.deleteConversation($scope.conversation);
                        })
                        .then(function(){
                            cmConversationFactory.deregister($scope.conversation);
                            $rootScope.goTo('/talks');
                        })
                }
            }
        }
    }
]);
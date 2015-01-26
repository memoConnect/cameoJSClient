'use strict';

angular.module('cmConversations').directive('cmDeleteConversation',[
    'cmUserModel',
    'cmConversationsAdapter',
    'cmConversationFactory',
    'cmModal',
    'cmLoader',
    '$rootScope',
    '$q',
    function (cmUserModel, cmConversationsAdapter, cmConversationFactory, cmModal, cmLoader, $rootScope, $q){
        return {
            restrict: 'E',
            template: '<i class="fa cm-trash" ng-click="delete()"></i>',
            scope: {
                conversation: '=cmData'
            },
            link: function(scope, element){
            },
            controller: function($scope, $element, $attrs){
                var loader = new cmLoader($scope);

                $scope.delete = function(){
                    console.log('delete conversation')

                    // todo cmModal.confirm  -> when ja, show loader, call delete conversation method, if success goto talks

                    cmModal.confirm({
                        title:  'CONVERSATION.MODAL.DELETE.HEADER',
                        text:   'CONVERSATION.MODAL.DELETE.TEXT'
                    })
                    .then(function() {

                        var message = $scope.conversation.messages.create({
                            conversation:$scope.conversation,
                            id:'#new_message',
                            fromIdentity: cmUserModel.data.identity
                        });

                        return  $scope.conversation.getPassphrase()
                                .catch(function(){
                                    return  $scope.conversation.isEncrypted()
                                        ?   $q.reject('access denied')
                                        :   $q.when(null);
                                    //Todo: null for 'not encrypted' old convention
                                })
                                .then(function(passphrase) {
                                    return message
                                            .setText('$${SYSTEM.CONVERSATION.DELETE}')
                                            .setPublicData(['text', 'fileIds'])
                                            .revealSignatures()
                                            .getSignatures()
                                            .then(function () {
                                                return message.save()
                                            })
                                })
                    })
                    .then(function(){
                        return cmConversationsAdapter.deleteConversation($scope.conversation.id);
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
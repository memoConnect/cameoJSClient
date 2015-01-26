'use strict';

angular.module('cmConversations').directive('cmDeleteConversation',[
    'cmConversationFactory',
    'cmModal',
    'cmLoader',
    '$rootScope',
    function (cmConversationFactory, cmModal, cmLoader, $rootScope){
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
                }
            }
        }
    }
]);
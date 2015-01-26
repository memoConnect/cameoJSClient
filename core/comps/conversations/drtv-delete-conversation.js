'use strict';

angular.module('cmConversations').directive('cmDeleteConversation',[
    'cmConversationFactory',
    'cmLoader',
    '$document',
    function (cmConversationFactory, cmLoader, $document){
        return {
            restrict: 'E',
            template: '<i class="fa cm-trash" ng-click="delete()"></i>',
            link: function(scope, element){
            },
            controller: function($scope){
                var loader = new cmLoader($scope);

                $scope.delete = function(){
                    console.log('delete conversation')
                }
            }
        }
    }
]);
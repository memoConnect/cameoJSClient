'use strict';

angular.module('cmConversations').directive('cmRecipientTag',[
    'cmContactsModel',
    '$rootScope',
    function (cmContactsModel,$rootScope){
        return {
            restrict: 'AE',
            scope: {
                selected:       "=cmDataSelected",
                identity:       "=cmData",
                conversation:   "=cmDataConversation"
            },
            templateUrl: 'comps/conversations/drtv-recipient-tag.html',
            controller: function($scope){

                $scope.addRecipient = function(){
                    $scope.selected[$scope.identity.id] = true;
                    $scope.conversation.addRecipient($scope.identity);
                };

                $scope.removeRecipient = function(){
                    if($scope.disabled_remove) return null;
                    delete $scope.selected[$scope.identity.id];
                    $scope.conversation.removeRecipient($scope.identity);
                };

                $scope.toggleRecipient = function(){
                    if(!$scope.conversation.state.is('new'))
                        return false;

                    $scope.selected[$scope.identity.id]
                        ?   $scope.removeRecipient($scope.identity)
                        :   $scope.addRecipient($scope.identity);
                };

                $scope.goToContactWithIdentity  = function(identity){
                    var contact = cmContactsModel.findByIdentity(identity);
                    if(typeof contact == 'object'){
                        $rootScope.gotoContact(contact);
                    }
                };
            }
        }
    }
]);
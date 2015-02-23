'use strict';

angular.module('cmConversations').directive('cmRecipients', [
    '$rootScope',
    '$location',
    '$window',
    'cmContactsModel',
    function($rootScope, $location, $window, cmContactsModel){
        return {
            restrict: 'E',
            templateUrl: 'comps/conversations/drtv-recipients.html',
            controller: function ($scope, $element, $attrs) {
                $scope.selected         = {};
                $scope.contacts         = cmContactsModel.contacts;

                function init(conversation){
                    $scope.conversation = conversation;
                    $scope.$watchCollection('conversation.recipients', function(recipients){
                        $scope.selected = {};
                        recipients.forEach(function(recipient){
                            $scope.selected[recipient.id] = true;
                        })
                    })
                }

                $scope.addRecipient = function(identity){
                    $scope.selected[identity.id] = true;
                    $scope.conversation.addRecipient(identity);
                };

                $scope.removeRecipient = function(identity){
                    delete $scope.selected[identity.id];
                    $scope.conversation.removeRecipient(identity);
                };

                $scope.toggleRecipient = function(identity){
                    if(!$scope.conversation.state.is('new'))
                        return false;

                    $scope.selected[identity.id]
                        ?   $scope.removeRecipient(identity)
                        :   $scope.addRecipient(identity);
                };

                $scope.goToContactWithIdentity  = function(identity){
                    var contact = cmContactsModel.findByIdentity(identity);
                    if(typeof contact == 'object'){
                        $rootScope.gotoContact(contact);
                    }
                };

                $scope.goBack = function(){
                    //goto('conversation/'+(conversation.id||'new'))
                    $window.history.back();
                };

                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                        init(conversation);
                });

            }
        }
    }
]);
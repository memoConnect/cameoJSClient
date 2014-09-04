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
                $scope.contacts         = cmContactsModel.contacts


                function init(conversation){
                    $scope.conversation = conversation
                    $scope.$watchCollection('conversation.recipients', function(recipients){
                        $scope.selected = {}
                        recipients.forEach(function(recipient){
                            $scope.selected[recipient.id] = true;
                        })
                    })
                }

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

                $scope.goBack = function(){
                    //goto('conversation/'+(conversation.id||'new'))
                    $window.history.back();
                }

                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                        init(conversation)
                })

            }
        }
    }
]);
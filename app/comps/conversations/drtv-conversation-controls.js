'use strict';

angular.module('cmConversations').directive('cmConversationControls', [
    'cmUserModel',
    'cmNotify',
    '$location',
    function(cmUserModel, cmNotify, $location){
        return{
            restrict : 'AE',
            templateUrl : 'comps/conversations/drtv-conversation-controls.html',
//            scope : {
//                conversation :"=cmData"
//            },
//            require: '^cmConversation',

            link: function(scope, element, attrs, cmConversation){
                var levels = ['unsafe', 'safe', 'safer'];

                scope.bodyVisible = scope.isNew();

                //Todo: get rid of this! :
                scope.$watchCollection('scope.conversation', function(conversation){
                    if(conversation && !scope.safetyLevel){
                        scope._setLevel(levels[conversation.getSafetyLevel()]);
                    }
                });
            },

            controller: function($scope){

                $scope._setLevel = function(level){
                    if(level == 'unsafe'){
                        $scope.conversation.setPassphrase('');
                        $scope.conversation.setKeyTransmission('symmetric');
                    }

                    if(level == 'safe'){
                        $scope.conversation.setPassphrase();
                        $scope.conversation.setKeyTransmission('symmetric');
                    }

                    if(level == 'safer'){
                        $scope.conversation.setPassphrase();
                        $scope.conversation.setKeyTransmission('asymmetric');
                    }

                    $scope.safetyLevel = level;
                };

                $scope.setLevel = function(level){
                    if(cmUserModel.isGuest() !== true){
                        $scope._setLevel(level)
                    }
                };

                $scope.toggleControls = function(){
                    if($scope.bodyVisible)
                        $scope.bodyVisible = false;
                    else
                        $scope.bodyVisible = true;
                };

                $scope.manageRecipients = function(){
                    $location.path('/recipients')
                }
            }
        }
    }
])
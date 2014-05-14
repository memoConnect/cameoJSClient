'use strict';

angular.module('cmConversations').directive('cmConversationControls', [

    'cmUserModel',
    'cmNotify',
    'cmLogger',
    '$location',

    function(cmUserModel, cmNotify, cmLogger, $location){
        return{
            restrict : 'AE',
            templateUrl : 'comps/conversations/drtv-conversation-controls.html',
            scope : true,
            require: '^cmConversation',

            link: function(scope, element, attrs, cmConversation){
                var levels = ['unsafe', 'safe', 'safer'];

                scope.bodyVisible   = cmConversation.isNew()
                scope.isNew         = cmConversation.isNew()

                //Todo: get rid of this! :
                scope.$watch('conversation', function(conversation){
                    if(conversation && conversation.getSafetyLevel && !scope.safetyLevel){

                        scope._setLevel(levels[conversation.getSafetyLevel()]);

                        if(!cmConversation.isNew() && !conversation.password && conversation.getEncryptionType() == 'symmetric') {
                            scope.bodyVisible = true
                        }
                    }
                });
            },

            controller: function($scope){
                $scope.showPassword = false;

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
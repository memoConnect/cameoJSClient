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

                scope.bodyVisible   = cmConversation.isNew();
                scope.isNew         = cmConversation.isNew();

                //Todo: get rid of this! :
                scope.$watch('conversation', function(conversation){
                    if(conversation){
                        if(!cmConversation.isNew() && !conversation.password && (conversation.getKeyTransmission() == 'symmetric' || conversation.getKeyTransmission() == 'mixed') && !conversation.isUserInPassphraseList()) {
                            scope.toggleControls('open');
                        }

                        conversation.on('decrypt:ok', function(){
                            scope.toggleControls('close');
                        })
                    }
                });
            },

            controller: function($scope){
                $scope.hasCaptcha = false;
                $scope.isEncrypted = $scope.conversation.isEncrypted();
                $scope.showPassword = true;

                $scope.refreshCaptcha = function(){
                    $scope.$broadcast('captcha:refresh');
                };

                $scope.toggleControls = function(action){
                    if(action && action == 'close' || !action && $scope.bodyVisible){
                        $scope.bodyVisible = false;
                    } else {
                        $scope.bodyVisible = true;
                    }
                };

                $scope.manageRecipients = function(){
                    $location.path('/recipients')
                };

                $scope.decrypt = function(){
                    $scope.conversation.one('decrypt:failed', function(){
                        cmNotify.warn('CONVERSATION.WARN.PASSWORD_WRONG',{ttl:2000})
                    });
                    $scope.conversation.decrypt();
                };

                $scope.toggleConversationEncryption = function(){
                    if($scope.isEncrypted !== false){
                        $scope.isEncrypted = false;
                        $scope.conversation.disableEncryption();

                        $scope.showPassword = false;
                    } else {
                        $scope.isEncrypted = true;
                        $scope.conversation.enableEncryption();

                        $scope.showPassword = true;
                    }
                };

                $scope.toggleCaptcha = function(){
                    if($scope.isEncrypted !== false){
                        if($scope.hasCaptcha !== false){
                            $scope.hasCaptcha = false;
                        } else {
                            $scope.hasCaptcha = true;
                        }
                    }
                };
            }
        }
    }
])
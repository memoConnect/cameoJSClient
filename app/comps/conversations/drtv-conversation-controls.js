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
                        });
                    }
                });

                /**
                 * Event Handling
                 */
                scope.conversation.on('show:password', function(){
                    scope.conversation.options.showPassword = true;
                });
            },

            controller: function($scope){
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
                    if($scope.conversation.isEncrypted() !== false){
                        $scope.conversation.disableEncryption();
                        $scope.conversation.options.showPassword = false;
                    } else {
                        $scope.conversation.enableEncryption();
                        $scope.conversation.options.showPassword = true;
                    }
                };

                $scope.toggleCaptcha = function(){
                    if($scope.conversation.isEncrypted() !== false){
                        if($scope.conversation.options.hasCaptcha !== false){
                            $scope.conversation.options.hasCaptcha = false;
                        } else {
                            $scope.conversation.options.hasCaptcha = true;
                        }
                    }
                };
            }
        }
    }
])
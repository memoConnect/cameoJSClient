'use strict';

angular.module('cmConversations').directive('cmConversationControls', [
    'cmUserModel',
    'cmNotify',
    'cmLogger',
    '$location',
    '$document',
    function(cmUserModel, cmNotify, cmLogger, $location, $document){
        return{
            restrict : 'AE',
            templateUrl : 'comps/conversations/drtv-conversation-controls.html',
            scope : true,
            require: '^cmConversation',

            link: function(scope, element, attrs, cmConversation){
                scope.bodyVisible   = cmConversation.isNew();
                scope.isNew         = cmConversation.isNew();


                function showControls(conversation){
                    if(!conversation.state.is('new')
                        && (conversation.getKeyTransmission() == 'symmetric' || conversation.getKeyTransmission() == 'mixed')
                        && !conversation.password
                        && !conversation.isUserInPassphraseList()
                    ){
                        scope.toggleControls('open');
                    }
                }

                /**
                 * watch the conversation object on changes
                 */
                scope.$watch('conversation', function(conversation){
                    if(conversation){
                        // open the controls for a new conversation and password isnt set in a symetric case || case mixed exists and user isnt in passphraselist

                        conversation.securityAspects.refresh();

                        conversation.on('update:finished', function(){
                            showControls(conversation);
                        });

                        showControls(conversation);

                        // close the controls if decryption was ok
                        conversation.on('decrypt:ok', function(){
                            scope.toggleControls('close');
                        });
                    }
                });
            },

            controller: function($scope){

                /**
                 * @name toggleControls
                 * @description
                 * toggle (show and hide) the controls of a conversation
                 *
                 * @param {String} action close | open
                 * @param {Boolean} withFocusOnMessage after click on save the first focus is on message textarea
                 */
                $scope.toggleControls = function(action, withFocusOnMessage){
                    if(action && action == 'close' || !action && $scope.bodyVisible){
                        $scope.bodyVisible = false;
                    } else {
                        $scope.bodyVisible = true;
                    }

                    if(withFocusOnMessage){
                        $document[0].querySelector('cm-conversation .answer textarea').focus();
                    }
                };

                /**
                 * @name manageRecipients
                 * @description
                 * redirect to route /recipients
                 */
                $scope.manageRecipients = function(){
                    $location.path('/recipients')
                };

                /**
                 * @name decrypt
                 * @description
                 * try to decrypt the conversation
                 */
                $scope.decrypt = function(){
                    $scope.conversation.one('decrypt:failed', function(){
                        cmNotify.warn('CONVERSATION.WARN.PASSWORD_WRONG',{ttl:2000});
                        $scope.toggleControls('open');
                    });
                    $scope.conversation.decrypt();
                };

                /**
                 * @name toggleConversationEncryption
                 * @description
                 * enable or disable encryption for a conversation
                 */
                $scope.toggleConversationEncryption = function(){
                    if($scope.conversation.state.is('new')){
                        if($scope.conversation.isEncrypted() !== false){
                            $scope.conversation.disableEncryption();
                        } else {
                            $scope.conversation.enableEncryption();
                        }
                    }
                };

                /**
                 * @name toggleCaptcha
                 * @description
                 * enable or disable passcaptcha creation
                 */
                $scope.toggleCaptcha = function(){
                    if($scope.conversation.state.is('new') && $scope.conversation.isEncrypted() !== false){
                        if($scope.conversation.options.hasCaptcha !== false){
                            $scope.conversation.disablePassCaptcha();
                        } else {
                            $scope.conversation.enablePassCaptcha();
                        }
                    }
                };

                /**
                 * @name refreshCaptcha
                 * @description
                 * redraw a new passcaptcha
                 */
                $scope.refreshCaptcha = function(){
                    $scope.$broadcast('captcha:refresh');
                };
            }
        }
    }
])
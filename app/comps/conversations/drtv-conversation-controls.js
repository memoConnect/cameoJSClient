'use strict';

angular.module('cmConversations').directive('cmConversationControls', [
    'cmUserModel',
    'cmNotify',
    'cmLogger',
    '$location',
    '$document',
    '$window',
    'cmEnv',
    '$rootScope',
    function(cmUserModel, cmNotify, cmLogger, $location, $document, $window, cmEnv, $rootScope){
        return{
            restrict : 'AE',
            templateUrl : 'comps/conversations/drtv-conversation-controls.html',
            scope : true,
            require: '^cmConversation',

            link: function(scope, element, attrs, cmConversation){
                scope.bodyVisible   = cmConversation.isNew();
                scope.isNew         = cmConversation.isNew();
                scope.inputFocus    = false;
                scope.showPasswordLocalKeyInfo = false;
                var times = 0;

                function showControls(conversation){
                    if(!conversation.state.is('new')
                        && (conversation.getKeyTransmission() == 'symmetric' || conversation.getKeyTransmission() == 'mixed')
                        && !conversation.password
                        && !conversation.isUserInPassphraseList()
                    ){
                        scope.toggleControls('open');
                    }
                }

                function showPasswordInfo(conversation){
                    if(conversation.state.is('new') && conversation.isEncrypted() && cmUserModel.hasLocalKeys() == false){
                        scope.showPasswordLocalKeyInfo = true;
                    } else {
                        scope.showPasswordLocalKeyInfo = false;
                    }
                }

                /**
                 * watch the conversation object on changes
                 */
                scope.$watch('conversation', function(conversation){
                    if(conversation){
                        // open the controls for a new conversation and password isnt set in a symetric case || case mixed exists and user isnt in passphraselist

                        showControls(conversation);

                        conversation.on('update:finished', function(){
                            showControls(conversation);
                        });

                        // close the controls if decryption was ok
                        conversation.on('decrypt:ok', function(){
                            scope.toggleControls('close');
                        });

                        showPasswordInfo(conversation);

                        conversation.on('encryption:enabled', function(){
                            showPasswordInfo(conversation);
                        });

                        conversation.on('encryption:disabled', function(){
                            showPasswordInfo(conversation);
                        });
                    }
                });

                // TODO: found what does ios with window height and control height
                var w = angular.element($window),
                    inputFocus = undefined;

                function checkHeight(){
                    var window = $window.innerHeight,
                        control = element[0].scrollHeight + element[0].offsetTop,
                        body = angular.element($document[0].querySelector(element[0].localName+' .body')),
                        bar = body[0].nextSibling.scrollHeight;

                    // set to min height
                    if(window < control){
                        element.addClass('too-big');
                        body.css('height',(window-(element[0].offsetTop+bar))+'px');
                        if(inputFocus != undefined){
                            scope.scrollToPasswordArea();
                        }
                    // reset
                    } else {
                        element.removeClass('too-big');
                        body.css({'height':'','width':'100%'});
                    }
                }

                w.bind('resize', checkHeight);

                scope.$watch(function() {
                    if(!scope.bodyVisible)
                        return false;

                    if(!scope.inputFocus)
                        checkHeight();
                });

                $rootScope.$on('cmIosFocus:focus',function(event,input){
                    scope.inputFocus = true;
                    if(input.attr('data-qa') == 'input-password'){
                        inputFocus = input;
                    }
                });
                $rootScope.$on('cmIosFocus:blur',function(){
                    scope.inputFocus = false;
                    inputFocus = undefined;
                });
            },

            controller: function($scope, $element){
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
                    if($scope.conversation.state.is('new')){
                        $location.path('/recipients')
                    }
                };

                /**
                 * @name decrypt
                 * @description
                 * try to decrypt the conversation
                 */
                $scope.decrypt = function(){
                    if($scope.conversation.isEncrypted() && !($scope.conversation.keyTransmission == 'asymmetric'
                        && cmUserModel.hasLocalKeys() == false)) {

                        $scope.conversation.one('decrypt:failed', function () {
                            cmNotify.warn('CONVERSATION.WARN.PASSWORD_WRONG');
                            $scope.toggleControls('open');
                        });
                        $scope.conversation.decrypt();
                    }
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

                $scope.scrollToPasswordArea = function(){
                    // scroll to password
                    var anchor = $document[0].querySelector('#password-area'),
                        body = angular.element($document[0].querySelector($element[0].localName+' .body'));
                        body[0].scrollTop = anchor.offsetTop;
                }
            }
        }
    }
])
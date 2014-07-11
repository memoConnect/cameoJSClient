'use strict';

angular.module('cmConversations').directive('cmSecuritySettings', [
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
            templateUrl : 'routes/conversation/comps/drtv-security_settings.html',
            scope : true,

            link: function(scope, element, attrs, cmConversation){
                scope.inputFocus    = false;
                scope.showPasswordLocalKeyInfo = false;
                var times = 0;

                function showPasswordInfo(conversation){
                    if(conversation.isEncrypted() && cmUserModel.hasLocalKeys() == false){
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

                        showPasswordInfo(conversation);

                        conversation.on('encryption:enabled', function(){
                            showPasswordInfo(conversation);
                        });

                        conversation.on('encryption:disabled', function(){
                            showPasswordInfo(conversation);
                        });
                    }
                });

                var inputFocus = undefined;

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

                scope.$watch('conversation.password', function(password){
                    if(scope.conversation.state.is('new'))
                        scope.conversation.securityAspects.refresh()
                })
            },

            controller: function($scope, $element, $attrs){
                $scope.conversation = $scope.$eval($attrs.cmData)

                // TODO: pending conversation generate in drtv not in route controller
                var conversation = $rootScope.pendingConversation;
                /*if(!conversation){
                    $location.path('/conversation/new');
                    return null;
                }*/

                $scope.goBack = function(){
                    //goto('conversation/'+(conversation.id||'new'))
                    $window.history.back();
                };

                $scope.isNew = function(){
                    return $scope.conversation.state.is('new');
                };

                /**
                 * @name decrypt
                 * @description
                 * try to decrypt the conversation
                 */
                $scope.decrypt = function(){
                    if($scope.conversation.isEncrypted()
                        && !($scope.conversation.keyTransmission == 'asymmetric' && cmUserModel.hasLocalKeys() == false)
                    ) {

                        $scope.conversation.one('decrypt:failed', function () {
                            cmNotify.warn('CONVERSATION.WARN.PASSWORD_WRONG');
                            //$scope.toggleControls('open');
                            //TODO go to settings page??
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
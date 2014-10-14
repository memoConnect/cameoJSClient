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
            templateUrl : 'comps/conversations/drtv-security-settings.html',
            scope : true,

            link: function(scope){
                scope.showPasswordLocalKeyInfo = false;

                function showPasswordInfo(conversation){
                    if(conversation.isEncrypted() && !conversation.userHasPrivateKey()){
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

                scope.$watch('conversation.password', function(){
                    if(scope.conversation.state.is('new'))
                        scope.conversation.securityAspects.refresh()
                })
            },

            controller: function($scope, $element, $attrs){
                $scope.conversation = $scope.$eval($attrs.cmData)

                $scope.goBack = function(){
                    //goto('conversation/'+(conversation.id||'new'))
                    $window.history.back();
                };

                /**
                 * @name decrypt
                 * @description
                 * try to decrypt the conversation
                 */
                $scope.decrypt = function(){
                    if(     !$scope.conversation.state.is('new')
                        &&  $scope.conversation.isEncrypted()
                        &&  !($scope.conversation.getKeyTransmission() == 'asymmetric' && $scope.conversation.userHasPrivateKey() == false)
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
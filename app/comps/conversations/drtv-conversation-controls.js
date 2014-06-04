'use strict';

angular.module('cmConversations').directive('cmConversationControls', [
    'cmUserModel',
    'cmNotify',
    'cmLogger',
    '$location',
    '$timeout',

    function(cmUserModel, cmNotify, cmLogger, $location, $timeout){
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
                            scope.bodyVisible = true;
                        }

                        conversation.on('decrypt:ok', function(){
                            scope.toggleControls();
                        })
                    }
                });
            },

            controller: function($scope){
                $scope.hasCaptcha = false;

                $scope.toggleCaptcha = function(type){
                    if(typeof type !== 'undefined'){
                       switch(type){
                           case "password":
                               $scope.hasCaptcha = false;
                               $scope.conversation.passCaptcha = '';
                               break;
                           case "captcha":
                               $scope.hasCaptcha = true;
                               break;
                       }
                    }
                };

                $scope.refreshCaptcha = function(){
                    $scope.$broadcast('captcha:refresh');
                };

                /**
                 * @todo
                 *
                 * @deprecated
                 * @param level
                 * @private
                 */
                $scope._setLevel = function(level){
//                    if(level == 'unsafe'){
//                        $scope.conversation.preferences.encryption = false
//                        $scope.conversation.preferences.keyTransmission = 'symmetric'
//                    }
//
//                    if(level == 'safe'){
//                        $scope.conversation.preferences.encryption = true
//                        $scope.conversation.preferences.keyTransmission = 'symmetric'
//                    }
//
//                    if(level == 'safer'){
//                        $scope.conversation.preferences.encryption = true
//                        $scope.conversation.preferences.keyTransmission = 'asymmetric'
//                    }
//
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

                $scope.decrypt = function(){
                    $scope.conversation.one('decrypt:failed', function(){
                        cmNotify.warn('CONVERSATION.WARN.PASSWORD_WRONG',{ttl:2000})
                    })
                    $scope.conversation.decrypt();
                }

            }
        }
    }
])
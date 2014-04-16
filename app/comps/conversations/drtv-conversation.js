'use strict';

angular.module('cmConversations').directive('cmConversation', [

    'cmConversationsModel',
    'cmMessageFactory',
    'cmUserModel',
    'cmRecipientModel',
    'cmCrypt',
//    'cmCron',
    'cmLogger',
    'cmNotify',
    '$location',
    '$rootScope',

    function (cmConversationsModel, cmMessageFactory, cmUserModel, cmRecipientModel, cmCrypt, cmLogger, cmNotify, $location, $rootScope) {
        return {
            restrict: 'AE',
            templateUrl: 'comps/conversations/drtv-conversation.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                var self                 = this,
                    conversation_id      = $scope.$eval($attrs.cmConversations) || $scope.$eval($attrs.conversationId),
                    conversation_subject = $scope.$eval($attrs.cmSubject),
                    conversation_offset  = $attrs.offset,
                    conversation_limit   = $attrs.limit

                $scope.sendMessage = function () {

                    var passphrase_valid    = !!$scope.conversation.passphraseValid(),
                        message_empty       = !$scope.my_message_text,
                        recipients_missing  = $scope.conversation.recipients.length <= 0 //@todo mocked

                    if(!message_empty && passphrase_valid && !recipients_missing){
                        if($scope.conversation.id == ''){
                            $scope.conversation.save().then(
                                function(){
                                    $scope.sendMessage();
                                }
                            );
                        } else {
                            cmMessageFactory.create( {body: $scope.my_message_text} )
                                .encrypt($scope.conversation.passphrase)
                                .addTo($scope.conversation)
                                .sendTo($scope.conversation.id)
                                .then(function(){
                                    $scope.conversation.numberOfMessages++;
                                    $scope.my_message_text = "";

                                    if($scope.new_conversation !== false){
                                        cmConversationsModel.addConversation($scope.conversation, true);
                                        $location.path('/conversation/' + $scope.conversation.id);
                                    }
                                })
                        }
                    }

                    if (!passphrase_valid)    cmNotify.warn('CONVERSATION.WARN.PASSPHRASE_INVALID')
                    if (message_empty)        cmNotify.warn('CONVERSATION.WARN.MESSAGE_EMPTY')
                    if (recipients_missing)   cmNotify.warn('CONVERSATION.WARN.RECIPIENTS_MISSING')
                }

                $scope.sendAsset = function () {
                    var passphrase_valid = !!$scope.conversation.passphraseValid(),
                        recipients_missing = $scope.conversation.recipients.length <= 1,
                        assetId_missing = !$scope.assetId

                    passphrase_valid && !assetId_missing && !recipients_missing
                        ?   $scope.conversation
                        .newMessage(':asset,'+$scope.assetId, $scope.conversation.passphrase)
                        .sendTo($scope.conversation)
                        .then(function () {
                            if ($scope.new_conversation) $location.url('/conversation/' + $scope.conversation.id)
                            $scope.assetId = undefined
                        })
                        :   null

                    if (!passphrase_valid)    cmNotify.warn('CONVERSATION.WARN.PASSPHRASE_INVALID')
                    if (assetId_missing)      cmNotify.warn('CONVERSATION.WARN.ASSET_ID_MISSING')
                    if (recipients_missing)   cmNotify.warn('CONVERSATION.WARN.RECIPIENTS_MISSING')
                }


                $scope.sendCaptcha = function () {
                    var passphrase_valid = !!$scope.conversation.passphraseValid(),
                        captchaImageData = $element.find('canvas')[0].toDataURL("image/png")

                    captchaImageData && passphrase_valid
                        ?   $scope.conversation
                        .newMessage(captchaImageData)
                        .sendTo($scope.conversation)
                        : null

                    if (!passphrase_valid)    cmNotify.warn('CONVERSTAION.WARN.PASSPHRASE_INVALID')
                }

                $scope.requestCaptcha = function () {
                    $scope.conversation
                        .newMessage(":requestCaptcha")
                        .sendTo($scope.conversation)
                }

                /**
                 *
                 * @returns {boolean|*|$scope.new_conversation}
                 */
                this.isNew = function(){
                    return $scope.new_conversation;
                }

                $scope.compareDate = function(current, prev){
                    if(typeof current !== 'undefined' && typeof prev !== 'undefined'){
                        if( (new Date(current)).getDate() > (new Date(prev)).getDate() ){
                            return true;
                        }
                    } else if(typeof current !== 'undefined' && typeof prev === 'undefined') {
                        return true;
                    }
                    return false;
                }

                this.addPendingRecipients = function(){
                    $rootScope.pendingRecipients = $rootScope.pendingRecipients || []
                    $rootScope.pendingRecipients.forEach(function(pendingRecipient){
                        $scope.conversation.addRecipient(pendingRecipient)
                    })
                    $rootScope.pendingRecipients = []
                }

                this.init = function (conversation) {

                    $rootScope.pendingConversation = conversation

                    // reload detail of conversation
                    $scope.conversation = conversation.update();

                    self.addPendingRecipients()

                    $scope.my_message_text  = ""
                    $scope.password         = ""
                    $scope.show_contacts    = false
                    //$scope.passphrase_valid = $scope.conversation.passphraseValid()

                    /*
                    * @todo remove??? 16.04.2014
                     if($scope.conversation.passphrase != '' && $scope.passphrase_valid !== false){
                     $scope.passphrase = $scope.conversation.passphrase;
                     $scope.conversation.decrypt();
                     } else {
                     $scope.$watch("passphrase", function (new_passphrase) {
                     $scope.conversation.setPassphrase(new_passphrase)
                     $scope.passphrase_valid = $scope.conversation.passphraseValid()
                     if ($scope.passphrase_valid) $scope.conversation.decrypt()
                     })
                     }
                     */

                    $scope.$watch("conversation.subject", function (new_subject) {
                        $scope.conversation.updateSubject(new_subject||'')
                    })


                    //cron
//                if($scope.new_conversation !== true){
//                    cmCron.add('Conversation-'+conversation.id,{instance: conversation,task:function(conversation){self.update()}});
//                }
                }


                $scope.new_conversation = !conversation_id

                if(conversation_id){
                    cmConversationsModel.getConversation(conversation_id).then(
                        function (conversation) {
                            self.init(conversation)
                            $scope.conversation.decryptPassphrase()
                            $scope.conversation.decrypt()
                        }
                    )
                } else if($rootScope.pendingConversation){
                    self.init($rootScope.pendingConversation)
                } else {
                    cmConversationsModel.createNewConversation().then(
                        function(newConversation){
                            newConversation.addRecipient(cmUserModel.data.identity);
                            self.init(newConversation);
                            $scope.conversation.setPassphrase()
                        }
                    );
                }


            }
        }
    }
])
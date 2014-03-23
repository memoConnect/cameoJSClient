'use strict';

function cmConversation(cmConversationsModel, cmCrypt, cmLogger, cmNotify, $location) {
    return {
        restrict: 'AE',
        templateUrl: 'comps/conversations/conversation.html',
        scope: true,

        controller: function ($scope, $element, $attrs) {
            var conversation_id      = $scope.$eval($attrs.cmConversations) || $scope.$eval($attrs.conversationId),
                conversation_subject = $scope.$eval($attrs.cmSubject),
                conversation_offset  = $attrs.offset,
                conversation_limit   = $attrs.limit

            conversation_id
//            ?   cmConversationsModel.getConversation(conversation_id, conversation_offset, conversation_limit)
            ?   cmConversationsModel.getConversation(conversation_id)
                .then(function (conversation) {
                    conversation.update();
                    $scope.init(conversation)
                })

            :   cmConversationsModel.createConversation(conversation_subject)
                .then(function (conversation) {
                    $scope.init(conversation)
                    $scope.new_conversation = true
                })


            $scope.init = function (conversation) {
                $scope.conversation     = conversation
                $scope.my_message_text  = ""
                $scope.passphrase       = ""
                $scope.show_contacts    = false
                $scope.passphrase_valid = $scope.conversation.passphraseValid()

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

                $scope.$watch("conversation.subject", function (new_subject) {
                    $scope.conversation.updateSubject(new_subject||"")
                })

                $scope.$on('identity-selected', function (event, identity_data) {
                    identity_data
                        ? $scope.conversation
                        .newRecipient(identity_data)
                        : null
                })

                $scope.conversation.update();
            }

            $scope.sendMessage = function () {
                var passphrase_valid    = !!$scope.conversation.passphraseValid(),
                    message_empty       = !$scope.my_message_text,
                    recipients_missing  = $scope.conversation.recipients.length <= 1

                !message_empty && passphrase_valid && !recipients_missing
                    ? $scope.conversation
                    .newMessage($scope.my_message_text, $scope.passphrase)
                    .sendTo($scope.conversation)
                    .then(function () {
                        if ($scope.new_conversation) $location.url('/conversation/' + $scope.conversation.id)
                        $scope.my_message_text = ""
                    })
                    : null

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
                        .newMessage(':asset,'+$scope.assetId, $scope.passphrase)
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
                    ? $scope.conversation
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

            $scope.generatePassphrase = function () {
                var date = new Date()
                $scope.passphrase = _Base64.encode(cmCrypt.hash(Math.random() * date.getTime())).substr(5, 10)
            }
        }
    }
}

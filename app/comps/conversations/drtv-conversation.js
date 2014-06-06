'use strict';

angular.module('cmConversations').directive('cmConversation', [
    'cmConversationsModel',
    'cmUserModel',
    'cmRecipientModel',
    'cmCrypt',
    'cmLogger',
    'cmNotify',
    'cmModal',
    '$location',
    '$rootScope',
    function (cmConversationsModel, cmUserModel, cmRecipientModel, cmCrypt, cmLogger, cmNotify, cmModal, $location, $rootScope) {
        return {
            restrict: 'AE',
            templateUrl: 'comps/conversations/drtv-conversation.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                var self                 = this,
                    conversation_id      = $scope.$eval($attrs.cmConversations) || $scope.$eval($attrs.conversationId),
                    conversation_subject = $scope.$eval($attrs.cmSubject),
                    conversation_offset  = $attrs.offset,
                    conversation_limit   = $attrs.limit,
                    files                = [];

                $scope.isSending = false;
                $scope.conversation = {};

                /**
                 * check if is new
                 * @returns {boolean|*|$scope.new_conversation}
                 */
                this.isNew = function(){
                    return !conversation_id
                };

                /**
                 * start sending process
                 * with preparing files for upload
                 * after preparation send message
                 */
                $scope.send = function(){
                    if($scope.isSending !== true){
                        $scope.isSending = true;

                        /**
                         * Nested functions in comps/files/drtv-files.js
                         * check if files exists
                         * after success resolve step again in here without files
                         */
                        if($scope.hasFiles()) {
                            $scope.prepareFilesForUpload($scope.conversation.getPassphrase()).then(
                                function(){
                                    angular.forEach($scope.files, function(file){
                                        if(file.id != undefined){
                                            files.push(file);
                                        }
                                    });

                                    /**
                                     * Nested Function in drtv-attachments
                                     */
                                    $scope.resetFiles();

                                    sendMessage();
                                });
                        } else {
                            sendMessage();
                        }
                    }
                };

                /**
                 * compare date for date-seperator
                 * @param currentDate
                 * @param prevDate
                 * @returns {boolean}
                 */
                $scope.compareDate = function(current, prev){
                    if(typeof current !== 'undefined' && typeof prev !== 'undefined'){
                        if( (new Date(current)).getDate() > (new Date(prev)).getDate() ){
                            return true;
                        }
                    } else if(typeof current !== 'undefined' && typeof prev === 'undefined') {
                        return true;
                    }
                    return false;
                };

                /**
                 * validator helper
                 * @returns {boolean}
                 */
                function isMessageValid(){
                    if($scope.my_message_text != '' || files.length > 0){
                        return true;
                    }
                    return false;
                }

                /**
                 * send message to api
                 */
                function sendMessage() {

                    /**
                     * validate answer form
                     * @type {boolean}
                     */
                    var message_valid       = isMessageValid(),
                        passphrase_valid    = $scope.conversation.passphraseValid(),
                        recipients_missing  = $scope.conversation.recipients.length < 1 //@todo mocked

                    // is everything valid?
                    if(message_valid && passphrase_valid && !recipients_missing){
                        // create new conversation
                        if($scope.conversation.state.is('new')){
                            $scope.conversation.save();
                            $scope.conversation.on('save:finished', function(){
                               sendMessage();
                            });
                        // add to existing conversation
                        } else {
                            $scope.conversation.messages.create({conversation:$scope.conversation})
                                .addFiles(files)
                                .setText($scope.my_message_text)
                                .setPublicData($scope.conversation.getPassphrase() ? [] : ['text','fileIds'])
                                .encrypt($scope.conversation.getPassphrase())
                                .save()
                                .then(function(){
                                    //@ TODO: solve rekeying another way:
//                                    $scope.conversation.saveEncryptedPassphraseList();

                                    $scope.conversation.numberOfMessages++;
                                    $scope.my_message_text = "";
                                    files = [];
                                    $scope.isSending = false;

                                    // route to detailpage of conversation
                                    if(!conversation_id){
                                        cmConversationsModel.addConversation($scope.conversation, true);
                                        $location.path('/conversation/' + $scope.conversation.id);
                                    }
                                    cmLogger.debug('message:sent');
                                });
                        }
                    } else {
                        // notify handler
                        if (!passphrase_valid)
                            cmNotify.warn('CONVERSATION.WARN.PASSPHRASE_INVALID', {ttl:5000});
                        if (!message_valid)
                            cmNotify.warn('CONVERSATION.WARN.MESSAGE_EMPTY', {ttl:5000});
                        if (recipients_missing)
                            cmNotify.warn('CONVERSATION.WARN.RECIPIENTS_MISSING', {ttl:5000});

                        // enable send button
                        $scope.isSending = false;
                    }
                }

                this.addPendingRecipients = function(){
                    $rootScope.pendingRecipients = $rootScope.pendingRecipients || [];
                    $rootScope.pendingRecipients.forEach(function(pendingRecipient){
                        $scope.conversation.addRecipient(pendingRecipient);
                    });
                    $rootScope.pendingRecipients = []
                };

                $scope.init = function (conversation) {
                    $rootScope.pendingConversation = conversation;

                    // reload detail of conversation
                    $scope.conversation = conversation.update();

                    self.addPendingRecipients();

                    $scope.my_message_text  = '';
                    $scope.password         = '';
                    $scope.show_contacts    = false;
                };

                // existing conversation
                if(conversation_id){
                    cmConversationsModel
                        .getConversation(conversation_id)
                            .then(function (conversation){
                                $scope.init(conversation);
//                                $scope.conversation.decrypt()
                            });
                // pending conversation
                } else if($rootScope.pendingConversation){
                    $rootScope.pendingConversation.id
                    ?   $location.path('conversation/'+$rootScope.pendingConversation.id)
                    :   $scope.init($rootScope.pendingConversation);
                // new conversation
                } else {
                    cmConversationsModel.createNewConversation().then(
                        function(newConversation){
                            newConversation.addRecipient(cmUserModel.data.identity);
                            $scope.init(newConversation);
                            //$scope.conversation.setPassphrase();
                        }
                    );
                }

                /**
                 * Delete explicit pending Objects
                 */
                cmUserModel.on('cmUserModel:doLogout',function(){
                    $rootScope.pendingRecipients = [];
                    $rootScope.pendingConversation = null;
                });
            }
        }
    }
])
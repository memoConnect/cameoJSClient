'use strict';

angular.module('cmConversations').directive('cmConversation', [
    'cmConversationsModel',
    'cmMessageFactory',
    'cmUserModel',
    'cmRecipientModel',
    'cmCrypt',
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
                    conversation_limit   = $attrs.limit,
                    files                = [];

                $scope.isSending = false;
                $scope.conversation = {};


                /**
                 * check if is new
                 * @returns {boolean|*|$scope.new_conversation}
                 */
                this.isNew = function(){
                    return $scope.new_conversation;
                }

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
                            $scope.prepareFilesForUpload($scope.conversation.passphrase)
                                .then(function(){
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
                            return false;
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
                }

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
                    var passphrase_valid    = !!$scope.conversation.passphraseValid(),
                        message_empty       = !isMessageValid() ,
                        recipients_missing  = $scope.conversation.recipients.length < 0 //@todo mocked
                    // is everything valid?
                    if(!message_empty && passphrase_valid && !recipients_missing){

                        // create new conversation
                        if(!$scope.conversation.id){
                            $scope.conversation.save().then(
                                function(){
                                    sendMessage();
                                }
                            );
                        // add to existing conversation
                        } else {
                            cmMessageFactory.create()
                                .addFiles(files)
                                .setText($scope.my_message_text)
                                .setPublicData($scope.conversation.passphrase ? [] : ['text','fileIds'])
                                .encrypt($scope.conversation.passphrase)
                                .addTo($scope.conversation)
                                .sendTo($scope.conversation.id)
                                .then(function(){
                                    //@ TODO: solve rekeying another way:
                                    $scope.conversation
                                    .encryptPassphrase()
                                    .saveEncryptedPassphraseList()

                                    $scope.conversation.numberOfMessages++;
                                    $scope.my_message_text = "";
                                    files = [];
                                    $scope.isSending = false;

                                    // route to detailpage of conversation
                                    if($scope.new_conversation !== false){
                                        cmConversationsModel.addConversation($scope.conversation, true);
                                        $location.path('/conversation/' + $scope.conversation.id);
                                    }
                                    cmLogger.debug('message:sent')
                                });
                        }
                    } else {
                        // notify handler
                        if (!passphrase_valid)
                            cmNotify.warn('CONVERSATION.WARN.PASSPHRASE_INVALID', {ttl:5000});
                        if (message_empty)
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

//                    console.log($scope.conversation.getEncryptionType());
//                    console.log('keyTransmission',$scope.conversation.keyTransmission);

                    /**
                     * open Controls if conversation not new and symmetric encrypted and without password
                     */
//                    if($scope.isNew() != true && $scope.password == '' && $scope.conversation.getEncryptionType() == 'symmetric'){
//                        $timeout(function(){
//                            $scope.toggleControls();
//                        });
//                    }
                };

                $scope.new_conversation = !conversation_id;

                if(conversation_id){
                    cmConversationsModel.getConversation(conversation_id).then(
                        function (conversation) {
                            $scope.init(conversation);
//                            $scope.conversation.decryptPassphrase();
                            $scope.conversation.decrypt();
                        }
                    )
                } else if($rootScope.pendingConversation){
                    if($rootScope.pendingConversation.id){
                        $location.path('conversation/'+$rootScope.pendingConversation.id)
                    }else{
                        $scope.init($rootScope.pendingConversation)
                    }
                } else {
                    cmConversationsModel.createNewConversation().then(
                        function(newConversation){
                            $scope.init(newConversation);
                            $scope.conversation.setPassphrase();
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
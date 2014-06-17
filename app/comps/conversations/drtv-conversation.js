'use strict';

angular.module('cmConversations').directive('cmConversation', [
    'cmConversationFactory',
    'cmUserModel',
    'cmCrypt',
    'cmLogger',
    'cmNotify',
    'cmModal',
    '$location',
    '$rootScope',
    function (cmConversationFactory, cmUserModel, cmCrypt, cmLogger, cmNotify, cmModal, $location, $rootScope) {
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
                 * @returns {boolean}
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
//                        console.log('send',$scope.hasFiles(),$scope.conversation.getPassphrase())
                        if($scope.hasFiles()) {
                            $scope.prepareFilesForUpload($scope.conversation.getPassphrase()).then(
                                function(){
                                    angular.forEach($scope.files, function(file){
                                        if(file.id != undefined){
                                            files.push(file);
                                        }
                                    });

//                                    console.log('prepareFilesForUpload:resolved',$scope.files,files)

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
//                    console.log('isMessageValid', $scope.my_message_text, files.length)
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
                    var message_invalid         = !isMessageValid(),
                        passphrase_invalid      = !$scope.conversation.passphraseValid(),
                        recipients_missing      = !$scope.conversation.recipients.length > 0; //@todo mocked


//                    console.log('sendMessage','message_invalid '+message_invalid, 'passphrase_invalid '+passphrase_invalid, 'recipients_missing '+recipients_missing)

                    //If anything is invalid, abort and notify the user:
                    if(message_invalid || passphrase_invalid || recipients_missing){

                        if (message_invalid)
                            cmNotify.warn('CONVERSATION.WARN.MESSAGE_EMPTY', {ttl:5000});

                        if (passphrase_invalid)
                            cmNotify.warn('CONVERSATION.WARN.PASSPHRASE_INVALID', {ttl:5000});

                        if (recipients_missing)
                            cmNotify.warn('CONVERSATION.WARN.RECIPIENTS_MISSING', {ttl:5000});

                        // enable send button
                        $scope.isSending = false;

                        return false
                    }

                    //If we got this far everything should be valid.
                    //Is the conversation newly created and has not been saved to the backend yet?                  
                    
                    if($scope.conversation.state.is('new')){                        
                        //The conversations has not been saved to the Backend, do it now:
                        $scope.conversation.save();
                        //When that is done try again to send the message:
                        $scope.conversation.one('save:finished', function(){
                           sendMessage();
                        });
                        return false
                    }

//                    console.log($scope.conversation.getPassphrase())
//                    console.log($scope.conversation.getPassphrase() === null )

                    //If we got this far the conversation has been saved to the backend.
                    //Create a new message:
                    $scope.conversation.messages.create({conversation:$scope.conversation})
                    .addFiles(files)
                    .setText($scope.my_message_text)
                    .setPublicData($scope.conversation.getPassphrase() === null ? ['text','fileIds'] : [])
                    .encrypt()
                    .save()
                    .then(function(){
                        //@ TODO: solve rekeying another way:
//                      $scope.conversation.saveEncryptedPassphraseList();

                        $scope.conversation.numberOfMessages++;
                        $scope.my_message_text = "";
                        files = [];
                        $scope.isSending = false;

                        // route to detailpage of conversation
                        if(!conversation_id){
                            cmConversationFactory.register($scope.conversation);
                            $location.path('/conversation/' + $scope.conversation.id);
                        }
                        cmLogger.debug('message:sent');
                    });
                    
                }

                this.addPendingRecipients = function(){
                    $rootScope.pendingRecipients = $rootScope.pendingRecipients || [];
                    $rootScope.pendingRecipients.forEach(function(pendingRecipient){
                        $scope.conversation.addRecipient(pendingRecipient);
                    });
                    $rootScope.pendingRecipients = []
                };

                $scope.init = function (conversation) {
                    if(!conversation){
                        cmLogger.debug("Conversation not found.")
                        return false
                    }

                    $rootScope.pendingConversation = conversation;

                    // reload detail of conversation
                    $scope.conversation = conversation.update();

                    self.addPendingRecipients();

                    $scope.my_message_text  = '';
                    $scope.show_contacts    = false;
                };

                // existing conversation
                if(conversation_id){                                        
                    $scope.init( cmConversationFactory.create(conversation_id) )

                // pending conversation:
                } else if($rootScope.pendingConversation){
                        $rootScope.pendingConversation.id
                    ?   $location.path('conversation/'+$rootScope.pendingConversation.id)
                    :   $scope.init($rootScope.pendingConversation);

                // new conversation:
                } else {
                    // TODO: create at send message not on init!!!
                    $scope.init(
                        cmConversationFactory.create()
                        .addRecipient(cmUserModel.data.identity) // muss nicht, macht die api auch von alleine (?)
                    )
                }

                /**
                 * Delete pending Objects
                 */
                cmUserModel.on('cmUserModel:doLogout',function(){
                    $rootScope.pendingRecipients = [];
                    $rootScope.pendingConversation = null;
                });
            }
        }
    }
])
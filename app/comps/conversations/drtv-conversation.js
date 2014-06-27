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
    '$document',
    'cmEnv',
    function (cmConversationFactory, cmUserModel, cmCrypt, cmLogger, cmNotify, cmModal, $location, $rootScope, $document, cmEnv) {
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
                    files                = [],
                    showedAsymmetricKeyError = false;

                $scope.isSending = false;
                $scope.isSendingAbort = false;
                $scope.conversation = {};

                /**
                 * check if is new
                 * @returns {boolean}
                 */
                this.isNew = function(){
                    return !conversation_id
                };

                // first focus on message
                if(!this.isNew() && cmEnv.isNotMobile){
                    $document[0].querySelector('cm-conversation .answer textarea').focus();
                }

                /**
                 * start sending process
                 * with preparing files for upload
                 * after preparation send message
                 */
                $scope.send = function(){
                    if($scope.isSending !== true){
                        $scope.isSending = true;
                        $scope.isSendingAbort = false;

                        if($scope.conversation.checkConsistency() !== true){
                            $scope.conversation.trigger('save:aborted');
                            $scope.isSendingAbort = true;
                            return false;
                        }

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

                $rootScope.$on('sendOnReturn',function(){
                    $scope.send();
                });

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

                function showAsymmetricKeyError(){
                    cmLogger.debug('cmConversationDRTV.showAsymmetricKeyError')

                    if(!$scope.conversation.state.is('new')
                        && $scope.conversation.keyTransmission == 'asymmetric'
                        && cmUserModel.hasLocalKeys() == false
                        && showedAsymmetricKeyError == false){
                        showedAsymmetricKeyError = true;
                        cmNotify.warn('NOTIFICATIONS.TYPES.CONVERSATION.ASYMMETRIC_DECRYPT_ERROR');
                    }
                }

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
                            cmConversationFactory.register($scope.conversation);
                            sendMessage();
                        });
                        return false
                    }

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

                        $scope.conversation.numberOfMessages++;
                        $scope.my_message_text = "";
                        files = [];
                        $scope.isSending = false;

                        // route to detailpage of conversation
                        if(!conversation_id){
                            cmConversationFactory.register($scope.conversation);
                            $location.path('/conversation/' + $scope.conversation.id);
                        }
//                        cmLogger.debug('message:sent');
                    });
                }

                this.addPendingRecipients = function(){
                    if($scope.conversation.state.is('new')){
                        $rootScope.pendingRecipients = $rootScope.pendingRecipients || [];
                        $rootScope.pendingRecipients.forEach(function(pendingRecipient){
                            $scope.conversation.addRecipient(pendingRecipient);
                        });
                        $rootScope.pendingRecipients = []
                    }
                };

                $scope.init = function (conversation) {
                    cmLogger.debug('cmConversationDRTV.init')
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


                    $scope.conversation.on('save:aborted', function(){
                       $scope.isSending = false;
                    });

                    showAsymmetricKeyError();
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
                        cmConversationFactory.new(undefined, true)
                        .addRecipient(cmUserModel.data.identity)
                    )
                }

                $scope.conversation.on('update:finished',function(){
                    showAsymmetricKeyError();
                });

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
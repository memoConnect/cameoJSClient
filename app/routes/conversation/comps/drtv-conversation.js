'use strict';

angular.module('cmRouteConversation').directive('cmConversation', [

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
            templateUrl: 'routes/conversation/comps/drtv-conversation.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                var self                 = this,
                    conversation_subject = $scope.$eval($attrs.cmSubject),
                    conversation_offset  = $attrs.offset,
                    conversation_limit   = $attrs.limit,
                    files                = [],
                    showedAsymmetricKeyError = false;

                $scope.isSending        = false;
                $scope.isSendingAbort   = false;
                
                /**
                 * check if is new
                 * @returns {boolean}
                 */
                this.isNew = function(){
                    return $scope.conversation.state.is('new')
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

                        if(!$scope.conversation.state.is('new')
                            && $scope.conversation.getKeyTransmission() == 'asymmetric'
                            && cmUserModel.hasLocalKeys() == false){

                            $scope.isSending = false;

                            return false;
                        }

                        /**
                         * Nested functions in comps/files/drtv-files.js
                         * check if files exists
                         * after success resolve step again in here without files
                         */
//                        console.log('send',$scope.hasFiles(),$scope.conversation.getPassphrase())
                        if($scope.hasFiles()) {
                            $scope.prepareFilesForUpload($scope.conversation.getPassphrase(), $scope.conversation.id).then(
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
                                },function(r){
                                    $scope.isSending = false;
                                    $scope.isSendingAbort = true;
                                    cmNotify.warn('NOTIFICATIONS.TYPES.CONVERSATION.FILESIZE_REACHED',{
                                        ttl:0,
                                        i18n: {
                                            maxFileSize: r.data.error.maxFileSize,
                                            fileSize: r.config.headers['X-File-Size'],
                                            fileName: r.config.headers['X-File-Name']
                                        }
                                    });
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
//                    cmLogger.debug('cmConversationDRTV.showAsymmetricKeyError')
                    if(!$scope.conversation.state.is('new')
                        && $scope.conversation.getKeyTransmission() == 'asymmetric'
                        && cmUserModel.hasLocalKeys() == false
                        && showedAsymmetricKeyError == false){
                        showedAsymmetricKeyError = true;
                        cmNotify.warn('NOTIFICATIONS.TYPES.CONVERSATION.ASYMMETRIC_DECRYPT_ERROR',{ttl:0});
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

                    $scope.conversation.messages
                    .create({conversation:$scope.conversation})
                    .addFiles(files)
                    .setText($scope.my_message_text)
                    .setPublicData(
                        $scope.conversation.getPassphrase() === null
                            ? ['text','fileIds']
                            : []
                    )
                    .encrypt()
                    .save()
                    .then(function(){
                        //@ TODO: solve rekeying another way:

                        $scope.conversation.numberOfMessages++;
                        $scope.my_message_text = "";
                        files = [];
                        $scope.isSending = false;

                        // route to detailpage of conversation
                        if(!$scope.calledWithId) //calledWithId is set by route Ctrl
                            $location.path('/conversation/' + $scope.conversation.id);
//                        cmLogger.debug('message:sent');
                    }, function(){
                        $scope.isSending = false;
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
//                    cmLogger.debug('cmConversationDRTV.init')
                    if(!conversation){
                        cmLogger.debug("Conversation not found.")
                        return false
                    }

                    $rootScope.pendingConversation = conversation;

                    // reload detail of conversation
                    $scope.conversation = conversation.load();

                    self.addPendingRecipients();

                    $scope.my_message_text  = '';
                    $scope.show_contacts    = false;


                    $scope.conversation.on('save:aborted', function(){
                       $scope.isSending = false;
                    });

                    showAsymmetricKeyError();
                };

                $scope.init($scope.$eval($attrs.cmData))

                if('on' in $scope.conversation) {
                    $scope.conversation.on('update:finished', function () {
                        showAsymmetricKeyError();
                    });
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
]);
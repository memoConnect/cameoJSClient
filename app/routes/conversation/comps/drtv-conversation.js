'use strict';

angular.module('cmRouteConversation')
.directive('cmConversation', [
    'cmConversationFactory', 'cmUserModel', 'cmCrypt', 'cmLogger', 'cmNotify',
    'cmModal', 'cmEnv', 'cmUtil', 'cmTransferScopeData',
    '$location', '$rootScope', '$document', '$routeParams',
    function (cmConversationFactory, cmUserModel, cmCrypt, cmLogger, cmNotify,
              cmModal, cmEnv, cmUtil, cmTransferScopeData,
              $location, $rootScope, $document, $routeParams) {
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

                // show name of incoming identity
                $scope.showName = function(identity){
                    if(identity && !('isAppOwner' in identity))
                        $scope.recipientName = identity.getDisplayName();
                };

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
                                    cmNotify.warn('CONVERSATION.WARN.FILESIZE_REACHED',{
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

                $scope.showAsymmetricKeyError = function(){
//                    cmLogger.debug('cmConversationDRTV.showAsymmetricKeyError')
                    if(!$scope.conversation.state.is('new')
                        && $scope.conversation.getKeyTransmission() == 'asymmetric'
                        && cmUserModel.hasLocalKeys() == false
                        && showedAsymmetricKeyError == false){
                        showedAsymmetricKeyError = true;
                        cmNotify.warn('CONVERSATION.WARN.ASYMMETRIC_DECRYPT_ERROR',{ttl:0});
                    }
                }

                $scope.showGoToSettingsModal = function(){
                    if(!$scope.conversation.state.is('new')
                        && ($scope.conversation.getKeyTransmission() == 'symmetric' || $scope.conversation.getKeyTransmission() == 'mixed')
                        && !$scope.conversation.password
                        && !$scope.conversation.isUserInPassphraseList()
                        ){
                        // switcher for purl and conversation
                        var settingsLinker = {type:'',typeId:''};
                        if('purlId' in $routeParams){
                            settingsLinker.type = 'purl';
                            settingsLinker.typeId = $routeParams.purlId;
                        } else {
                            settingsLinker.type = 'conversation';
                            settingsLinker.typeId = $routeParams.conversationId;
                        }
                        cmNotify.warn('CONVERSATION.WARN.PASSWORD_NEEDED',{ttl:0,i18n:settingsLinker});
                    }
                }

                /**
                 * validator helper
                 * @returns {boolean}
                 */
                function isMessageValid(){
//                    console.log('isMessageValid', $scope.newMessageText, files.length)
                    if($scope.newMessageText != '' || files.length > 0){
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
                        passphrase_invalid      = !$scope.conversation.passphraseValid()

                    //If anything is invalid, abort and notify the user:
                    if(message_invalid || passphrase_invalid){

                        if (message_invalid)
                            cmNotify.warn('CONVERSATION.WARN.MESSAGE_EMPTY', {ttl:5000});

                        if (passphrase_invalid)
                            cmNotify.warn('CONVERSATION.WARN.PASSPHRASE_INVALID', {ttl:5000});


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
                    .setText($scope.newMessageText)
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
                        $scope.newMessageText = '';
                        files = [];
                        $scope.isSending = false;

                        // route to detailpage of conversation $scope.calledWithId = false
                        // in purl case stay on purl page $scope.calledWithId = true
                        if($scope.calledWithId == false){ //calledWithId is set by route Ctrl
                            $location.path('/conversation/' + $scope.conversation.id);
                        }
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

                $scope.conversation = $scope.$eval($attrs.cmData)

                if(!$scope.conversation) return false

                $rootScope.pendingConversation = $scope.conversation;

                // reload detail of conversation
                $scope.conversation.load();

                self.addPendingRecipients();

                $scope.show_contacts  = false;

                $scope.showAsymmetricKeyError();

                $scope.showGoToSettingsModal();
                
                // first focus on message
                if($scope.conversation.state.is('new') && cmEnv.isNotMobile){
                    $document[0].querySelector('cm-conversation .answer textarea').focus();
                }

                /** Event callbacks **/
                function callback_update_finished(){
                    $scope.showAsymmetricKeyError();
                }

                function callback_password_missing(){
                    // switcher for purl and conversation, @Todo: vereinheitlichen
                    var settingsLinker = {type:'',typeId:''};
                    if('purlId' in $routeParams){
                        settingsLinker.type = 'purl';
                        settingsLinker.typeId = $routeParams.purlId;
                    } else {
                        settingsLinker.type = 'conversation';
                        settingsLinker.typeId = $routeParams.conversationId;
                    }
                    cmNotify.warn('CONVERSATION.WARN.NO_PASSWORD', {ttl:0, i18n: settingsLinker});
                }

                function callback_recipients_missing(){
                    // switcher for purl and conversation, @Todo: vereinheitlichen
                    var settingsLinker = {type:'',typeId:''};
                    if('purlId' in $routeParams){
                        settingsLinker.type = 'purl';
                        settingsLinker.typeId = $routeParams.purlId;
                    } else {
                        settingsLinker.type = 'conversation';
                        settingsLinker.typeId = $routeParams.conversationId;
                    }
                    cmNotify.warn('CONVERSATION.WARN.RECIPIENTS_MISSING',
                        {
                            ttl:0, 
                            i18n: settingsLinker,
                            template:   '<small>{{"CONVERSATION.WARN.RECIPIENTS_MISSING_OKAY"|cmTranslate}}</small>'+
                                        '<i ng-click="conversation.solitary = !conversation.solitary" ng-class="'+
                                            "{'cm-checkbox':!conversation.solitary, 'cm-checkbox-right':conversation.solitary}"+
                                        '" class="fa cm-lg-icon cm-ci-color ml15" data-qa = "checkbox-dont-ask-me-again"></i>',
                            templateScope: $scope
                        }
                    );
                }

                function callback_save_aborted(){
                    $scope.isSending = false;
                }

                $scope.conversation
                .on('update:finished',       callback_update_finished)
                .on('password:missing',      callback_password_missing)
                .on('recipients:missing',    callback_recipients_missing)
                .on('save:aborted',          callback_save_aborted)

                var stop_listening_to_logout =  $rootScope.$on('logout', function(){
                            $rootScope.pendingRecipients = [];
                            $rootScope.pendingConversation = null;
                    })

                $scope.$on('$destroy', function(){
                    $scope.conversation.off('update:finished',       callback_update_finished)
                    $scope.conversation.off('password:missing',      callback_password_missing)
                    $scope.conversation.off('recipients:missing',    callback_recipients_missing)
                    $scope.conversation.off('save:aborted',          callback_save_aborted)

                    stop_listening_to_logout()
                });

                // transfer data between routeChanges
                new cmTransferScopeData($scope,{
                    id:'conversation-'+($scope.conversation.id||'new'),
                    scopeVar:'newMessageText'
                });
            }
        }
    }
]);
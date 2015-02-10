'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */

angular.module('cmConversations')
.directive('cmConversation', [

    'cmConversationFactory', 'cmUserModel', 'cmCrypt', 'cmLogger', 'cmNotify',
    'cmModal', 'cmEnv', 'cmSettings', 'cmKeyStorageService', 'cmTransferScopeData',
    'cmErrorCodes', 'cmAnswerFiles',
    '$location', '$rootScope', '$document', '$routeParams', '$q',

    function (cmConversationFactory, cmUserModel, cmCrypt, cmLogger, cmNotify,
              cmModal, cmEnv, cmSettings, cmKeyStorageService, cmTransferScopeData,
              cmErrorCodes, cmAnswerFiles,
              $location, $rootScope, $document, $routeParams, $q) {
        return {
            restrict: 'AE',
            templateUrl: 'comps/conversations/drtv-conversation.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                
                var self                 = this,
                    conversation_subject = $scope.$eval($attrs.cmSubject),
                    conversation_offset  = $attrs.offset,
                    conversation_limit   = $attrs.limit,
                    filesForMessage      = [],
                    showedAsymmetricKeyError = false,
                    storageService = new cmKeyStorageService('conversation-recipient-view');

                $scope.goto = $rootScope.goto;
                $scope.openFastRegister = $rootScope.openFastRegister;
                $scope.showLogin = $rootScope.showLogin;

                $scope.isSending        = false;
                $scope.isSendingAbort   = false;

                $scope.recipientName = '';
                function showRecipientName(identity){
                    $scope.recipientName = identity.getDisplayName();
                }

                // show name of incoming identity
                $scope.showName = function(identity){
                    if(identity && !('isAppOwner' in identity) && $scope.recipientName != identity.getDisplayName()){
                        showRecipientName(identity);

                        identity.on('update:finished', function(){
                            showRecipientName(identity);
                        });
                    }
                };

                /**
                 * handle Recipient View
                 */
                $scope.showGrid = cmSettings.get('defaultShowRecipientAvatar'); // degault grid off, wenn recipient.length > 2
                if(!$scope.conversation.state.is('new')){
                    $scope.showGrid = storageService.get($scope.conversation.id)
                }

                $scope.toggleRecipientView = function(){
                    if($scope.showGrid){
                        $scope.showGrid = false;
                        if(!$scope.conversation.state.is('new')){
                            storageService.set($scope.conversation.id, false)
                        }
                    } else {
                        $scope.showGrid = true;
                        if(!$scope.conversation.state.is('new')){
                            storageService.set($scope.conversation.id, true)
                        }
                    }
                };

                $scope.loadPreviousMessages = function(){
                    $scope.conversation.update();
                };

                function checkConversationSetup(){

                    $scope.isSending        = true;
                    $scope.isSendingAbort   = false;

                    if(!$scope.conversation.checkConsistency()){
                        $scope.conversation.trigger('save:aborted');
                        $scope.isSendingAbort = true;
                        return $q.reject('conversation unreliable.')
                    }

                    // Is the conversation newly created and has not been saved to the backend yet?
                    return  $scope.conversation.state.is('new')
                                // the conversations has not been saved to the Backend, do it now:
                            ?   $scope.conversation.save()
                                // when that is done try again to send the message:
                                .then(function(conversation_data){
                                    $scope.conversation.importData(conversation_data)
                                    cmConversationFactory.register($scope.conversation);
                                    //$rootScope.$broadcast('new-conversation:ready')
                                    return $q.when()
                                })
                            :   $q.when()
                }

                function prepareFiles(passphrase){
                    /**
                     * check if files exists
                     * after success sendMessage
                     */
                    
                    var deferred = $q.defer();

                    cmAnswerFiles.validateChoosenFiles({
                        passphrase: passphrase,
                        conversationId: $scope.conversation.id
                    }).then(
                        function(files){
                            if (files.length > 0)
                                filesForMessage = files;
                            deferred.resolve()
                        },
                        function(error){
                            $scope.isSending = false;
                            $scope.isSendingAbort = true;

                            cmNotify.warn(error.codes[0], {
                                ttl: 0,
                                i18n: cmErrorCodes.toI18n(error.codes[0], {
                                    error: error.data,
                                    headers: error.headers
                                })
                            });

                            deferred.reject(data.errorCodes);
                        }
                    );

                    return deferred.promise;
                }

                /**
                 * start sending process
                 * with preparing files for upload
                 * after preparation send message
                 */
                $scope.send = function(){

                    if((!$scope.newMessageText || $scope.newMessageText.length == 0)
                    && cmAnswerFiles.files.length  == 0
                    ){
                        cmNotify.warn('CONVERSATION.WARN.MESSAGE_EMPTY', {ttl:5000});
                        return $q.reject('message invalid.')
                    }      

                    if($scope.isSending)
                        return $q.reject('message upload already in progress.');


                    var new_message = $scope.conversation.messages
                                        .create({
                                            conversation:$scope.conversation,
                                            id:'#new_message',
                                            fromIdentity:cmUserModel.data.identity
                                        })
                                        .setText($scope.newMessageText);

                    new_message.state.set('sending');

                    /**
                     * important to set file view to dummy
                     */
                    if(cmAnswerFiles.files.length > 0){
                        new_message.state.set('waitForFiles');
                    }

                    return checkConversationSetup()
                            .then(function(){
                                return  $scope.conversation.getPassphrase()
                                        .catch(function(){
                                                return  $scope.conversation.isEncrypted()
                                                        ?   $q.reject('access denied')
                                                        :   $q.when(null);
                                        //Todo: null for 'not encrypted' old convention
                                        })
                                        .then(function(passphrase){
                                            return  $q.when()
                                                    .then(function(){
                                                        return prepareFiles(passphrase)
                                                    })
                                                    .then(function(){
                                                        return  $scope.conversation.isEncrypted()

                                                                ?   new_message
                                                                    .setText($scope.newMessageText)
                                                                    .addFiles(filesForMessage)
                                                                    .getSignatures()
                                                                    .then(function(){
                                                                        return new_message.encrypt(passphrase)
                                                                    })
                                                                    .then(function(){
                                                                        return new_message.save()
                                                                    })

                                                                :   new_message
                                                                    .setText($scope.newMessageText)
                                                                    .addFiles(filesForMessage)
                                                                    .setPublicData(['text','fileIds'])
                                                                    .revealSignatures()
                                                                    .getSignatures()
                                                                    .then(function(){
                                                                        return new_message.save()
                                                                    })
                                                    })

                                        })
                            })
                            .then(
                                function(){
                                    // tidy up:
                                    clearTransferScopeData();
                                    $scope.newMessageText = '';
                                    filesForMessage = [];
                                    cmAnswerFiles.reset();
                                    $rootScope.$broadcast('cmAnswer:reset');
                                },
                                function(){
                                    $scope.conversation.messages.deregister(new_message)
                                }
                            )
                            .finally(function(){
                                new_message.state.unset('sending');
                                new_message.state.unset('waitForFiles');
                                $scope.isSending = false;
                            })                                    

                  
                };

                $scope.showTrustError = function(){
                    //cmLogger.debug('cmConversationDRTV.showTrustError');

                    if(!$scope.conversation.state.is('new')
                        && $scope.conversation.getKeyTransmission() == 'asymmetric'
                        && $scope.conversation.userHasPrivateKey() == true
                        && !$scope.conversation.userHasAccess()){

                        cmModal.open('handshake-info');

                        return true;
                    }

                    return false;
                };

                $scope.showAsymmetricKeyError = function(){
//                    cmLogger.debug('cmConversationDRTV.showAsymmetricKeyError')

                    if(!$scope.conversation.state.is('new')
                        && $scope.conversation.getKeyTransmission() == 'asymmetric'
                        && $scope.conversation.userHasPrivateKey() == false
                    ){
                        cmNotify.warn('CONVERSATION.WARN.ASYMMETRIC_DECRYPT_ERROR',{ttl:0});
                        return true;
                    }
                    return false;
                };

                $scope.showGoToSettingsModal = function(){
                    if(
                            !$scope.conversation.state.is('new')
                        &&  $scope.conversation.passwordRequired()
                        &&  !$scope.conversation.password
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
                        return true
                    }

                    return false
                };

                this.addPendingRecipients = function(){
                    if($scope.conversation.state.is('new')){
                        $rootScope.pendingRecipients = $rootScope.pendingRecipients || [];
                        $rootScope.pendingRecipients.forEach(function(pendingRecipient){
                            $scope.conversation.addRecipient(pendingRecipient);
                        });
                        $rootScope.pendingRecipients = []
                    }
                };

                function init(conversation){
                    $scope.conversation = conversation;
                    $rootScope.pendingConversation = $scope.conversation;

                    // reload details of conversation
                    $scope.conversation.update(undefined, true);

                    self.addPendingRecipients();

                    $scope.show_contacts  = false;

                    /** Event callbacks **/
                    function callback_update_finished(){
                        $scope.showTrustError();
                        $scope.showAsymmetricKeyError();
                        $scope.showGoToSettingsModal();
                    }

                    function callback_password_missing(){
                        // switcher for purl and conversation
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
                        cmModal.confirm({
                            title:  'CONVERSATION.WARN.RECIPIENTS_MISSING',
                            text:   'CONVERSATION.CONFIRM.RECIPIENTS_MISSING'
                        })
                        .then(function(){
                            $scope.conversation.solitary = true;
                            $scope.send();
                        })
                    }

                    function callback_save_aborted(){
                        $scope.isSending = false;
                    }

                    $scope.conversation
                    .one('update:finished',      callback_update_finished)
                    .on('password:missing',      callback_password_missing)
                    .on('recipients:missing',    callback_recipients_missing)
                    .on('save:aborted',          callback_save_aborted)

                    var stop_listening_to_logout =  $rootScope.$on('logout', function(){
                            $rootScope.pendingRecipients = [];
                            $rootScope.pendingConversation = null;
                        });

                    var stop_listening_to_idenity_switch =  $rootScope.$on('identity:switched', function(){
                            $rootScope.pendingRecipients = [];
                            $rootScope.pendingConversation = null;
                        });

                    var stop_listening_to_send_on_return = $rootScope.$on('sendOnReturn',$scope.send);

                    $scope.$on('$destroy', function(){
                        $scope.conversation.off('update:finished',       callback_update_finished);
                        $scope.conversation.off('password:missing',      callback_password_missing);
                        $scope.conversation.off('recipients:missing',    callback_recipients_missing);
                        $scope.conversation.off('save:aborted',          callback_save_aborted);

                        stop_listening_to_logout();
                        stop_listening_to_idenity_switch();
                        stop_listening_to_send_on_return();
                    });
                }

                // transfer data between routeChanges
                var clearTransferScopeData = cmTransferScopeData.create($scope,{
                    id:'conversation-'+($scope.conversation.id||'new'),
                    scopeVar:'newMessageText',
                    onSet: function(){
                        this.noneScopeData = cmAnswerFiles.getFilesForTransfer();
                    },
                    onGet: function(formData, noneScopeData){
                        if(noneScopeData != null)
                            cmAnswerFiles.setFiles(noneScopeData);
                    }
                });

                init($scope.conversation);
            }
        }
    }
]);
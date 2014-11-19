'use strict';

angular.module('cmContacts').service('cmModalContactImport', [
    'cmModal', 'cmIdentityFactory', 'cmUserModel', 'cmConversationFactory',
    '$filter',
    function(cmModal, cmIdentityFactory, cmUserModel, cmConversationFactory,
             $filter){
        return function cmContactImportModal(data){

            var messageData = {
                from: '',
                to: ''
            };

            if('identity' in data) {
                var identity = cmIdentityFactory.create(data.identity, true);
                messageData.from = cmUserModel.data.identity.getDisplayName();
                messageData.to = identity.getDisplayName();
            }

            return cmModal.confirm({
                title: 'CONTACT.IMPORT.NOTIFICATION.HEADER',
                text:  'CONTACT.IMPORT.NOTIFICATION.TEXT',
                html:  '<textarea class="confirm-textarea" ng-model="data.messageTemplate"> </textarea>',
                data:  {
                    messageTemplate: $filter('cmTranslate')('CONTACT.IMPORT.NOTIFICATION.MESSAGE_TEMPLATE', messageData)
                }
            }).then(function(modal_scope){
                var conversation = cmConversationFactory
                    .create()
                    .addRecipient(identity)
                    .disableEncryption();

                return conversation
                    .save()
                    .then(function(){
                        return conversation
                            .messages
                            .create({
                                conversation:conversation,
                                text:modal_scope.data.message
                            })
                            .setPublicData(['text'])
                            .save()
                    });
            })
        }
    }
]);
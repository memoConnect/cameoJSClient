'use strict';

angular.module('cmConversations').factory('cmConversationContextModel', [
    'cmStateManagement', 'cmObject', 'cmLogger',
    'cmUserModel', 'cmConversationFactory', 'cmConversationModel',
    '$rootScope', '$q',
    function(cmStateManagement, cmObject, cmLogger,
             cmUserModel, cmConversationFactory, cmConversationModel,
             $rootScope, $q) {

        function cmConversationContextModel(data){
            var self = this;

            cmObject.addEventHandlingTo(this);

            this.state = new cmStateManagement();

            this.id = undefined;
            this.model = undefined;

            function init(model){
                //cmLogger.debug('cmConversationContextModel init');

                // check instance of model, if wrong trigger deregister
                self.importData(model);
            }

            this.importData = function(model){
                //cmLogger.debug('cmConversationContextModel.importData');

                this.model  = model || this.model;
                this.id = this.model.id;
            };

            this.delete = function(){
                //cmLogger.debug('cmConversationContextModel.processDelete');

                return (function(){
                        if(self.model.recipients.length > 1){
                            var message = self.model.messages.create({
                                conversation: self.model,
                                id: '#new_message',
                                fromIdentity: cmUserModel.data.identity,
                                text: '$${SYSTEM.CONVERSATION.DELETE}'
                            });

                            return self.model.sendMessage(message, null, true);
                        } else {
                            return $q.when();
                        }
                    }())
                    .then(function(){
                        return cmConversationFactory.deleteConversation(self.model);
                    })
            };

            init(data);
        }

        return cmConversationContextModel;
    }
]);
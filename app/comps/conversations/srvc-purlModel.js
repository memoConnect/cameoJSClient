'use strict';

angular.module('cmConversations').service('cmPurlModel',[
    'cmConversationsAdapter',
    'cmConversationsModel',
    'cmConversationFactory',
    'cmUserModel',
    'cmAuth',
    '$q',
    '$rootScope',
    function(cmConversationsAdapter, cmConversationsModel, cmConversationFactory, cmUserModel, cmAuth, $q, $rootScope) {
        var self = this;

        this.purls = [];

        $rootScope.$on('logout', function(){
            self.purls = [];
        });

        function handleConversation(conversation_data){
            var conversation = cmConversationFactory.create(conversation_data);
            cmConversationsModel.addConversation(conversation);

            return conversation;
        }

        /**
         * @TODO add Function to cmUserModel to handle Guests and add Identities
         * @param identity
         */
        function handleIdentity(identity_data){
            if(identity_data.id != cmUserModel.data.id){
                cmUserModel.setIdentity(identity_data);
            }
        }

        /**
         * @param token
         */
        function handleToken(token){
            if(typeof token !== 'undefined'){
                cmUserModel.storeToken(token);
            }
        }

        this.getPurl = function(id){
            var deferred = $q.defer();

            if(typeof id !== 'undefined'){
                cmConversationsAdapter.getPurl(id).then(
                    function (data) {
                        handleIdentity(data.identity);
                        handleToken(data.token);

                        deferred.resolve(handleConversation(data.conversation));
                    },
                    function (response) {
                        deferred.reject(response);
                    }
                )
            } else {
                deferred.reject();
            }

            return deferred.promise;
        }
    }
])
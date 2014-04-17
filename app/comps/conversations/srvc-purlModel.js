'use strict';

angular.module('cmConversations').service('cmPurlModel',[
    'cmConversationsAdapter',
    'cmConversationsModel',
    'cmConversationFactory',
    'cmUserModel',
    'cmAuth',
    'cmLogger',
    '$q',
    '$rootScope',
    function(cmConversationsAdapter, cmConversationsModel, cmConversationFactory, cmUserModel, cmAuth, cmLogger, $q, $rootScope) {
        var self = this;

        this.purls = [];

        $rootScope.$on('logout', function(){
            self.purls = [];
        });

        this.handleConversation = function(conversation_data){
            var conversation = cmConversationFactory.create(conversation_data);
            cmConversationsModel.addConversation(conversation);

            return conversation.id;
        }

        /**
         * @TODO add Function to cmUserModel to handle Guests and add Identities
         * @param identity
         */
        this.handleIdentity = function(identity_data){
            if(identity_data.userType == 'external'){
                cmLogger.debug('cmPurlModel:handleIdentity:externUser')
                cmUserModel.doLogout(false);
                cmUserModel.setIdentity(identity_data);
            } else if(identity_data.id != cmUserModel.data.id){
                cmLogger.debug('cmPurlModel:handleIdentity:externUser')
            }

            return this;
        }

        /**
         * @param token
         */
        this.handleToken = function(token){
            if(typeof token !== 'undefined'){
                cmUserModel.storeToken(token);
            }

            return this;
        }

        this.getPurl = function(id){
            var deferred = $q.defer();

            if(typeof id !== 'undefined'){
                cmConversationsAdapter.getPurl(id).then(
                    function (data) {
//                        handleIdentity(data.identity);
//                        handleToken(data.token);
//
//                        deferred.resolve(handleConversation(data.conversation));
                        deferred.resolve(data);
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
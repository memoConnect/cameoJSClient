'use strict';

angular.module('cmConversations').service('cmPurlModel',[
    'cmConversationsAdapter',
    'cmConversationFactory',
    'cmUserModel',
    'cmAuth',
    'cmLogger',
    '$q',
    '$rootScope',
    function(cmConversationsAdapter, cmConversationFactory, cmUserModel, cmAuth, cmLogger, $q, $rootScope) {
        var self = this;

        this.purls = [];

        this.handleConversation = function(conversation_data){
            var conversation = cmConversationFactory.create(conversation_data);

            return conversation.id;
        };

        /**
         * @TODO add Function to cmUserModel to handle Guests and add Identities
         * @param identity
         */
        this.handleIdentity = function(identity_data){
            var currentIdentity = cmUserModel.getIdentity();

            if(identity_data.userType == 'external'){
                cmLogger.debug('cmPurlModel:handleIdentity:externUser');
                cmUserModel.doLogout(false,'purl-modl handleIdentity');
                cmUserModel.setIdentity(identity_data);

                $rootScope.$broadcast('login');
            } else if(identity_data.id != currentIdentity.id){
                //cmLogger.debug('cmPurlModel:handleIdentity:internUser')
            }
        };

        /**
         * @param token
         */
        this.handleToken = function(token){
            if(typeof token !== 'undefined'){
                cmUserModel.storeToken(token);
            }

            return this;
        };

        this.getPurl = function(id){
            var deferred = $q.defer();

            if(typeof id !== 'undefined'){
                cmConversationsAdapter.getPurl(id).then(
                    function (data) {
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
        };

        $rootScope.$on('logout', function(){
            self.purls = [];
        });

        $rootScope.$on('identity:switched', function(){
            self.purls = [];
        });
    }
])
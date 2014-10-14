'use strict';

angular.module('cmConversations').service('cmPurlModel',[
    'cmObject',
    'cmConversationsAdapter',
    'cmConversationFactory',
    'cmUserModel',
    'cmAuth',
    'cmLogger',
    '$q',
    '$rootScope',
    function(cmObject, cmConversationsAdapter, cmConversationFactory, cmUserModel, cmAuth, cmLogger, $q, $rootScope) {
        var purls = [];

        var purlModel = {
            getPurl: function(id){
                var deferred = $q.defer();

                if(typeof id !== 'undefined'){
                    //var purl = purls.map(function(purl){
                    //    return (purl.id == id);
                    //});
                    //console.log(purl)
                    //
                    //if(typeof purls[id] != 'undefined'){
                    //    deferred.resolve(purls[id].data);
                    //} else {
                        cmConversationsAdapter.getPurl(id).then(
                            function (data) {
                                deferred.resolve(data);
                            },
                            function (response) {
                                deferred.reject(response);
                            }
                        );
                    //}
                } else {
                    deferred.reject();
                }

                return deferred.promise;
            },

            handleConversation: function(conversation_data){
                var conversation = cmConversationFactory.create(conversation_data);

                return conversation.id;
            },

            /**
             * @TODO add Function to cmUserModel to handle Guests and add Identities
             * @param identity
             */
            handleIdentity: function(identity_data){
                var currentIdentity = cmUserModel.getIdentity();

                if(identity_data.userType == 'external'){
                    //cmLogger.debug('cmPurlModel:handleIdentity:externUser');
                    cmUserModel.doLogout(false,'purl-modl handleIdentity');
                    cmUserModel.setIdentity(identity_data);

                    $rootScope.$broadcast('login');
                } else if(identity_data.id != currentIdentity.id){
                    //cmLogger.debug('cmPurlModel:handleIdentity:internUser')
                }

                return this;
            },

            /**
             * @param token
             */
            handleToken: function(token){
                if(typeof token !== 'undefined'){
                    cmUserModel.storeToken(token);
                }

                return this;
            }
        };

        cmObject.addEventHandlingTo(purlModel);

        return purlModel;

        $rootScope.$on('logout', function(){
            purls = [];
        });

        $rootScope.$on('identity:switched', function(){
            purls = [];
        });
    }
]);
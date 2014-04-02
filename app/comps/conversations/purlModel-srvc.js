'use strict';

function cmPurlModel (cmConversationsAdapter, cmConversationsModel, cmConversationFactory, cmUserModel, cmAuth, $q, $rootScope) {
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
        cmUserModel.setIdentity(identity_data);
    }

    /**
     * @TODO Token Handling over cmUserModel
     * @param token
     */
    function handleToken(token){
        cmAuth.storeToken(token);
    }

    this.getPurl = function(id){
        var deferred = $q.defer();

        if(typeof id !== 'undefined'){
            cmConversationsAdapter.getPurl(id).then(
                function (data) {
                    handleToken(data.token);
                    handleIdentity(data.identity);

                    deferred.resolve(handleConversation(data.conversation));
                },
                function () {
                    deferred.reject();
                }
            )
        } else {
            deferred.reject();
        }

        return deferred.promise;
    }
}
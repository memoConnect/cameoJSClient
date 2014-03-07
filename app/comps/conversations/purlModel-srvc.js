'use strict';

function cmPurlModel (cmConversationsAdapter, cmConversationFactory, cmUserModel, $q, $rootScope) {
    var self = this;

    this.conversations = [];
    this.quantity = 0;
    this.limit = 10; // 5
    this.offset = 0; //13

    $rootScope.$on('logout', function(){
        self.conversations = [];
    });

    this.getPurl = function(id){
        var deferred = $q.defer();

        if(typeof id === 'undefined'){
            cmConversationsAdapter.getPurl(id).then(
                function (data) {
                    deferred.resolve(data)
//                    deferred.resolve(cmConversationFactory.create(conversation_data));
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
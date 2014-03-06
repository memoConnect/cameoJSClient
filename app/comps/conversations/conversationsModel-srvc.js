'use strict';

function cmConversationsModel (cmConversationsAdapter, cmConversationFactory, $q, $rootScope) {
    var self = this;

    this.conversations = [];
    this.quantity = 0;
    this.limit = 10; // 5
    this.offset = 0; //13

    $rootScope.$on('logout', function(){
        self.conversations = [];
    });


    //Methods:
    this.addConversation = function(conversation){
        if(this.conversations.length == 0){
            this.conversations.push((conversation));
        } else {
            var i = 0;
            var check = false;
            while(i < this.conversations.length){
                if(conversation.id == this.conversations[i].id){
                    check = true;
                    break;
                }
                i++;
            }

            if(check !== true){
                this.conversations.push(conversation);
            } else {
                conversation.update();
            }
        }
    };

    this.createConversation = function (subject) {
        var deferred = $q.defer()

        cmConversationsAdapter.newConversation(subject)
            .then(function (conversation_data) {
                var conversation = cmConversationFactory.create(conversation_data)

                self.conversations.push(conversation);
                deferred.resolve(conversation);
            })

        return  deferred.promise;
    }

    //nicht schön:
    this.getConversation = function (id) {
        var deferred = $q.defer()

        cmConversationsAdapter.getConversation(id)
            .then(

            function (conversation_data) {
                deferred.resolve(cmConversationFactory.create(conversation_data));
            },

            function () {
                deferred.reject();
            }
        )

        return  deferred.promise;
    }

    this.getConversations = function (limit, offset) {
        if(typeof limit === 'undefined'){
            limit = this.limit;
        }

        if(typeof offset === 'undefined'){
            offset = this.offset;
        }

        cmConversationsAdapter.getConversations(limit, offset)
            .then(function (data) {
                self.quantity = data.numberOfConversations;

                data.conversations.forEach(function (conversation_data) {
                    self.addConversation(cmConversationFactory.create(conversation_data))
                })
            })
    }
}
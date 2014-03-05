'use strict';

function cmConversationsModel (cmConversationsAdapter, cmConversationFactory, $q) {
    //self:
    var conversations = [];

    //Methods:
    conversations.createConversation = function (subject) {
        var deferred = $q.defer()

        cmConversationsAdapter.newConversation(subject)
            .then(function (conversation_data) {
                var conversation = new cmConversationFactory(conversation_data)

                conversations.push(conversation);
                deferred.resolve(conversation);
            })

        return  deferred.promise;
    }

    //nicht schön:
    conversations.getConversation = function (id) {
        var deferred = $q.defer()

        cmConversationsAdapter.getConversation(id)
            .then(

            function (conversation_data) {
                deferred.resolve(new cmConversationFactory(conversation_data));
            },

            function () {
                deferred.reject();
            }
        )

        return  deferred.promise;
    }

    conversations.init = function () {
        cmConversationsAdapter.getConversations(10, 0)
            .then(function (data) {
                data.forEach(function (conversation_data) {
                    var conversation = new cmConversationFactory(conversation_data);
                    conversations.push(conversation);
                })
            })
    }

    conversations.init();

    return conversations;
}
'use strict';

function cmTalksModel (cmConversationsAdapter, cmMessageFactory) {

    var talks = [],
        limit = 5,
        offset = 13;


    talks.init = function(){
        cmConversationsAdapter.getConversations(5, 13).then(
            function (data) {
                data.forEach(function (data) {
                    talks.push(data);
//                    var conversation = new cmConversationFactory(conversation_data);
//                    conversations.push(conversation);
                });

                console.log(talks)
            }
        )
    };

    talks.init();

    return talks;
}
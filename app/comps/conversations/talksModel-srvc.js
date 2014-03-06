'use strict';

function cmTalksModel (cmConversationsAdapter, cmConversationFactory) {
    var talks = [],
        limit = 5,
        offset = 13;

    talks.init = function(){
        cmConversationsAdapter.getConversations(5, 13).then(
            function (data) {
                data.forEach(function (data) {
                    var conversation = cmConversationFactory.create(data);
                    talks.add(conversation);
                });
            }
        )
    };

    talks.add = function(conversation){
        talks.push(conversation);
    }

    talks.init();

    return talks;
}
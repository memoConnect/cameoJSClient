function cmConversationTag(){
    return {

        restrict : 'AE',
        scope: {
            conversation : "=cmData"
        },
        templateUrl : 'comps/conversations/conversation-tag.html',
        priority: 0
    }
}
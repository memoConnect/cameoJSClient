function cmConversationSummary(){
    return {

        restrict : 'AE',
        scope: {
            conversation : "=cmData"
        },
        templateUrl : 'comps/conversations/conversation-summary.html'
    }
}
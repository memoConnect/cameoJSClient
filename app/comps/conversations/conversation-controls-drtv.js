function cmConversationControls(){
    return{
        restrict : 'AE',
        templateUrl : 'comps/conversations/conversation-controls.html',      
        scope : {
            conversation :"=cmData"
        },

        controller : function($scope, $element, $attrs){

        }
    }
}
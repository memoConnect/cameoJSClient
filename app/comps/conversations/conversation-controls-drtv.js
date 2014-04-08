function cmConversationControls(cmNotify){
    return{
        restrict : 'AE',
        templateUrl : 'comps/conversations/conversation-controls.html',      
        scope : {
            conversation :"=cmData"
        },
        require: '^cmConversation',

        link: function($scope, $element, $attrs, cmConversation){
            $scope.isNew = cmConversation.isNew();

            $scope.safetyLevel = 'safe';
            $scope.setLevel = function(level){
                if(level =="safer" && $scope.conversation.getWeakestKeySize() == 0){
                    cmNotify.error('CONVERSATION.PUBLIC_KEY_MISSING')
                    return null
                }
                $scope.safetyLevel = level;
            }

            $scope.bodyVisible = $scope.isNew;

            $scope.handle = function(){
                if($scope.bodyVisible)
                    $scope.bodyVisible = false;
                else
                    $scope.bodyVisible = true;
            };
        }
    }
}
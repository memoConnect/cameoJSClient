function cmConversationControls(){
    return{
        restrict : 'AE',
        templateUrl : 'comps/conversations/conversation-controls.html',      
        scope : {
            conversation :"=cmData"
        },
        require: '^cmConversation',

        link: function($scope, $element, $attrs, cmConversation){
            $scope.isNew = cmConversation.isNew();

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
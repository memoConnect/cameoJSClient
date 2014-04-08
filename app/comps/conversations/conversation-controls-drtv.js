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

            $scope.setLevel = function(level){
                if(level == 'unsafe'){
                    $scope.conversation.setPassphrase('')
                    $scope.conversation.setKeyTransmission('symmetric')
                }

                if(level == 'safe'){
                    $scope.conversation.setPassphrase()
                    $scope.conversation.setKeyTransmission('symmetric')
                }

                if(level == 'safer'){
                    $scope.conversation.setPassphrase()
                    $scope.conversation.setKeyTransmission('asymmetric')
                }
                
                $scope.safetyLevel = level;
            }

            $scope.bodyVisible = $scope.isNew; 
            $scope.safetyLevel = 'safer'

            $scope.handle = function(){
                if($scope.bodyVisible)
                    $scope.bodyVisible = false;
                else
                    $scope.bodyVisible = true;
            };
        }
    }
}
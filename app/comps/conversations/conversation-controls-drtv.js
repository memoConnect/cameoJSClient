function cmConversationControls($modal){
    return{
        restrict : 'AE',
        templateUrl : 'comps/conversations/conversation-controls.html',      
        scope : {
            conversation :"=cmData"
        },
        require: '^cmConversation',

        link: function($scope, $element, $attrs, cmConversation){
            $scope.bodyVisible = cmConversation.isNew();

            $scope.handle = function(){
                if($scope.bodyVisible)
                    $scope.bodyVisible = false;
                else
                    $scope.bodyVisible = true;
            };
        },

        controller : function($scope, $element, $attrs){
            $scope.addRecipients = function(){
                $scope.isModalVisible = true;

                var modalInstance = $modal.open({
                    windowClass: 'cm-modal-with-title',
                    template : '<cm-contacts-list></cm-contacts-list>',
                    controller: function ($rootScope, $scope, $modalInstance) {
                        $rootScope.$on('cmLogin:success', function(){
                            $modalInstance.close(); //@ TODO!!!
                        })
                    }
                });

                modalInstance.result
                .then(
                    function () {

                    },
                    function () {
                        $scope.isModalVisible = false;
                    }
                );
            };
        }
    }
}
function cmConversationControls($modal){
    return{
        restrict : 'AE',
        templateUrl : 'comps/conversations/conversation-controls.html',      
        scope : {
            conversation :"=cmData"
        },

        controller : function($scope, $element, $attrs){
                $scope.addRecipients = function () {
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
'use strict';

function cmSearchCameoIdentity(cmContactsModel, cmLogger){
    return {
        restrict: 'A',
        scope: {},
        templateUrl: 'comps/contacts/search-cameo-identity.html',
        controller: function($scope){
            $scope.results = [];

            /**
             * searching for an existing cameoId
             * @returns {boolean}
             */
            $scope.search = function(){
                if($scope.searchCameoId.string.$invalid){
                    $scope.results = [];
                    return false;
                }

                cmContactsModel.searchCameoIdentity($scope.string)
                .then(
                    function(data){
                        $scope.results = data;
                    },
                    function(){

                    }
                );
                return true;
            };

            /**
             * Send friendship via model to api
             * @param id
             */
            $scope.sendFriendRequest = function(id){
                // TODO: Notification
                if(angular.isDefined(id)){
                    cmContactsModel
                    .sendFriendRequest(id)
                    .then(
                        function(){
                            cmLogger.debug("FriendRequest success");
                        },
                        function(){
                            cmLogger.debug("FriendRequest error");
                        }
                    )
                }
            };
        }
    }
}
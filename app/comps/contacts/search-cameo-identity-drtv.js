'use strict';

function cmSearchCameoIdentity(cmContactsModel, cmNotify){
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
                    }
                );
                return true;
            };

            /**
             * Send friendship via model to api
             * @param id
             */
            $scope.sendFriendRequest = function(item){
                if(angular.isDefined(item.id)){
                    cmContactsModel
                    .sendFriendRequest(item.id)
                    .then(
                        function(){
                            var index = $scope.results.indexOf(item);
                            $scope.results.splice(index,1);
                            cmNotify.success('CONTACTS.INFO.REQUEST.SENDED');
                        },
                        function(){
                            cmNotify.error('CONTACTS.INFO.REQUEST.FAILED');
                        }
                    )
                }
            };
        }
    }
}
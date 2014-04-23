'use strict';

angular.module('cmContacts').directive('cmContactsSearch',[
    'cmContactsModel',
    'cmNotify',
    function (cmContactsModel, cmNotify){
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'comps/contacts/drtv-contacts-search.html',
            controller: function($scope){
                $scope.pristine = true;
                $scope.results = [];

                /**
                 * searching for an existing cameoId
                 * @returns {boolean}
                 */
                $scope.search = function(){
                    if($scope.searchCameoId.string.$invalid || $scope.string == ''){
                        $scope.results = [];
                        $scope.pristine = true;
                        return false;
                    }

                    $scope.pristine = false;

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
                $scope.sendRequest = function(contact){
                    if(angular.isDefined(contact.id)){
                        cmContactsModel
                        .sendFriendRequest(contact.id)
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
]);
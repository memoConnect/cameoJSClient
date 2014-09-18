'use strict';

angular.module('cmContacts').directive('cmSearch',[
    'cmContactsModel',
    'cmIdentityFactory',
    'cmNotify',
    'cmModal',
    '$timeout',
    function (cmContactsModel, cmIdentityFactory, cmNotify, cmModal, $timeout){
        return {
            restrict: 'E',
            templateUrl: 'comps/contacts/drtv-search.html',
            controller: function($scope){
                $scope.pristine = true;
                $scope.results = [];

                /**
                 * searching for an existing cameoId
                 * @returns {boolean}
                 */
                $scope.timeout = null;
                $scope.sendSearch = function(){
                    if($scope.searchCameoId.string.$invalid || $scope.string == ''){
                        $scope.results = [];
                        $scope.pristine = true;
                        return false;
                    }

                    $scope.pristine = false;

                    if($scope.timeout != null) $timeout.cancel($scope.timeout)

                    $scope.timeout = $timeout(function(){
                        cmContactsModel.searchCameoIdentity($scope.string)
                            .then(
                            function(data){
                                var tmp = [];
                                angular.forEach(data, function(value){
                                    tmp.push(cmIdentityFactory.create(value, true));
                                });
                                $scope.results = tmp;
                            }
                        );
                    },500);

                    return true;
                };

                /**
                 * Send friendship via model to api
                 * @param id
                 */
                $scope.sendRequest = function(contact){
                    if(angular.isDefined(contact.id)){
                        cmContactsModel
                        .sendFriendRequest(contact.id, contact.message)
                        .then(
                            function(){
                                // clear from list
                                var index = $scope.results.indexOf(contact);
                                $scope.results.splice(index,1);
                                // notify
//                                cmNotify.success('CONTACTS.INFO.REQUEST.SENDED', {displayType:'modal', ttl:3000});
                                cmContactsModel.trigger('friendRequest:sent');
                                cmModal.closeAll();
                                $scope.goto('/contact/list')
                            },
                            function(){
                                cmNotify.error('CONTACTS.INFO.REQUEST.FAILED', {displayType:'modal'});
                            }
                        )
                    }
                };
            }
        }
    }
]);
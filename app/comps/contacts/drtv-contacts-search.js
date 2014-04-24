'use strict';

angular.module('cmContacts').directive('cmContactsSearch',[
    'cmContactsModel',
    'cmIdentityFactory',
    'cmNotify',
    function (cmContactsModel, cmIdentityFactory, cmNotify){
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
                            var tmp = [];
                            angular.forEach(data, function(value){
                                tmp.push(cmIdentityFactory.create(value.id));
                            });
                            $scope.results = tmp;
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
                                var index = $scope.results.indexOf(contact);
                                $scope.results.splice(contact,1);
                                cmNotify.success('CONTACTS.INFO.REQUEST.SENDED', {ttl:2000});
                                cmContactsModel.trigger('friendRequest:send');
                            },
                            function(){
                                cmNotify.error('CONTACTS.INFO.REQUEST.FAILED', {ttl:2000});
                            }
                        )
                    }
                };
            }
        }
    }
]);
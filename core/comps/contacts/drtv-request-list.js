'use strict';

angular.module('cmRouteContacts').directive('cmRequestList', [
    'cmContactsModel', 'cmNotify',
    function(cmContactsModel, cmNotify){
        return {
            restrict: 'E',
            templateUrl: 'comps/contacts/drtv-request-list.html',
            controller: function ($scope) {
                $scope.requests = cmContactsModel.requests;
                $scope.isLoading = false;

                function deactiveBell(greaterZero){
                    if(greaterZero && $scope.requests.length > 0){
                        cmNotify.trigger('bell:unring');
                    } else if($scope.requests.length == 0) {
                        cmNotify.trigger('bell:unring');
                    }
                }
                deactiveBell(true);

                /**
                 * fired by repeat and accept that
                 * @param id
                 */
                $scope.acceptRequest = function(item){
                    if(typeof item == 'object'){
                        item.accept().then(
                            function(){
                                cmContactsModel.removeFriendRequest(item);
                                deactiveBell();
                                cmContactsModel.trigger('friendRequests:updated');
                            },

                            function(){
                                /**
                                 * @todo accept fails
                                 */
                            }
                        )
                    }
                };

                /**
                 * fired by repeat delete request
                 * @param id
                 */
                $scope.rejectRequest = function(item){
                    if(typeof item == 'object'){
                        item.reject().then(
                            function(){
                                cmContactsModel.removeFriendRequest(item);
                                deactiveBell();
                                cmContactsModel.trigger('friendRequests:updated');
                            },

                            function(){
                                /**
                                 * @todo reject fails
                                 */
                            }
                        )
                    }
                };

                $scope.ignoreRequest = function(item){
                    if(typeof item == 'object'){
                        item.ignore().then(
                            function(){
                                cmNotify.trigger('bell:unring');
                                deactiveBell();
                                cmContactsModel.trigger('friendRequests:updated');
                            },

                            function(){
                                /**
                                 * @todo ignrore fails
                                 */
                            }
                        )
                    }
                }
            }
        }
    }
]);
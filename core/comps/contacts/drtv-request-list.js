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

                cmNotify.unringBimmel('friendRequest');

                /**
                 * fired by repeat and accept that
                 * @param id
                 */
                $scope.acceptRequest = function(item){
                    if(typeof item == 'object'){
                        item.accept().then(
                            function(){
                                cmContactsModel.removeFriendRequest(item);
                                cmContactsModel.trigger('friendRequests:updated');
                                cmNotify.unringBimmel('friendRequest');
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
                                cmContactsModel.trigger('friendRequests:updated');
                                cmNotify.unringBimmel('friendRequest');
                            }
                        )
                    }
                };

                $scope.ignoreRequest = function(item){
                    if(typeof item == 'object'){
                        item.ignore().then(
                            function(){
                                cmContactsModel.removeFriendRequest(item);
                                cmContactsModel.trigger('friendRequests:updated');
                                cmNotify.unringBimmel('friendRequest');
                            }
                        )
                    }
                }
            }
        }
    }
]);
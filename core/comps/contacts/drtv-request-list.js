'use strict';

angular.module('cmRouteContacts').directive('cmRequestList', [
    'cmContactsModel',
    'cmNotify',
    function(cmContactsModel, cmNotify){
        return {
            restrict: 'E',
            templateUrl: 'comps/contacts/drtv-request-list.html',
            controller: function ($scope) {
                $scope.requests = cmContactsModel.requests;
                $scope.isLoading = false;

                /*
                cmContactsModel.on('friendRequests:loaded', function(){
                    $scope.requests = cmContactsModel.requests;
                });

                cmContactsModel.on('friendRequests:updated', function(){
                    $scope.requests = cmContactsModel.requests;
                });
                */

                if($scope.requests.length > 0){
                    cmNotify.trigger('bell:unring');
                }

                /**
                 * fired by repeat and accept that
                 * @param id
                 */
                $scope.acceptRequest = function(item){
                    if(typeof item == 'object'){
                        item.accept().then(
                            function(){
                                cmContactsModel.removeFriendRequest(item);

//                                cmNotify.success('CONTACTS.INFO.REQUEST.ACCEPT',{displayType:'modal', ttl:3000});

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

//                                cmNotify.success('CONTACTS.INFO.REQUEST.REJECT',{displayType:'modal',ttl:3000});

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

//                                cmNotify.success('CONTACTS.INFO.REQUEST.IGNORE',{displayType:'modal',ttl:3000});

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
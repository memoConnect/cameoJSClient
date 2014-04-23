'use strict';

angular.module('cmContacts').directive('cmFriendRequestList',[
    'cmContactsModel',
    'cmNotify',
    '$rootScope',
    function (cmContactsModel, cmNotify, $rootScope){
        return {
            restrict: 'AE',
            scope: true,
            controller: function($scope){
                $scope.requests = cmContactsModel.requests;
                $scope.isLoading = false;

                cmContactsModel.on('friendRequests:loaded', function(){
                    $scope.requests = cmContactsModel.requests;
                });

                $scope.toggleBrief = function(request){
                    if(request.isOpen == undefined || request.isOpen == false){
                        request.state = 'new';
                        request.isOpen = true;
                    } else {
                        request.isOpen = false;
                    }
                };

                /**
                 * fired by repeat and accept that
                 * @param id
                 */
                $scope.acceptRequest = function(item){
                    cmContactsModel.answerFriendRequest(item.identity.id, 'accept').then(
                        function(){
                            cmNotify.success('CONTACTS.INFO.REQUEST.ACCEPT');
                            $rootScope.$broadcast('cmNotify:update');
                            removeRequest(item);
                            cmContactsModel.trigger('friendRequests:updated')
                        }
                    );
                };

                /**
                 * fired by repeat delete request
                 * @param id
                 */
                $scope.rejectRequest = function(item){
//                    cmContactsModel.answerFriendRequest(item.id, 'reject').then(
//                        function(){
//                            cmNotify.warn('CONTACTS.INFO.REQUEST.REJECT');
//                            removeRequest(item);
//                        }
//                    );
                };

                /**
                 * @private
                 * remove request from results
                 * @param id
                 */
                function removeRequest(item){
                    if(angular.isDefined(item)){
                        var index = $scope.requests.indexOf(item);
                        $scope.requests.splice(index,1);
                    }
                }
            }
        }
    }
]);
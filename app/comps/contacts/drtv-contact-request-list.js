'use strict';

angular.module('cmContacts').directive('cmContactRequestList',[
    'cmContactsModel',
    'cmNotify',
    function (cmContactsModel, cmNotify){
        return {
            restrict: 'AE',
            scope: true,
            controller: function($scope){
                $scope.requests = cmContactsModel.requests;
                $scope.isLoading = false;

                cmContactsModel.on('friendRequests:loaded', function(){
                    $scope.requests = cmContactsModel.requests;
                });

                /**
                 * fired by repeat and accept that
                 * @param id
                 */
                $scope.acceptRequest = function(item){
                    console.log(item)
//                    cmContactsModel.answerFriendRequest(item.id, 'accept').then(
//                        function(){
//                            cmNotify.success('CONTACTS.INFO.REQUEST.ACCEPT');
//                            rmFromModel(item);
//                        }
//                    );
                };

                /**
                 * fired by repeat delete request
                 * @param id
                 */
                $scope.rejectRequest = function(item){
//                    cmContactsModel.answerFriendRequest(item.id, 'reject').then(
//                        function(){
//                            cmNotify.warn('CONTACTS.INFO.REQUEST.REJECT');
//                            rmFromModel(item);
//                        }
//                    );
                };

                /**
                 * @private
                 * remove request from results
                 * @param id
                 */
                function rmFromModel(item){
                    if(angular.isDefined(item)){
                        var index = $scope.results.indexOf(item);
                        $scope.results.splice(index,1);
                    }
                }
            }
        }
    }
]);
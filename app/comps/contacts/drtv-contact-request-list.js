'use strict';

angular.module('cmContacts').directive('cmContactRequestList',[
    'cmContactsModel',
    'cmNotify',
    function (cmContactsModel, cmNotify){
        return {
            restrict: 'A',
            scope: {},
            templateUrl: 'comps/contacts/drtv-contact-request-list.html',
            controller: function($scope, $element, $attrs){
                $scope.results = [];
                $scope.loaded = false;

                /**
                 * load all requests pending/
                 */
                $scope.loadFriendRequests = function(){
                    cmContactsModel.getFriendRequests().then(
                        function(data){
                            $scope.results = data;
                            $scope.loaded = true;
                        }
                    )
                };

                /**
                 * fired by repeat and accept that
                 * @param id
                 */
                $scope.acceptRequest = function(item){
                    cmContactsModel.answerFriendRequest(item.id, 'accept').then(
                        function(){
                            cmNotify.success('CONTACTS.INFO.REQUEST.ACCEPT');
                            rmFromModel(item);
                        }
                    );
                };

                /**
                 * fired by repeat delete request
                 * @param id
                 */
                $scope.rejectRequest = function(item){
                    cmContactsModel.answerFriendRequest(item.id, 'reject').then(
                        function(){
                            cmNotify.warn('CONTACTS.INFO.REQUEST.REJECT');
                            rmFromModel(item);
                        }
                    );
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
/*
define([
    'app',
    'ngload!cmLogger',
    'ngload!mContacts'
], function(app){
*/

'use strict';

function cmContactRequestList(cmContactsModel, cmLogger){
    return {
        restrict: 'A',
        scope: {},
        templateUrl: 'comps/contacts/contact-request-list.html',
        controller: function($scope, $element, $attrs){
            $scope.results = [];

            /**
             * load all requests pending/
             */
            $scope.loadFriendRequests = function(){
                cmContactsModel.getFriendRequests().then(
                    function(data){
                        $scope.results = data;
                    }
                )
            };

            /**
             * fired by repeat and accept that
             * @param id
             */
            $scope.acceptRequest = function(id){
                cmLogger.debug('acceptRequest ' + id);
                // TODO: notify, update ContactList
                cmContactsModel.answerFriendRequest(id, 'accept').then(
                    function(){
                        rmFromModel(id);
                    }
                );
            };

            /**
             * fired by repeat delete request
             * @param id
             */
            $scope.rejectRequest = function(id){
                cmLogger.debug('rejectRequest ' + id);
                // TODO: notify, update ContactList
                cmContactsModel.answerFriendRequest(id, 'reject').then(
                    function(){
                        rmFromModel(id);
                    }
                );
            };

            /**
             * @private
             * remove request from results
             * @param id
             */
            function rmFromModel(id){
                if(angular.isDefined(id)){
                    angular.forEach($scope.results,function(value, key){
                        if(value.id == id){
                            $scope.results.splice(key, 1);
                        }
                    });
                }
            }
        }
    }
}

/*
});
*/
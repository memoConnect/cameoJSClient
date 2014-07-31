'use strict';

angular.module('cmRouteContacts').directive('cmOverviewContacts', [
    function(){
        return {
            restrict: 'E',
            templateUrl: 'routes/contacts/comps/drtv-overview.html',
            controller: function ($scope) {
                $scope.createNewConversation = function(){
                    delete($rootScope.pendingConversation);
                    $location.path('/conversation/new');
                };
            }
        }
    }
]);
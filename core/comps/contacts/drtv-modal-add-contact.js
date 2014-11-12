'use strict';

angular.module('cmContacts')
.directive('cmModalAddContact',[
    'cmLocalContacts',
    '$rootScope',
    function (cmLocalContacts, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/contacts/drtv-modal-add-contact.html',
            scope: {
                modalId: "@id",
                nosePosition: "@nosePosition"
            },
            controller: function($scope){
                $scope.canReadLocalContacts = function(){
                    return cmLocalContacts.canRead();
                };

                $scope.goTo = $rootScope.goTo;
            }
        }
    }
]);
'use strict';

angular.module('cmContacts')
.directive('cmModalAddContact',[
    'cmLocalContacts',
    function (cmLocalContacts){
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
            }
        }
    }
]);
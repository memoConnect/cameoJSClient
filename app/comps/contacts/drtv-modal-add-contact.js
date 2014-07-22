'use strict';

angular.module('cmContacts')
.directive('cmModalAddContact',[
    function (){
        return {
            restrict: 'E',
            templateUrl: 'comps/contacts/drtv-modal-add-contact.html',
            scope: {
                modalId: "@id",
                nosePosition: "@nosePosition"
            }
        }
    }
]);
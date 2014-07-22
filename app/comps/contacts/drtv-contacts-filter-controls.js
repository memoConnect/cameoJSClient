'use strict';

angular.module('cmContacts')
.directive('cmContactsFilterControls',[
    function (){
        return{
            restrict : 'AE',
            scope : true,
            templateUrl : 'comps/contacts/drtv-contacts-filter-controls.html'
        }
    }
])
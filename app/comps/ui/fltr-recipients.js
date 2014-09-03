'use strict';

angular.module('cmUi')
.filter('cmRecipients', [

    'cmUtil',

    function(cmUtil){
        return function(arrayToSearch, shouldBeRecipient, objectOfRecipients){
            // defines
            var arrayFiltered = [],
                objectOfRecipients = objectOfRecipients || {}

            if(!cmUtil.isArray(arrayToSearch) || typeof searchString != 'string') return [];

            // iterate all
            for ( var j = 0; j < arrayToSearch.length; j++) {
                var contact = arrayToSearch[j];
                if(shouldBeRecipient && contact.identity.id in objectOfRecipients ||
                   !shouldBeRecipient && !(contact.identity.id in objectOfRecipients) ) {
                    arrayFiltered.push(contact);
                }
            }
            // return filtered array
            return arrayFiltered;
        }
    }
]);
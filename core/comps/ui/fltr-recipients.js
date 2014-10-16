'use strict';

angular.module('cmUi').filter('cmRecipients', [

    function(){
        return function(arrayToSearch, shouldBeRecipient, objectOfRecipients){
            // defines
            var arrayFiltered = [],
                objectOfRecipients = objectOfRecipients || {}

            if(!arrayToSearch.length) return arrayToSearch;

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
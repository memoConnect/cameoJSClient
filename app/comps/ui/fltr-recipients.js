'use strict';

angular.module('cmUi')
.filter('cmRecipients', [
    function(){
        return function(arrayToSearch, shouldBeRecipient, objectOfRecipients){
            // filter array
            var arrayFiltered = [];
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
'use strict';

angular.module('cmUi')
.filter('cmRecipients', [
    function(){
        return function(arrayToSearch, shouldBeRecipient, arrayOfRecipients){
            // filter array
            var arrayFiltered = [];
            // iterate all
            for ( var j = 0; j < arrayToSearch.length; j++) {
                var contact = arrayToSearch[j];
                if(shouldBeRecipient && arrayOfRecipients.indexOf(contact.identity.id) ||
                   !shouldBeRecipient && !arrayOfRecipients.indexOf(contact.identity.id)) {
                    arrayFiltered.push(contact);
                }
            }
            // return filtered array
            return arrayFiltered;
        }
    }
]);
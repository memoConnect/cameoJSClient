'use strict';

angular.module('cmConversations')
.filter('cmHideAppOwner', [
    function(){
        return function(arrayOfIdentities) {
            return arrayOfIdentities.filter(function(identity){
                return !('isAppOwner' in identity)
            })
        }
    }
]);
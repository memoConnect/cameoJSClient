'use strict';
/**
 * @deprecated
 */
angular.module('cmContacts')
.directive('cmContactBrief', [
    function(){
        return {
            restrict : 'AE',
            template: '<div class="name" data-qa="contact-display-name">' +
                        '{{contact.identity.getDisplayName()}}' +
                      '</div>'
        }
    }
]);
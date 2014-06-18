'use strict';

angular.module('cmContacts').directive('cmContactBrief', [
    function (){
        return {
            restrict : 'AE',
            //templateUrl : 'comps/contacts/contact-brief.html',
            template: '<div class="name" data-qa="contact-display-name">{{contact.identity.getDisplayName()}}</div>'+
                '<div class="about">about</div>' ,
            require: '^cmContactTag',
            priority: 1
            /*
             scope : {
             contact : "=cmData"
             }
             */
        }
    }
]);
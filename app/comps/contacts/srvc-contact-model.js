'use strict';

angular.module('cmContacts').factory('cmContactModel', [

    'cmIdentityFactory',

    function(){

        function ContactModel(data){
             this.id            = undefined
             this.contactType   = undefined
             this.group         = []
             identity           = cmIdentityFactory.create()
        }

        return ContactModel
    }
])
'use strict';

angular.module('cmContacts')
.factory('cmContactModel', [
    'cmIdentityFactory',
    function(cmIdentityFactory){
        function ContactModel(data){
             this.id            = undefined;
             this.contactType   = undefined;
             this.group         = [];
             this.identity      = cmIdentityFactory.new();

             this.importData = function(data){
                if(data == undefined)
                    return false;

                this.id             = data.id           || this.id;
                this.contactType    = data.contactType  || this.contactType;
                this.groups         = data.groups       || this.groups;
                this.identity       = data.identity ? cmIdentityFactory.create(data.identity, true) : this.identity;
             };

             this.setContactType = function(type){
                this.contactType = type;
                return this;
             };

             this.importData(data);
        }
        return ContactModel;
    }
]);
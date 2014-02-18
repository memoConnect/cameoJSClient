define([
    'app'
], function () {
    'use strict';

    var ModelContacts = function(cmContacts, cmLogger){
        var contacts = ['derMicha','dasEmpu'];

        cmLogger.debug("mContacts");

        return {
            getAll: function(){
                return contacts;
            }
        }
    }

    var mContacts = angular.module('mContacts',[]).factory('ModelContacts', ModelContacts);
});
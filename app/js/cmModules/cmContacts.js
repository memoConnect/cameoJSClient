define([
    'angularAMD',
    'cmApi',
    'cmLogger'
], function () {
   'use strict';

    var cmContacts = angular.module('cmContacts',['cmApi','cmLogger']);

    cmContacts.service('cmContacts',[
        'cmApi',
        'cmLogger',
        function(cmApi, cmLogger){
            return {
                getAll: function(limit, offset){
                    return cmApi.get({
                        url:'/contacts'
                    });
                }
            }
        }
    ])
});
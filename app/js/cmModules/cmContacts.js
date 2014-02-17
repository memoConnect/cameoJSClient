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
            function handleLimitOffset(limit,offset){
                var s = '';

                if(angular.isDefined(limit)){
                    s = '?limit=' + parseInt(limit);
                } else {
                    //default limit
                }

                if(s != '' && angular.isDefined(offset)){
                    s += '&offset=' + parseInt(offset);
                }

                return s;
            };

            return {
                getAll: function(limit, offset){
                    return cmApi.get({
                        url:'/contacts' + handleLimitOffset(limit,offset)
                    });
                },
                getOne: function(id){
                    return cmApi.get({
                        url:'/contact/'+id
                    })
                },
                getGroups: function(){
                    return cmApi.get({
                        url:'contact-groups'
                    })
                },
                getAllFromGroup: function(group,limit,offset){
                    return cmApi.get({
                        url:'contact-group/' + group + handleLimitOffset(limit,offset)
                    })
                }
            }
        }
    ])
});
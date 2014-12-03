'use strict';

angular.module('cmValidate').service('cmVerify',[
    'cmApi',
    function (cmApi){

        var self = {
            send: function(type){
                return cmApi.get({
                    path: '/verify/'+type
                });
            }
        };

        return self;
    }
]);
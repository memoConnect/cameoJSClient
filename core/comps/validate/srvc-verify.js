'use strict';

angular.module('cmValidate').service('cmVerify',[
    'cmApi',
    function (cmApi){

        var self = {
            send: function(type){
                var data = {};

                switch(true){
                    case type == 'sms':
                        data.verifyPhoneNumber = true;
                    break;
                    case type == 'email':
                        data.verifyEmail = true;
                    break;
                }

                return cmApi.post({
                    path: '/verify',
                    data: data
                });
            },
            confirm: function(secret){
                return cmApi.get({
                    path: '/verify/'+secret
                });
            }
        };

        return self;
    }
]);
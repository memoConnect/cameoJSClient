'use strict';

angular.module('cmValidate').service('cmVerify',[
    'cmApi', 'cmModal',
    function (cmApi, cmModal){

        function confirmModal(type){
            var modalId = 'confirm-verification';

            cmModal.create({
                id: modalId,
                type: 'plain',
                'class': 'no-padding',
                'cm-title': 'DRTV.MODAL_VERIFICATION.HEADER'
            },'<cm-confirm-verification></cm-confirm-verification>');

            cmModal.open(modalId,{
                type: type
            });
        }

        var self = {
            send: function(type){
                var data = {};

                switch(type){
                    case 'phoneNumber':
                        data.verifyPhoneNumber = true;
                    break;
                    case 'email':
                        data.verifyMail = true;
                    break;
                }

                cmApi.post({
                    path: '/verify',
                    data: data
                }).then(
                    function(){
                        confirmModal(type);
                    },
                    function(){

                    }
                );
            },
            confirm: function(secret){
                return cmApi.post({
                    path: '/verify/'+secret
                });
            }
        };

        return self;
    }
]);
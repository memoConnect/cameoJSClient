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
            handleInput: function(type, scope){
                scope.verificationManuallyIcon = '<i class="fa cm-checkbox-wrong"></i>';

                scope.verification = {
                    isVisible: false,
                    isVerified: false
                };

                scope.$watch('verificationData', function(data){
                    if(data && data.value != '') {
                        scope.verification.isVisible = true;
                        scope.verification.isVerified = 'isVerified' in data ? data.isVerified : false;
                    } else
                        scope.verification.isVisible = false;
                });

                scope.doVerification = function(){
                    if(!scope.verification.isVerified)
                        self.send(type);
                };
            },

            send: function(type){
                var data = {};

                switch(type){
                    case 'phoneNumber':
                        data.verifyPhoneNumber = true;
                    break;
                    case 'email':
                        data.verifyEmail = true;
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
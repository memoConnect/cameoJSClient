'use strict';

angular.module('cmValidate')
.service('cmVerify',[
    'cmAuth', 'cmUtil', 'cmLoader',
    function (cmAuth, cmUtil, cmLoader){

        var self = {
            handleInput: function(type, scope){
                var loader = new cmLoader(scope);

                scope.cmUtil = cmUtil;
                scope.code = '';
                scope.verificationManuallyIcon = '<i class="fa cm-checkbox-wrong"></i>';

                scope.verification = {
                    isVisible: false,
                    isVerified: false
                };
                scope.infoBubble = {};

                scope.$watch('verificationData', function(data){
                    if(data && data.value != '') {
                        scope.verification.isVisible = true;
                        scope.verification.isVerified = 'isVerified' in data ? data.isVerified : false;
                        loader.stop();
                        scope.code = '';
                    } else {
                        scope.verification.isVisible = false;
                    }
                });

                scope.sendVerification = function(){
                    if (loader.isIdle())
                        return false;

                    if(!scope.verification.isVerified) {
                        cmAuth.sendVerification(type);
                    }
                };

                scope.checkVerificationCode = function(){
                    if (loader.isIdle())
                        return false;

                    scope.infoBubble = {};
                    loader.start();

                    if(!scope.code || scope.code == ''){
                        scope.infoBubble.empty = true;
                        loader.stop();
                    } else {
                        cmAuth.confirmVerification(scope.code)
                        .then(
                            function(){},
                            function(response){
                                loader.stop();
                                switch (response.data.errorCode){
                                    case "VERIFY.EXPIRED":
                                        scope.infoBubble.invalid = true;
                                    break;
                                }
                            }
                        )
                    }
                };
            }
        };

        return self;
    }
]);
'use strict';

angular.module('cmValidate').directive('cmConfirmVerification',[
    'cmVerify', 'cmUserModel', 'cmLoader',
    function (cmVerify, cmUserModel, cmLoader){
        return {
            restrict:       'E',
            scope:          false,
            templateUrl:    'comps/validate/modal/drtv-confirm-verification.html',

            controller: function($scope){

                var loader = new cmLoader($scope);

                function setErrorsToDefault(){
                    $scope.error = {
                        empty: false,
                        invalid: false
                    };
                }

                $scope.verifySecret = '';

                $scope.confirm = function(){
                    if (loader.isIdle())
                        return false;

                    setErrorsToDefault();
                    loader.start();

                    if($scope.cmForm.$error.required)
                        $scope.error.empty = true;

                    if(!$scope.cmForm.$valid) {
                        loader.stop();
                    } else {
                        cmVerify.confirm($scope.verifySecret).then(
                            function(){
                                cmUserModel.one('account:updated', function(){
                                    loader.stop();
                                    var closeModal = false;

                                    switch ($scope.data.type){
                                        case 'phoneNumber':
                                            if(cmUserModel.data.account.phoneNumber.isVerified)
                                                closeModal = true;
                                        break;
                                        case 'email':
                                            if(cmUserModel.data.account.email.isVerified)
                                                closeModal = true;
                                        break;
                                    }

                                    if(closeModal)
                                        $scope.close();

                                });
                            },
                            function (response) {
                                loader.stop();
                                switch (response.data.errorCode){
                                    case "VERIFY.EXPIRED":
                                        $scope.error.invalid = true;
                                    break;
                                }
                            }
                        );
                    }
                };

                setErrorsToDefault();
            }
        }
    }
]);
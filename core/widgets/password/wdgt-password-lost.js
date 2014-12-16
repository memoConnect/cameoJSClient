'use strict';

angular.module('cmWidgets').directive('cmWidgetPasswordLost', [
    'cmAuth', 'cmLoader', 'cmUtil',
    '$rootScope', '$q',
    function (cmAuth, cmLoader, cmUtil,
              $rootScope, $q) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/password/wdgt-password-lost.html',

            controller: function ($scope) {
                var loader = new cmLoader($scope);

                $scope.cmUtil = cmUtil;

                function reset(){
                    $scope.info = {};
                    $scope.formData = {
                        identifier: ''
                    };
                }

                reset();

                /**
                 * validate cmForm
                 * @returns {*}
                 */
                $scope.validateForm = function (checkCode) {
                    var deferred = $q.defer(),
                        objectData = {};

                    if(!checkCode) {
                        if ($scope.cmForm.identifier.$modelValue != '')
                            objectData.identifier = $scope.cmForm.identifier.$modelValue;
                        else
                            $scope.info.empty = true;

                    } else if(checkCode){
                        if($scope.cmForm.code.$modelValue != '')
                            objectData.code = $scope.cmForm.code.$modelValue;
                        else
                            $scope.info.emptyCode = true;
                    }

                    if(cmUtil.objLen(objectData) > 0) {
                        deferred.resolve(objectData);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                /**
                 * Form Validation and Apicall to send password reset
                 */
                $scope.startResetPassword = function () {
                    if (loader.isIdle())
                        return false;

                    loader.start();

                    $scope.info = {};

                    $scope.validateForm().then(
                        function(objectChange) {

                            cmAuth.sendPasswordLost(objectChange).then(
                                function(){
                                    loader.stop();

                                    $scope.info.confirmationSended = true;
                                    $scope.formData = {
                                        code: ''
                                    };
                                },
                                function(response){
                                    loader.stop();
                                    switch(response.data.errorCode){
                                        case 'PASSWORD.RESET.LOGIN.NOT.FOUND':
                                            $scope.info.loginNotFound = true;
                                        break;
                                        case 'PASSWORD.RESET.PHONENUMBER.NOT.FOUND':
                                            $scope.info.phoneNumberNotFound = true;
                                        break;
                                        case 'PASSWORD.RESET.EMAIL.NOT.FOUND':
                                            $scope.info.emailNotFound = true;
                                        break;
                                        case 'PASSWORD.RESET.NO.EMAIL.PHONENUMBER':
                                            $scope.info.noEmailPhonenumber = true;
                                        break;
                                    }

                                }
                            )
                        },
                        function() {
                            loader.stop();
                        }
                    );
                };

                $scope.checkResetPassword = function(){
                    if (loader.isIdle())
                        return false;

                    loader.start();

                    $scope.info = {
                        confirmationSended: true
                    };

                    $scope.validateForm(true).then(
                        function(objectChange) {

                            cmAuth.checkResetPassword(objectChange.code).then(
                                function(data){
                                    loader.stop();

                                    $rootScope.goTo('/password/reset/'+data.id);
                                },
                                function(response){
                                    loader.stop();
                                    switch(response.data.errorCode){
                                        case 'PASSWORD.RESET.EXPIRED':
                                            $scope.info.expired = true;
                                        break;
                                    }
                                }
                            )
                        },
                        function() {
                            loader.stop();
                        }
                    );
                };

                $scope.resetForm = function(){
                    reset();
                };
            }
        }
    }
]);
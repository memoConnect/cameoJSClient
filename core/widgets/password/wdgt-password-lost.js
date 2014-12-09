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
                $scope.info = {};
                $scope.formData = {
                    identifier: ''
                };

                /**
                 * validate cmForm
                 * @returns {*}
                 */
                $scope.validateForm = function () {
                    var deferred = $q.defer(),
                        objectData = {};

                    if($scope.cmForm.identifier.$modelValue != '')
                        objectData.identifier = $scope.cmForm.identifier.$modelValue;
                    else
                        $scope.info.empty = true;

                    if ($scope.cmForm.$valid !== false && cmUtil.objLen(objectData) > 0) {
                        deferred.resolve(objectData);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                /**
                 * Form Validation and Apicall to send password reset
                 */
                $scope.resetPassword = function () {
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
                                        identifier: ''
                                    };
                                    // everything is fine goTo login
                                    //$rootScope.goTo('/password/reset');
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
            }
        }
    }
]);
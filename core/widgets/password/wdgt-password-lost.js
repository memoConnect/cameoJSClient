'use strict';

angular.module('cmWidgets').directive('cmWidgetPasswordLost', [
    'cmAuth', 'cmLoader',
    '$rootScope', '$q',
    function (cmAuth, cmLoader,
              $rootScope, $q) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/password/wdgt-password-lost.html',

            controller: function ($scope) {
                var loader = new cmLoader($scope);

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

                    if ($scope.cmForm.$valid !== false) {
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

                    $scope.validateForm().then(
                        function(objectChange) {

                            console.log(objectChange)

                            cmAuth.sendPasswordLost(objectChange).then(
                                function(){
                                    loader.stop();
                                    // everything is fine goTo login
                                    $rootScope.goTo('/password/reset');
                                },
                                function(response){
                                    loader.stop();
                                    // TODO errorcodes

                                    switch(response.data.errorCode){
                                        case 'PASSWORD.RESET.LOGIN.NOT.FOUND':
                                        case 'PASSWORD_RESET_PHONENUMBER_NOT_FOUND':
                                        case 'PASSWORD_RESET_EMAIL_NOT_FOUND':
                                        case 'PASSWORD_RESET_NO_EMAIL_OR_PHONENUMBER':

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
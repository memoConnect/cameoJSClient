'use strict';

angular.module('cmWidgets').directive('cmWidgetPasswordReset', [
    'cmAuth', 'cmLoader', 'cmCrypt',
    '$rootScope', '$q',
    function (cmAuth, cmLoader, cmCrypt,
              $rootScope, $q) {
        return {
            restrict: 'E',
            scope: {
                resetId: '=cmData'
            },
            templateUrl: 'widgets/password/wdgt-password-reset.html',

            controller: function ($scope) {
                var loader = new cmLoader($scope);

                $scope.formData = {
                    resetCode: '',
                    password: ''
                };

                /**
                 * validate cmForm
                 * @returns {*}
                 */
                $scope.validateForm = function () {
                    var deferred = $q.defer(),
                        objectData = {};

                    function checkPassword(){
                        // check password
                        if ($scope.formData.password == ''
                            || $scope.formData.password == 'none'
                            || $scope.formData.password == undefined) {
                            $rootScope.$broadcast('cm-password:empty');
                        } else {
                            objectData.newPassword = $scope.formData.password;
                        }
                    }

                    checkPassword();

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
                        function(objectData) {

                            //$scope.resetId
                            cmAuth.resetPassword(objectData, $scope.formData.resetCode).then(
                                function(){
                                    loader.stop();
                                    // everything is fine goTo login
                                    $rootScope.goTo('/login');
                                },
                                function(){
                                    loader.stop();

                                    //PASSWORD.RESET.EXPIRED
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
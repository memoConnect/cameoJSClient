'use strict';

angular.module('cmWidgets').directive('cmWidgetPasswordReset', [
    'cmAuth', 'cmLoader',
    '$rootScope', '$q',
    function (cmAuth, cmLoader,
              $rootScope, $q) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/password/reset/wdgt-password-reset.html',

            controller: function ($scope) {
                var loader = new cmLoader($scope);

                $scope.formData = {
                    mixed: ''
                };

                /**
                 * validate cmForm
                 * @returns {*}
                 */
                $scope.validateForm = function () {
                    var deferred = $q.defer(),
                        objectData = {};

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
                            cmAuth.sendPasswordReset(objectChange).then(
                                function(){
                                    loader.stop();
                                    // everything is fine goTo login
                                    $rootScope.goTo('/login');
                                },
                                function(){
                                    loader.stop();
                                    // TODO errorcodes
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
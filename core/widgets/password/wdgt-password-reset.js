'use strict';

angular.module('cmWidgets').directive('cmWidgetPasswordReset', [
    'cmAuth', 'cmLoader', 'cmCrypt', 'cmUtil',
    '$rootScope', '$q',
    function (cmAuth, cmLoader, cmCrypt, cmUtil,
              $rootScope, $q) {
        return {
            restrict: 'E',
            scope: {
                resetId: '=cmData'
            },
            templateUrl: 'widgets/password/wdgt-password-reset.html',

            controller: function ($scope) {
                var loader = new cmLoader($scope);

                $scope.link = '<a href="#/password/lost">{{\'PASSWORD_RESET.LABEL.LINK_GOTO_PASSWORD_LOST\'|cmTranslate}}</a>';

                $scope.cmUtil = cmUtil;
                $scope.info = {};
                $scope.formData = {
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
                        function(objectData) {

                            //$scope.resetId
                            cmAuth.resetPassword(objectData, $scope.resetId).then(
                                function(){
                                    loader.stop();
                                    // everything is fine goTo login
                                    // autologin???
                                    $rootScope.goTo('/login');
                                },
                                function(response){
                                    loader.stop();
                                    switch(response.data.errorCode) {
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
            }
        }
    }
]);
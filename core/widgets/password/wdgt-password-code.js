'use strict';

angular.module('cmWidgets').directive('cmWidgetPasswordCode', [
    'cmAuth', 'cmLoader', 'cmUtil',
    '$rootScope', '$q',
    function (cmAuth, cmLoader, cmUtil,
              $rootScope, $q) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/password/wdgt-password-code.html',

            controller: function ($scope) {
                var loader = new cmLoader($scope);

                $scope.cmUtil = cmUtil;

                $scope.link = '<a href="#/password/lost">{{\'PASSWORD_RESET.LABEL.LINK_GOTO_PASSWORD_LOST\'|cmTranslate}}</a>';

                function reset(){
                    $scope.info = {};
                    $scope.formData = {
                        code: ''
                    };
                }

                reset();

                /**
                 * validate cmForm
                 * @returns {*}
                 */
                $scope.validateForm = function () {
                    var deferred = $q.defer(),
                        objectData = {};

                    if($scope.cmForm.code.$modelValue && $scope.cmForm.code.$modelValue != '')
                        objectData.code = $scope.cmForm.code.$modelValue;
                    else
                        $scope.info.emptyCode = true;

                    if(cmUtil.objLen(objectData) > 0) {
                        deferred.resolve(objectData);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.checkCode = function(){
                    if (loader.isIdle())
                        return false;

                    loader.start();

                    $scope.info = {};

                    $scope.validateForm().then(
                        function(objectChange) {

                            cmAuth.checkResetPassword(objectChange.code).then(
                                function(data){
                                    loader.stop();

                                    $rootScope.goTo('/password/reset/'+data.id);
                                },
                                function(response){
                                    loader.stop();
                                    switch(response.data.errorCodes[0]){
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

                $scope.cancel = function(){
                    $rootScope.goTo('/password/lost');
                };
            }
        }
    }
]);
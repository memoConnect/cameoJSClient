'use strict';

angular.module('cmSetup').directive('cmSetupCameoid', [
    'cmAuth', 'cmNotify', 'cmUserModel', 'cmLoader',
    '$location', '$q', '$rootScope',
    function(cmAuth, cmNotify, cmUserModel, cmLoader,
             $location, $q, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/setup/drtv-setup-cameoid.html',
            controller: function ($scope) {

                var loader = new cmLoader($scope);

                function reset() {
                    $scope.formData = {
                        cameoId: ''
                    };
                }

                reset();

                $scope.validateForm = function(){
                    var deferred = $q.defer(),
                        objectChange = {};

                    function checkCameoId() {
                        var value = $scope.formData.cameoId;
                        if (value && value != '') {
                            objectChange.cameoId = value;
                            objectChange.reservationSecret = $scope.reservationSecrets[objectChange.cameoId];
                        }
                    }

                    // check loginName aka cameoId
                    if ($scope.cmForm.cameoId.$valid == false) {
                        if($scope.cmForm.cameoId.$viewValue == undefined
                            || $scope.cmForm.cameoId.$viewValue.toString() == ''
                        ){
                            $rootScope.$broadcast('cm-login-name:invalid');
                        }
                    }

                    checkCameoId();

                    if($scope.cmForm.$valid !== false && Object.keys(objectChange).length > 0){
                        deferred.resolve(objectChange);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.addIdentity = function(){
                    if(loader.isIdle())
                        return false;

                    loader.start();

                    $scope.validateForm().then(
                        function(objectChange){
                            cmAuth.addIdentity(objectChange).then(
                                function(res){
                                    loader.stop();
                                    //cmUserModel.switchToIdentity(res.identity, res.token.token);
                                },
                                function(){
                                    loader.stop();
                                    cmNotify.warn('SETTINGS.PAGES.IDENTITY.CREATE.WARN.FAILED');
                                }
                            );
                            reset();
                        },
                        function(){
                            loader.stop();
                        }
                    )
                };
            }
        }
    }
]);
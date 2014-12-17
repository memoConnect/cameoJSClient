'use strict';

angular.module('cmSetup')
    .directive('cmSetupIdentity', [
        'cmUserModel', 'cmAuth', 'cmIdentityFactory', 'cmUtil', 'cmPristine', 'cmNotify', 'cmLoader', 'cmLogger', '$rootScope', '$q',
        function(cmUserModel, cmAuth, cmIdentityFactory, cmUtil, cmPristine, cmNotify, cmLoader, cmLogger, $rootScope, $q){
            return {
                restrict: 'E',
                templateUrl: 'comps/setup/drtv-setup-identity.html',
                controller: function($scope) {
                    var loader = new cmLoader($scope);

                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: 2048
                    };

                    $scope.identity = cmUserModel.data.identity;

                    /**
                     * Toogle HeadlineInfo
                     */
                    $scope.showHeadlineInfo = false;
                    $scope.toggleHeadlineInfo = function() {
                        $scope.showHeadlineInfo = !$scope.showHeadlineInfo ? true : false;
                    };
                    /**
                     * Toogle AvatarInfo
                     */
                    $scope.showAvatarInfo = false;
                    $scope.toggleAvatarInfo = function() {
                        $scope.showAvatarInfo = !$scope.showAvatarInfo ? true : false;
                    };
                    /**
                     * Toogle CameoIdInfo
                     */
                    $scope.showCameoIdInfo = false;
                    $scope.toggleCameoIdInfo = function() {
                        $scope.showCameoIdInfo = !$scope.showCameoIdInfo ? true : false;
                    };
                    /**
                     * Toogle DisplayNameInfo
                     */
                    $scope.showDisplayNameInfo = false;
                    $scope.toggleDisplayNameInfo = function() {
                        $scope.showDisplayNameInfo = !$scope.showDisplayNameInfo ? true : false;
                    };

                    function reset(){
                        $scope.formData = {
                            displayName: $scope.identity.displayName,
                            phoneNumber: $scope.identity.phoneNumber ? $scope.identity.phoneNumber.value : '',
                            email: $scope.identity.email ? $scope.identity.email.value : ''
                        };
                    }

                    reset();

                    $scope.validateDisplayName = function () {
                        if ($scope.formData.displayName == undefined
                            || $scope.formData.displayName.length == 0
                        ) {
                            $scope.cmForm.displayName.$pristine = true;
                            $scope.cmForm.displayName.$dirty = false;
                        }
                    };

                    $scope.validateForm = function () {
                        var deferred = $q.defer(),
                            objectChange = {};


                        function checkDisplayName() {
                            var value = $scope.formData.displayName;
                            if (value != undefined
                                && value != '') {
                                objectChange.displayName = value;
                            }
                        }

                        function checkPhoneNumber() {
                            var value = $scope.formData.phoneNumber;
                            if (value != undefined
                                && value != '') {
                                objectChange.phoneNumber = value;
                            }
                        }

                        function checkEmail() {
                            var value = $scope.formData.email;
                            if (value != undefined
                                && value != '') {
                                objectChange.email = value;
                            }
                        }

                        // check loginName aka cameoId
                        if ($scope.cmForm.cameoId.$valid == false) {
                            if ($scope.cmForm.cameoId.$viewValue == undefined
                                || $scope.cmForm.cameoId.$viewValue.toString() == ''
                            ) {
                                $rootScope.$broadcast('cm-login-name:invalid');
                            }
                        }

                        checkDisplayName();
                        checkPhoneNumber();
                        checkEmail();

                        if ($scope.cmForm.$valid !== false) {
                            deferred.resolve(objectChange);
                        } else {
                            deferred.reject();
                        }

                        return deferred.promise;
                    };

                    $scope.updateIdentity = function () {
                        if($scope.isPristine)
                            $scope.goTo('/settings/identity/key/create');

                        if (loader.isIdle())
                            return false;

                        loader.start();

                        $scope.validateForm().then(
                            function (objectChange) {
                                if(cmUtil.objLen(objectChange) > 0){
                                    cmUserModel.data.identity.one('update:finished',function(){
                                        $scope.goToNextStep();
                                    });

                                    cmUserModel.data.identity.update(objectChange);
                                } else {
                                    $scope.goToNextStep();
                                }
                            },
                            function () {
                                loader.stop();
                            }
                        )
                    };

                    $scope.goToNextStep = function(){
                        loader.stop();

                        cmNotify.trigger('bell:ring');
                        $rootScope.markQuickstart = true;

                        $rootScope.goTo('/settings/identity/key/create');
                    };

                    /**
                     * Pristine Service Handling
                     */
                    $scope.isPristine = true;
                    function pristine_callback(){
                        $scope.isPristine = cmPristine.is();
                    }
                    cmPristine.on('updated',pristine_callback);

                    $scope.$on('$destroy', function(){
                        cmPristine.off('updated',pristine_callback);
                    })
                }
            }
        }
    ]
);
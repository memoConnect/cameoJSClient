'use strict';

angular.module('cmUser').directive('cmIdentityEdit', [
    'cmUserModel', 'cmNotify', 'cmLoader', 'cmUtil', 
    '$q', '$rootScope',
    function(cmUserModel, cmNotify, cmLoader, cmUtil,
             $q, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/identity/drtv-identity-edit.html',
            controller: function ($scope) {

                var loader = new cmLoader($scope);

                $scope.identity = cmUserModel.data.identity;
                $scope.isPristine = true;
                $rootScope.$on('pristine:false', function(){
                    $scope.isPristine = false;
                });

                function reset(){
                    $scope.formData = {
                        displayName: $scope.identity.displayName,
                        phoneNumber: $scope.identity.phoneNumber ? $scope.identity.phoneNumber.value : '',
                        email: $scope.identity.email ? $scope.identity.email.value : ''
                    };
                }

                if(('identity' in cmUserModel.data)
                && !('on' in cmUserModel.data.identity)){
                    cmUserModel.on('update:finished', function(){
                        reset();
                        cmUserModel.data.identity.on('update:finished', reset);
                    });
                } else {
                    cmUserModel.data.identity.on('update:finished', reset);
                }

                reset();

                $scope.goToKeys = function(){
                    $scope.goTo('/settings/identity/key/list');
                };

                $scope.validateDisplayName = function(){
                    if($scope.formData.displayName == undefined || $scope.formData.displayName.length == 0){
                        $scope.cmForm.displayName.$pristine = true;
                        $scope.cmForm.displayName.$dirty = false;
                    }
                };

                $scope.validateForm = function(){
                    var deferred = $q.defer(),
                        objectChange = {};

                    function checkDisplayName() {
                        var value = $scope.formData.displayName;
                        if (value != $scope.identity.displayName) {
                            objectChange.displayName = value;
                        }
                    }

                    function checkPhoneNumber() {
                        var value = $scope.formData.phoneNumber;
                        if (value != undefined
                         && value != $scope.identity.phoneNumber.value) {
                            objectChange.phoneNumber = value;
                        }
                    }

                    function checkEmail() {
                        var value = $scope.formData.email;
                        if (value != undefined
                            && value != $scope.identity.email.value) {
                            objectChange.email = value;
                        }
                    }

                    checkDisplayName();
                    checkPhoneNumber();
                    checkEmail();

                    if($scope.cmForm.$valid !== false && Object.keys(objectChange).length > 0){
                        deferred.resolve(objectChange);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.saveIdentity = function(){
                    if($scope.isPristine)
                        $scope.goTo('/settings/identity/list');

                    if(loader.isIdle())
                        return false;

                    loader.start();

                    $scope.validateForm()
                    .then(
                        function(objectChange){
                            cmUserModel.data.identity.update(objectChange);
                            cmUserModel.data.identity.one('update:finished',function(){
                                loader.stop();
                                $scope.isPristine = true;
                                reset();
                            });
                        },
                        function(){
                            loader.stop();
                            cmUtil.scrollToInputError()
                        }
                    )
                };
            }
        }
    }
]);
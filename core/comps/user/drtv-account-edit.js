'use strict';

angular.module('cmUser')
.directive('cmAccountEdit', [
    'cmUserModel', 'cmNotify', 'cmCrypt', 'cmLoader',
    '$q', '$rootScope',
    function(cmUserModel, cmNotify, cmCrypt, cmLoader,
             $q, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-account-edit.html',
            controller: function ($scope) {
                var loader = new cmLoader($scope);

                $scope.account = cmUserModel.data.account;

                $scope.showPasswordChange = false;
                $scope.showReadOnly = false;
                $scope.isPristine = true;
                $rootScope.$on('pristine:false', function(){
                    $scope.isPristine = false;
                });

                $scope.togglePasswordChange = function(action){
                    $scope.showPasswordChange = action && action == 'close' || $scope.showPasswordChange ? false : true;
                    if(!$scope.showPasswordChange){
                        $scope.formData.oldPassword = '';
                        $scope.formData.password = '';
                        $rootScope.$broadcast('cm-password:reset');
                    }
                };

                $scope.toggleReadOnly = function(){
                    $scope.showReadOnly = true;
                };

                function reset(){
                    $scope.formData = {
                        phoneNumber: $scope.account.phoneNumber ? $scope.account.phoneNumber.value : '',
                        email: $scope.account.email ? $scope.account.email.value : '',
                        oldPassword: '',
                        password: ''
                    }
                }

                cmUserModel.on('account:updated', reset);

                reset();

                $scope.validateForm = function(){
                    var deferred = $q.defer(),
                        objectChange = {};

                    function checkPhoneNumber() {
                        var defValue = $scope.account.phoneNumber,
                            value = $scope.formData.phoneNumber;
                        if (value != undefined
                         && (!defValue || (defValue && value != defValue.value))) {
                            objectChange.phoneNumber = value;
                        }
                    }

                    function checkEmail() {
                        var defValue = $scope.account.email,
                            value = $scope.formData.email;
                        if (value != undefined
                        && (!defValue || (defValue && value != defValue.value))) {
                            objectChange.email = value;
                        }
                    }

                    function checkPassword(){
                        if(!$scope.showPasswordChange)
                            return false;

                        // check password
                        if ($scope.formData.oldPassword != ''
                            && $scope.formData.oldPassword!= 'none'
                            && $scope.formData.oldPassword != undefined) {
                            objectChange.oldPassword = cmCrypt.hash($scope.formData.oldPassword);
                            $scope.cmForm.oldPassword.$setValidity('empty', true);
                            $scope.cmForm.oldPassword.$setValidity('invalid', true);
                        }

                        if ($scope.formData.password == ''
                            || $scope.formData.password == 'none'
                            || $scope.formData.password == undefined) {
                            $rootScope.$broadcast('cm-password:empty');
                        } else {
                            objectChange.password = $scope.formData.password;
                        }
                    }

                    checkPhoneNumber();
                    checkEmail();
                    checkPassword();

                    console.log(objectChange)

                    if($scope.cmForm.$valid !== false && Object.keys(objectChange).length > 0){
                        deferred.resolve(objectChange);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.saveAccount = function(){
                    if($scope.isPristine)
                        $scope.goTo('/settings');

                    if(loader.isIdle())
                        return false;

                    loader.start();

                    $scope.validateForm().then(
                        function(objectChange){

                            cmUserModel.updateAccount(objectChange)
                            .then(
                                function(){
                                    loader.stop();
                                    $scope.isPristine = true;
                                    $scope.togglePasswordChange('close');
                                },
                                function(result){

                                    switch(result.data.error){
                                        case 'old password required':
                                            $scope.cmForm.oldPassword.$setValidity('empty', false);
                                        break;
                                        case 'invalid old password':
                                            $scope.cmForm.oldPassword.$setValidity('invalid', false);
                                        break;
                                    }

                                    loader.stop();
                                }
                            );

                        }, function(){
                            loader.stop();
                        }
                    )
                };
            }
        }
    }
]);
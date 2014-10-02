'use strict';

angular.module('cmUser')
.directive('cmAccountEdit', [
    'cmUserModel', 'cmNotify', 'cmCrypt',
    '$q', '$rootScope',
    function(cmUserModel, cmNotify, cmCrypt,
             $q, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-account-edit.html',
            controller: function ($scope) {

                $scope.showSpinner = false;
                $scope.showPasswordChange = false;
                $scope.showReadOnly = false;
                $scope.isPristine = true;

                $scope.spinner = function(action){
                    if(action == 'isIdle'){
                        return $scope.showSpinner;
                    }
                    $scope.showSpinner = action == 'stop' ? false : true;
                };

                $scope.togglePasswordChange = function(action){
                    $scope.showPasswordChange = action && action == 'close' || $scope.showPasswordChange ? false : true;
                    if(!$scope.showPasswordChange){
                        $scope.account.oldPassword = '';
                        $rootScope.$broadcast('cm-password:reset');
                    }
                };

                $scope.toggleReadOnly = function(){
                    $scope.showReadOnly = true;
                };

                $rootScope.$on('pristine:false', function(){
                    $scope.isPristine = false;
                });

                function reset(){
                    // TODO: exportData account
                    $scope.account = angular.extend({},cmUserModel.data.account);
                    $scope.account.phoneNumbers = [
                        $scope.account.phoneNumber || {value:''}
                    ];
                    $scope.account.emails = [
                        $scope.account.email || {value:''}
                    ];
                    $scope.account.oldPassword = '';
                    $scope.account.password = '';
                }

                cmUserModel.on('account:updated', reset);

                reset();

                $scope.validateForm = function(){
                    var deferred = $q.defer(),
                        objectChange = {};

                    function checkEmail() {
                        if ($scope.account.emails.length > 0
                            && $scope.account.emails[0].value != undefined
                            && $scope.account.emails[0].value != ''
                            && $scope.account.emails[0].value != cmUserModel.data.account.email) {
                            objectChange.email = $scope.account.emails[0].value;
                        }
                    }

                    function checkPhoneNumber() {
                        if ($scope.account.phoneNumbers.length > 0
                            && $scope.account.phoneNumbers[0].value != undefined
                            && $scope.account.phoneNumbers[0].value != ''
                            && $scope.account.phoneNumbers[0].value != cmUserModel.data.account.phoneNumber) {
                            objectChange.phoneNumber = $scope.account.phoneNumbers[0].value;
                        }
                    }

                    function checkPassword(){
                        if(!$scope.showPasswordChange)
                            return false;

                        // check password
                        if ($scope.account.oldPassword != ''
                            && $scope.account.oldPassword!= 'none'
                            && $scope.account.oldPassword != undefined) {
                            objectChange.oldPassword = cmCrypt.hash($scope.account.oldPassword);
                            $scope.cmForm.oldPassword.$setValidity('empty', true);
                            $scope.cmForm.oldPassword.$setValidity('invalid', true);
                        }

                        if ($scope.account.password == ''
                            || $scope.account.password == 'none'
                            || $scope.account.password == undefined) {
                            $rootScope.$broadcast('cm-password:empty');
                        } else {
                            objectChange.password = $scope.account.password;
                        }
                    }

                    checkEmail();
                    checkPhoneNumber();
                    checkPassword();

                    if($scope.cmForm.$valid !== false){
                        deferred.resolve(objectChange);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.saveAccount = function(){
                    if($scope.isPristine)
                        $scope.goBack();

                    if($scope.spinner('isIdle'))
                        return false;

                    $scope.spinner('start');

                    $scope.validateForm().then(
                        function(objectChange){
                            cmUserModel.updateAccount(objectChange)
                            .then(
                                function(){
                                    $scope.spinner('stop');
                                    $scope.isPristine = true;
                                    $scope.passwordChange('close');
                                },
                                function(result){

                                    switch(result.data.error){
                                        case "old password required":
                                            $scope.cmForm.oldPassword.$setValidity('empty', false);
                                        break;
                                        case "invalid old password":
                                            $scope.cmForm.oldPassword.$setValidity('invalid', false);
                                        break;
                                    }

                                    $scope.spinner('stop');
                                }
                            );

                        }, function(){
                            $scope.spinner('stop');
                        }
                    )
                };
            }
        }
    }
]);
'use strict';

angular.module('cmSetup')
    .directive('cmSetupAccount', [
        'cmUserModel','cmUtil','cmLoader','cmLogger', '$rootScope', '$q',
        function(cmUserModel, cmUtil, cmLoader, cmLogger, $rootScope, $q){
            return {
                restrict: 'E',
                templateUrl: 'comps/setup/drtv-account.html',
                controller: function($scope){
                    var loader = new cmLoader($scope);

                    $scope.account = cmUserModel.data.account;

                    $scope.isPristine = true;
                    $rootScope.$on('pristine:false', function(){
                        $scope.isPristine = false;
                    });

                    $scope.formData = {
                        phoneNumber: '',
                        email: ''
                    };

                    $scope.validateForm = function(){
                        var deferred = $q.defer(),
                            objectChange = {};

                        function checkPhoneNumber() {
                            var value = $scope.formData.phoneNumber;

                            if (value != undefined) {
                                objectChange.phoneNumber = value;
                            }
                        }

                        function checkEmail() {
                            var value = $scope.formData.email;
                            if (value != undefined) {
                                objectChange.email = value;
                            }
                        }

                        checkPhoneNumber();
                        checkEmail();

                        if($scope.cmForm.$valid !== false && cmUtil.objLen(objectChange) > 0){
                            deferred.resolve(objectChange);
                        } else {
                            deferred.reject();
                        }

                        return deferred.promise;
                    };

                    $scope.save = function(){
                        if($scope.isPristine)
                            $scope.goToNextStep();

                        if(loader.isIdle())
                            return false;

                        loader.start();

                        $scope.validateForm().then(
                            function(objectChange){
                                cmUserModel.updateAccount(objectChange).then(
                                    function(){
                                        $rootScope.goTo('/setup/identity');
                                        loader.stop();
                                    },
                                    function(){
                                        loader.stop();
                                    }
                                );
                            },
                            function(){
                                loader.stop();
                                cmUtil.scrollToInputError();
                            }
                        );
                    };

                    $scope.goToNextStep = function(){
                        $rootScope.goTo('/setup/identity');
                    };
                }
            }
        }
    ]
);
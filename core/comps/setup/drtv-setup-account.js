'use strict';

angular.module('cmSetup')
.directive('cmSetupAccount', [
    'cmUserModel','cmUtil','cmLoader','cmLogger', 'cmPristine',
    '$rootScope', '$q',
    function(cmUserModel, cmUtil, cmLoader, cmLogger, cmPristine,
             $rootScope, $q){
        return {
            restrict: 'E',
            templateUrl: 'comps/setup/drtv-setup-account.html',
            controller: function($scope){
                var loader = new cmLoader($scope);

                $scope.account = cmUserModel.data.account;
                $scope.saveError = false;

                /**
                 * Toogle HeadlineInfo
                 */
                $scope.showHeadlineInfo = false;
                $scope.toggleHeadlineInfo = function() {
                    $scope.showHeadlineInfo = !$scope.showHeadlineInfo ? true : false;
                };

                $scope.formData = {
                    phoneNumber: '',
                    mergedPhoneNumber: '',
                    email: ''
                };

                $scope.validateForm = function(){
                    var deferred = $q.defer(),
                        objectChange = {};

                    function checkPhoneNumber() {
                        var value = $scope.formData.mergedPhoneNumber;

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

                $scope.saveAccount = function(){
                    $scope.saveError = false;

                    if($scope.isPristine){
                        $scope.goToNextStep();
                        return false;
                    }

                    if(loader.isIdle())
                        return false;

                    loader.start();

                    $scope.validateForm().then(
                        function(objectChange){
                            cmUserModel.updateAccount(objectChange).then(
                                function(){
                                    $scope.goToNextStep();
                                    loader.stop();
                                },
                                function(res){
                                    loader.stop();

                                    if(!'errorCodes' in res.data){
                                        $scope.saveError = true;
                                    }
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

                /**
                 * Pristine Service Handling
                 */
                cmPristine.initView($scope);
            }
        }
    }
]);
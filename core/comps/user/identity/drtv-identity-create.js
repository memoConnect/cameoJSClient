'use strict';

angular.module('cmUser').directive('cmIdentityCreate', [
    'cmAuth', 'cmNotify', 'cmUserModel', 'cmLoader',
    '$location', '$q', '$rootScope',
    function(cmAuth, cmNotify, cmUserModel, cmLoader,
             $location, $q, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/identity/drtv-identity-create.html',
            controller: function ($scope) {

                var loader = new cmLoader($scope);

                function reset() {
                    $scope.formData = {
                        cameoId: '',
                        email: '',
                        phoneNumber: '',
                        mergedPhoneNumber: '',
                        displayName: ''
                    };
                }

                reset();

                $scope.validateDisplayName = function(){
                    if($scope.formData.displayName == undefined
                    || $scope.formData.displayName.length == 0
                    ){
                        $scope.cmForm.displayName.$pristine = true;
                        $scope.cmForm.displayName.$dirty = false;
                    }
                };

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

                    function checkDisplayName() {
                        var value = $scope.formData.displayName;
                        if (value != undefined
                         && value != '') {
                            objectChange.displayName = value;
                        }
                    }

                    function checkPhoneNumber() {
                        var value = $scope.formData.mergedPhoneNumber;
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
                        if($scope.cmForm.cameoId.$viewValue == undefined
                        || $scope.cmForm.cameoId.$viewValue.toString() == ''
                        ){
                            $rootScope.$broadcast('cm-login-name:invalid');
                        }
                    }

                    checkCameoId();
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

                $scope.addIdentity = function(){
                    if(loader.isIdle())
                        return false;

                    loader.start();

                    $scope.validateForm().then(
                        function(objectChange){
                            cmAuth.addIdentity(objectChange).then(
                                function(res){
                                    loader.stop();
                                    cmUserModel.switchToIdentity(res.identity, res.token.token);
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
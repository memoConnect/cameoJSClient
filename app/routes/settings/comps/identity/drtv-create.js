'use strict';

angular.module('cmRouteSettings').directive('cmIdentityCreate', [
    'cmAuth', 'cmNotify',
    '$location', '$q', '$rootScope',
    function(cmAuth, cmNotify,
             $location, $q, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/identity/drtv-create.html',
            controller: function ($scope) {

                $scope.formData = {
                    cameoId: '',
                    password: '',
                    email: '',
                    phone: '',
                    displayName: ''
                };

                //////////////////////
                // TODO: mock workarround json in array
                $scope.formData.phoneNumbers = [
                    {value:''}
                ];
                $scope.formData.emails = [
                    {value:''}
                ];
                //////////////////////

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
                        data = {};

                    function checkCameoId() {
                        if ($scope.formData.cameoId && $scope.formData.cameoId != '') {
                            data.cameoId = $scope.formData.cameoId;
                            data.reservationSecret = $scope.reservationSecrets[data.cameoId];
                        }
                    }

                    function checkDisplayName() {
                        if ($scope.formData.displayName && $scope.formData.displayName != '') {
                            data.displayName = $scope.formData.displayName;
                        }
                    }

                    function checkEmail() {
                        if ($scope.formData.emails.length > 0
                            && $scope.formData.emails[0].value != undefined
                            && $scope.formData.emails[0].value != ''
                            ) {
                            data.email = $scope.formData.emails[0].value;
                        }
                    }

                    function checkPhoneNumber() {
                        if ($scope.formData.phoneNumbers.length > 0
                            && $scope.formData.phoneNumbers[0].value != undefined
                            && $scope.formData.phoneNumbers[0].value != ''
                            ) {
                            data.phoneNumber = $scope.formData.phoneNumbers[0].value;
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
                    checkEmail();
                    checkPhoneNumber();

                    if($scope.cmForm.$valid !== false){
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                // save
                $scope.addIdentity = function(){
                    $scope.validateForm().then(
                        function(data){
                            cmAuth.addIdentity(data).then(
                                function(){
                                    cmNotify.info('SETTINGS.PAGES.IDENTITY.CREATE.INFO.SUCCES',{displayType:'modal'})
                                    // TODO: logout and set new token!!!
                                    //cmUserModel.switchToIdentity(identity);
                                },
                                function(){
                                    cmNotify.warn('SETTINGS.PAGES.IDENTITY.CREATE.WARN.FAILED')
                                }
                            );
                        }
                    )
                };
            }
        }
    }
]);
'use strict';

angular.module('cmRouteSettings').directive('cmIdentityCreate', [
    'cmUserModel', 'cmNotify',
    '$location', '$q',
    function(cmUserModel, cmNotify,
             $location, $q){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/identity/drtv-create.html',
            controller: function ($scope) {

                $scope.formData = {
                    loginName: '',
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

                $scope.invalidLoginName = function(){
                    return $scope.registrationForm.loginName.$dirty
                        && $scope.registrationForm.loginName.$invalid
                        && $scope.registrationForm.loginName.$error.minlength;
                };

                $scope.validateDisplayName = function(){
                    if($scope.identity.displayName == undefined
                    || $scope.identity.displayName.length == 0
                    ){
                        $scope.cmForm.displayName.$pristine = true;
                        $scope.cmForm.displayName.$dirty = false;
                    }
                };

                $scope.validateForm = function(){
                    var deferred = $q.defer();

                    if($scope.cmForm.$valid !== false){
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                // save
                $scope.addIdentity = function(){
                    var objectChange = {};

                    $scope.validateForm().then(
                        function(){
                            function checkDisplayName() {
                                if ($scope.identity.displayName != cmUserModel.data.identity.displayName) {
                                    objectChange.displayName = $scope.identity.displayName;
                                }
                            }

                            function checkEmail() {
                                if ($scope.identity.emails.length > 0 && $scope.identity.emails[0].value != undefined && $scope.identity.emails[0].value != '' && $scope.identity.emails[0].value != cmUserModel.data.identity.email) {
                                    objectChange.email = $scope.identity.emails[0].value;
                                }
                            }

                            function checkPhoneNumber() {
                                if ($scope.identity.phoneNumbers.length > 0 && $scope.identity.phoneNumbers[0].value != undefined && $scope.identity.phoneNumbers[0].value != '' && $scope.identity.phoneNumbers[0].value != cmUserModel.data.identity.phoneNumber) {
                                    objectChange.phoneNumber = $scope.identity.phoneNumbers[0].value;
                                }
                            }

                            checkDisplayName();
                            checkEmail();
                            checkPhoneNumber();

                            /*
                             {
                             "cameoId": "reserved cameoId",
                             "reservationSecret": "secret",
                             "phoneNumber": "optional",
                             "email": "optional",
                             "displayName": "optional"
                             }
                            */

                            console.log(objectChange)
                            return false;

                            cmUserModel.data.identity.update(objectChange);


                            function callback_save_identity(){
                                cmNotify.info('IDENTITY.NOTIFY.UPDATE.SUCCESS',{ttl:3000,displayType:'modal'});
                            }

                            cmUserModel.data.identity.one('update:finished',callback_save_identity);
                        }
                    )
                };
            }
        }
    }
]);
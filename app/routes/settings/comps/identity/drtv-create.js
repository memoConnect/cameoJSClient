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
                    var data = {};

                    $scope.validateForm().then(
                        function(){
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

                            checkCameoId();
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

                            console.log(data)
                            return false;

//                            cmUserModel.data.identity.update(objectChange);
//
//
//                            function callback_save_identity(){
//                                cmNotify.info('IDENTITY.NOTIFY.UPDATE.SUCCESS',{ttl:3000,displayType:'modal'});
//                            }
//
//                            cmUserModel.data.identity.one('update:finished',callback_save_identity);
                        }
                    )
                };
            }
        }
    }
]);
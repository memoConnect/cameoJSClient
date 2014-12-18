'use strict';

angular.module('cmValidate').directive('cmCameoId',[
    'cmAuth', 'cmUserModel',
    '$q', '$rootScope',
    function (cmAuth, cmUserModel,
              $q, $rootScope){
        return {
            restrict: 'E',
            require: 'ngModel',
            templateUrl: 'comps/validate/drtv-cameo-id.html',
            scope: {
                cameoId: '=ngModel',
                formName: '@formName',
                tabindex: '@cmTabindex',
                placeholder: '@placeholder'
            },
            controller: function($scope){

                $scope.min = 3;
                $scope.max = 20;

                $scope.parentForm = $scope.$parent[$scope.formName];

                $scope.$parent.reservationSecrets = $scope.$parent.reservationSecrets || {};

                $scope.userNameAlternatives = [];
                $scope.showUserNameAlternatives = false;
                $scope.pendingAccountCheck = $q.when(true);

                function checkLength(value){
                    if(value.length < $scope.min || value.length > $scope.max){

                        if(value.length < $scope.min){
                            $scope.errors.tooshort = true;
                        }

                        if(value.length > $scope.max){
                            $scope.errors.toolong = true;
                        }

                        return false
                    }

                    return true;
                }

                function checkValue(value){
                    if(value == undefined || value == '' || !checkLength(value)){
                        $scope.parentForm.cameoId.$valid = false;
                        return false;
                    }

                    return true;
                }

                function setDefault(){
                    $scope.errors = {
                        toolong: false,
                        tooshort: false,
                        exists: false,
                        empty: false,
                        invalid: false
                    };
                }

                setDefault();

                function checkAccountName(newValue){
                    var deferred = $q.defer();

                    if(!checkValue(newValue)){
                        if($scope.parentForm.cameoId.$invalid && $scope.parentForm.cameoId.$dirty)
                            $scope.errors.empty = true;

                        deferred.reject();
                        return deferred.promise;
                    }

                    // if input is'nt empty && is valid && reservation secret is'nt exists
                    if(!(newValue in $scope.$parent.reservationSecrets)) {

                        // check cameoId#

                        /**
                         * @TODO !!!
                         */
                        var auth = undefined;
                        if(!cmUserModel.getToken()){
                            auth = cmUserModel.data.account.basicAuth;
                        }

                        $scope.pendingAccountCheck = cmAuth.checkAccountName(newValue, auth).then(
                            // valid case
                            function (data) {
                                // reservation secret to parent scope
                                $scope.$parent.reservationSecrets[newValue] = data.reservationSecret;

                                $scope.parentForm.cameoId.$valid = true;
                                deferred.resolve();
                            },
                            // invalid or exists
                            function (response) {
                                if (typeof response == "object") {
                                    // invalid case
                                    if (typeof response.data !== 'undefined'
                                        && typeof response.data.error !== 'undefined'
                                        && response.data.error.search('invalid') != -1
                                    ) {
                                        $scope.errors.invalid = true;
                                    }
                                    // show alternatives
                                    if (typeof response.alternative !== 'undefined') {
                                        $scope.errors.exists = true;
                                        /**
                                         * @TODO
                                         * show alternatives
                                         */
                                        $scope.userNameAlternatives = response.alternative;
                                        $scope.showUserNameAlternatives = true;
                                    }
                                }

                                $scope.parentForm.cameoId.$valid = false;
                                deferred.reject();
                            }
                        );
                    } else {
                        $scope.parentForm.cameoId.$valid = true;
                        deferred.resolve();
                    }

                    return deferred.promise;
                }

                $rootScope.$on('cm-login-name:invalid', function(){
                    $scope.parentForm.cameoId.$invalid = true;
                    $scope.parentForm.cameoId.$dirty = true;

                    if(!checkValue($scope.parentForm.cameoId.$viewValue))
                        $scope.errors.empty = true;

                });

                $scope.hasReservationSecret = function(){
                    return $scope.cameoId in $scope.$parent.reservationSecrets;
                };

                $scope.hasError = function(){
                    if($scope.errors.exists
                    || $scope.errors.empty
                    || $scope.errors.invalid
                    || $scope.errors.tooshort
                    || $scope.errors.toolong
                    || ($scope.parentForm.cameoId.$invalid && $scope.parentForm.cameoId.$dirty)
                    ){
                        return true;
                    }
                    return false;
                };

                $scope.$watch('cameoId',function (newValue) {
                    setDefault();

                    checkAccountName(newValue);
                });

                $rootScope.$on('registration:checkAccountName', function(){
                    setDefault();

                    $scope.$parent.reservationSecrets = {};

                    checkAccountName($scope.cameoId).then(
                        function(){
                            $rootScope.$emit('registration:createUser');
                        }, function(){
                            //console.log('check account again fail')
                        }

                    );
                });
            }
        }
    }
]);
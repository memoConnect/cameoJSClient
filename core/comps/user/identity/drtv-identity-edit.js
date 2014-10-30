'use strict';

angular.module('cmUser').directive('cmIdentityEdit', [
    'cmUserModel', 'cmNotify', 'cmLoader',
    '$q',
    function(cmUserModel, cmNotify, cmLoader,
             $q){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/identity/drtv-identity-edit.html',
            controller: function ($scope) {

                var loader = new cmLoader($scope);

                function reset(){
                    $scope.identity = angular.extend({},cmUserModel.data.identity);
                    $scope.identity.phoneNumbers = [
                        $scope.identity.phoneNumber || {value:''}
                    ];
                    $scope.identity.emails = [
                        $scope.identity.email || {value:''}
                    ];
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
                    if($scope.identity.displayName == undefined || $scope.identity.displayName.length == 0){
                        $scope.cmForm.displayName.$pristine = true;
                        $scope.cmForm.displayName.$dirty = false;
                    }
                };

                $scope.validateForm = function(){
                    var deferred = $q.defer(),
                        objectChange = {};

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

                    if($scope.cmForm.$valid !== false){
                        deferred.resolve(objectChange);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                $scope.saveIdentity = function(){
                    if(loader.isIdle())
                        return false;

                    loader.start();

                    $scope.validateForm()
                    .then(
                        function(objectChange){
                            cmUserModel.data.identity.update(objectChange);
                            cmUserModel.data.identity.one('update:finished',function(){
                                loader.stop();
                                cmNotify.info('IDENTITY.NOTIFY.UPDATE.SUCCESS',{ttl:3000,displayType:'modal'});
                            });
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
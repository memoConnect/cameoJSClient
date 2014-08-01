'use strict';

angular.module('cmUser').directive('cmKeyResponse',[
    'cmAuth', 'cmUserModel', '$rootScope',
    function (cmAuth, cmUserModel, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-key-response.html',
            controller: function($scope){
                $scope.spinner = false;

                $scope.startResponse = function(){
                    $scope.showSpinner();

                    var localKeys = cmUserModel.loadLocalKeys();

                    cmAuth.sendBroadcast({
                        name: "authenticationRequest:key-response",
                        data: {
                            toKeyId: localKeys[0].id,
                            toKeyFingerprint: localKeys[0].getFingerprint()
                        }
                    });

                };

                $scope.showSpinner = function(){
                    $scope.spinner = true;
                };

                $scope.hideSpinner = function(){
                    $scope.spinner = false;
                };

                function closeModal(){
                    $rootScope.closeModal('key-response');
                }
            }
        }
    }
]);
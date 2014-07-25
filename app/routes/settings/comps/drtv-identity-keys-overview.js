'use strict';

angular.module('cmRouteSettings').directive('cmIdentityKeysOverview', [
    'cmUserModel', 'cmModal', 'cmKey',
    function(cmUserModel, cmModal, cmKey){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-keys-overview.html',
            controller: function ($scope) {

                function refresh(){
                    console.log('pling')
                    $scope.privateKeys  =   cmUserModel.loadLocalKeys() || [];
                    $scope.publicKeys   =   cmUserModel.data.identity.keys || [];
                    $scope.trustedKeys  =   $scope.publicKeys.filter(function(key){
                                                return cmUserModel.trustsKey(key)
                                            })
                    $scope.signing      = cmUserModel.state.is('signing')
                }

                $scope.remove = function(key){
                    cmUserModel.removeKey(key);
                    cmModal.closeAll();
                };

                $scope.isTrustedKey = function(key){
                    return $scope.trustedKeys.indexOf(key) != -1
                }

                $scope.sortByPrivKeys = function(key) {
                    return !($scope.privateKeys.find(key) instanceof cmKey);
                };

                $scope.$on('$destroy', function(){
                    cmUserModel.off('key:stored signature:saved', refresh)

                })

                cmUserModel.state.on('change', function(event, data){
                    console.log('asfd')
                })

                cmUserModel.on('key:stored', refresh);

                refresh()
            }
        }
    }
]);
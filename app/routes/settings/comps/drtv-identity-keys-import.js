'use strict';

angular.module('cmRouteSettings')
.directive('cmIdentityKeysImport', [
    'cmCrypt',
    'cmKey',
    function(cmCrypt, cmKey){
        return {
            restrict: 'E',
            templateUrl: 'routes/settings/comps/drtv-identity-keys-import.html',
            controller: function ($scope) {

                $scope.import = function(){
                    console.log($scope.importPrivKey)
                    var key = new cmKey($scope.importPrivKey);

                    console.log(key.getPrivateKey())
                    console.log(key.getPublicKey())
                    console.log(key.getSize())
                }
            }
        }
    }
]);
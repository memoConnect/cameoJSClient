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


                    var key = cmKey

                }

            }
        }
    }
]);
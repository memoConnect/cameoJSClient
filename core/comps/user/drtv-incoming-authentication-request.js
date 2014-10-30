'use strict';

angular.module('cmUser').directive('cmIncomingAuthenticationRequest',[

    'cmUserModel',
    'cmIdentityFactory',
    '$timeout',
    '$document',
    
    function (cmUserModel, cmIdentityFactory, $timeout, $document){
        return {
            restrict:       'E',
            scope:          false,
            templateUrl:    'comps/user/drtv-incoming-authentication-request.html',

            controller: function($scope){

                
                function setErrorsToDefault(){
                    $scope.error = {
                        "emptyInput": false,
                        "wrongSecret": false
                    };
                }

                function refresh(){
                    $scope.is3rdParty    =   $scope.request.fromIdentityId != cmUserModel.data.identity.id,
                    $scope.fromIdentity  =   cmIdentityFactory.find($scope.request.fromIdentityId),
                    $scope.fromKey       =   $scope.fromIdentity.keys.find($scope.request.fromKeyId)

                    $scope.modalMessageVars = {
                        cameoKey: $scope.fromKey.name,
                        identity: $scope.fromIdentity.getDisplayName()
                    };

                    setErrorsToDefault();

                    $scope.transactSecret = '';

                    $timeout(function(){
                        var input = $document[0].querySelector('#inp-transactSecret');
                        input.focus();
                    }, 50);
                }


                $scope.$watch('request', refresh)

            }
        }
    }
]);
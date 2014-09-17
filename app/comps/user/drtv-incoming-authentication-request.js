'use strict';

angular.module('cmUser').directive('cmIncomingAuthenticationRequest',[

    '$timeout',
    '$document',
    
    function ($timeout, $document){
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

                setErrorsToDefault();

                $scope.modalMessageVars = {
                    cameoKey: $scope.fromKey.name,
                    identity: $scope.fromIdentity.getDisplayName()
                };


                $scope.transactSecret = '';

                $timeout(function(){
                    var input = $document[0].querySelector('#inp-transactSecret');
                    input.focus();
                }, 50);

            }
        }
    }
]);
'use strict';

angular.module('cmUser').directive('cmIncomingAuthenticationRequest',[

    'cmUserModel',
    'cmIdentityFactory',
    'cmLoader',
    '$timeout',
    '$document',
    
    function (cmUserModel, cmIdentityFactory, cmLoader, $timeout, $document){
        return {
            restrict:       'E',
            scope:          false,
            templateUrl:    'comps/user/drtv-incoming-authentication-request.html',
            link: function(scope){
                var loader  = new cmLoader(scope),
                    btns    = $document[0].querySelectorAll('footer button');

                scope.startLoader = function(){
                    loader.start();

                    angular.forEach(btns,
                        function(button){
                            var e = angular.element(button);
                            if(e.hasClass('with-loader')){
                                e.removeClass('cm-hide');
                            } else {
                                e.addClass('cm-hide');
                            }
                        }
                    );
                };

                scope.stopLoader = function(){
                    angular.forEach(btns,
                        function(button){
                            var e = angular.element(button);
                            if(e.hasClass('with-loader')){
                                e.addClass('cm-hide');
                            } else {
                                e.removeClass('cm-hide');
                            }
                        }
                    );

                    loader.stop();
                };
            },
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
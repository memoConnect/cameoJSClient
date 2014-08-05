define([
    'app',
    'ngload!pckCore',
    'ngload!pckUi',
    'ngload!pckUser',
    'ngload!pckValidate',
    'ngload!pckRouteSettings'
], function (app) {
    'use strict';

    app.register.controller('StartCtrl', [
        'cmUserModel', 'cmUtil',
        '$scope', '$rootScope', '$routeParams', '$location',
        function(cmUserModel, cmUtil, $scope, $rootScope, $routeParams, $location) {
            $scope.showWelcome = false;
            $scope.skipStart = false;

            /**
             * Welcome modal shown for new user
             */
            if(cmUserModel.comesFromRegistration !== false){
                cmUserModel.comesFromRegistration = false;

                $scope.showWelcome = true;
            }


            $scope.setSkipStart = function(){
                if(!$scope.skipStart){
                    $scope.skipStart = true;
                } else {
                    $scope.skipStart= false;
                }
            }
        }
    ]);
});
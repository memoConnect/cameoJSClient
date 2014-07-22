'use strict';

angular.module('cmUser').directive('cmNewAuthenticationRequest',[
    'cmUserModel', 'cmTranslate', 'cmKey', 'cmCrypt', 'cmAuth',
    function (cmUserModel, cmTranslate, cmKey, cmCrypt, cmAuth){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-new-authentication-request.html',
            controller: function($scope,$element,$attrs){
                console.log($scope.data)
            }
        }
    }
]);
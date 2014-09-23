'use strict';

angular.module('cmUser').directive('cmIdentityTag', [
    // no dependencies
    function(){
        return {
            restrict: 'E',
            scope: {
                identity: "=cmData"
            },
            templateUrl: 'comps/user/identity/drtv-identity-tag.html',
            controller: function ($scope) {

            }
        }
    }
]);
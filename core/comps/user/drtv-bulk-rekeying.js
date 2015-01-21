'use strict';

angular.module('cmUser').directive('cmBulkRekeyingRequest',[
    'cmLoader',
    function (cmLoader){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-bulk-rekeying.html',
            controller: function($scope){
                var loader = new cmLoader($scope);

                loader.start();
            }
        }
    }
]);
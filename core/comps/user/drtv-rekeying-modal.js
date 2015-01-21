'use strict';

angular.module('cmUser').directive('cmReKeyingModal',[
    'cmLoader',
    function (cmLoader){
        return {
            restrict: 'E',
            templateUrl: 'comps/user/drtv-rekeying-modal.html',
            controller: function($scope){
                var loader = new cmLoader($scope);

                loader.start();
            }
        }
    }
]);
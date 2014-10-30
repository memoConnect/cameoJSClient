'use strict';

angular.module('cmUi')
.filter('strnl2nl', [
    '$sce',
    function($sce){
        return function(string) {
            var string = (string + '').replace(/\\n/g, '\n');
            return $sce.trustAsHtml(string);
        }
    }
]);
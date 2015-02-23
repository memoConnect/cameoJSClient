'use strict';

angular.module('cmCore')
.factory('$navigator', [
    function() {
        return typeof navigator != 'undefined' ? navigator : 'undefined';
    }
]);
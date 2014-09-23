'use strict';

angular.module('cmPhonegap')
.factory('$navigator', function(){
    return typeof navigator != 'undefined' ? navigator : undefined;
});
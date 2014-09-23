'use strict';

angular.module('cmPhonegap')
.service('$navigator', function(){
    return typeof navigator != 'undefined' ? navigator : undefined;
});
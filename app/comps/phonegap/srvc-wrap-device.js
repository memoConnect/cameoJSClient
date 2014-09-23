'use strict';

angular.module('cmPhonegap')
.service('$device', function(){
    return typeof device != 'undefined' ? device : undefined;
});
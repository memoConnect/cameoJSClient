'use strict';

angular.module('cmPhonegap')
.factory('$screen', function(){
    return typeof screen != 'undefined' ? screen : 'undefined';
});
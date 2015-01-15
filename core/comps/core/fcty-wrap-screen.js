'use strict';

angular.module('cmCore')
.factory('$screen', function(){
    return typeof screen != 'undefined' ? screen : 'undefined';
});
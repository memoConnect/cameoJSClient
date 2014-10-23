'use strict';

angular.module('cmCore')
.filter('cmTranslate', [
    'translateFilter',
    function(translateFilter){
        return translateFilter;
    }
]);
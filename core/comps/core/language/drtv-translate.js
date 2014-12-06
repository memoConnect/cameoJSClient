'use strict';

angular.module('cmCore')
//Does not work as intended <div cm-translate="LANG.DE"></div> stays empty
.directive('cmTranslate', [
    'translateDirective',
    function(translateDirective){
        return translateDirective[0]
    }
]);
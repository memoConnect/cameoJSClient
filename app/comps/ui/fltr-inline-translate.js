'use strict';

angular.module('cmUi')
.filter('cmInlineTranslate', [
    '$filter',
    function($filter){
        return function(text){
            if(text == undefined)
                return '';

            var result = text,
                matches = text.match(/\$\$\{[A-Z0-9\.]*\}/) || [];

            matches.forEach(function(match){
                result = result.replace(match, $filter('cmTranslate')(match.replace('$${','').replace('}','')))
            });

            return result;
        }
    }
]);
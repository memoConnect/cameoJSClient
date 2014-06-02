'use strict';

angular.module('cmUi').filter('cmInlineTranslate', [

    '$filter',

    function($filter){
        return function(text){ 
            var result = text,
                matches = text.match(/\$\$\{[A-Z\.]*\}/) || []

            matches.forEach(function(match){
                console.log(match)
                result = result.replace(match, $filter('cmTranslate')(match.replace('$${','').replace('}','')))
            })
            return result
        }
    }
]);
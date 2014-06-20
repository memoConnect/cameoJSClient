'use strict';

angular.module('cmUi').filter('cmParse', [
    '$filter',
    function($filter){
        return function(text){

            text = $filter('cmTranslate')(text);
            text = $filter('cmInlineTranslate')(text);
            text = $filter('cmAutolink')(text, 40);
            text = $filter('cmEmoji')(text);
            text = $filter('nl2br')(text);

            return text;
        }
    }
]);
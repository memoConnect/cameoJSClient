'use strict';

angular.module('cmUi').filter('cmParse', [

    '$filter',

    function($filter){
        return function(text){

            text = $filter('cmInlineTranslate')(text)
            text = $filter('cmAutolink')(text, 40)
            text = $filter('nl2br')(text)

            return text
        }
    }
]);
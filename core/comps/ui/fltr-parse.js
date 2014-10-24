'use strict';

angular.module('cmUi')
.filter('cmParse', [
    '$filter', '$compile',
    function($filter, $compile){
        return function(html, ignore){
            if(ignore == undefined)
                ignore = {};

            if(!('escape' in ignore))
                html = $filter('cmEscape')(html);

            if(!('translate' in ignore))
                html = $filter('cmTranslate')(html);

            if(!('inlineTranslate' in ignore))
                html = $filter('cmInlineTranslate')(html);

            if(!('autolink' in ignore))
                html = $filter('cmAutolink')(html, 40);//$sce

            if(!('emoji' in ignore))
                html = $filter('cmEmoji')(html);

            if(!('nl2br' in ignore))
                html = $filter('nl2br')(html);//$sce

            return html;
        }
    }
]);
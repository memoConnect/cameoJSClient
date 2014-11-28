'use strict';

angular.module('cmUi')
.filter('cmParse', [
    '$filter', '$compile',
    function($filter, $compile){
        return function(html, ignoreOrArgs){
            if(ignoreOrArgs == undefined)
                ignoreOrArgs = {};

            if(!('escape' in ignoreOrArgs))
                html = $filter('cmEscape')(html);

            if(!('translate' in ignoreOrArgs))
                html = $filter('cmTranslate')(html, 'data' in ignoreOrArgs ? ignoreOrArgs.data : {});

            if(!('inlineTranslate' in ignoreOrArgs))
                html = $filter('cmInlineTranslate')(html);

            if(!('autolink' in ignoreOrArgs))
                html = $filter('cmAutolink')(html, 40);//$sce

            if(!('emoji' in ignoreOrArgs))
                html = $filter('cmEmoji')(html);

            if(!('nl2br' in ignoreOrArgs))
                html = $filter('nl2br')(html);//$sce

            return html;
        }
    }
]);
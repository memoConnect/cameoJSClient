'use strict';

angular.module('cmUi')
.filter('cmParse', [
    '$filter',
    function($filter){
        return function(html){

            html = $filter('cmEscape')(html);
            html = $filter('cmTranslate')(html);
            html = $filter('cmInlineTranslate')(html);
            html = $filter('cmAutolink')(html, 40);// $sce
            html = $filter('cmEmoji')(html);
            html = $filter('nl2br')(html);//$sce

            return html;
        }
    }
]);
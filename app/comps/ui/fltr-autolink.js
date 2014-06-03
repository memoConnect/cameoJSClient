'use strict';

angular.module('cmUi').filter('cmAutolink', [
    '$sce',
    'cmUtil',
    function($sce, cmUtil){
        return function(text, attrStrLen){
            var pattern = /(^|[\s\n]|<br\/?>)(((?:https?|ftp)(:\/\/)|(www|\/\/))[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
            var strLen = attrStrLen||50

            return text.replace(pattern, function(link){
                var tag = '<a href="%href" target="_blank" title="%href">%link</a>';
                var url = cmUtil.startsWith(link,'http://') ? link : 'http://'+link;
                if(url != undefined){
                    if(link.length > strLen){
                        return $sce.trustAsHtml(tag.replace(/%href/g,url).replace(/%link/g,String(link).substring(0, strLen)));
                    } else {
                        return $sce.trustAsHtml(tag.replace(/%href/g,url).replace(/%link/g,link));
                    }
                }
            });
        }
    }
]);
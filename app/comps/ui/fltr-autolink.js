'use strict';

angular.module('cmUi')
.filter('cmAutolink', [
    '$sce',
    'cmUtil',
    function($sce, cmUtil){
        return function(text, attrStrLen){
            var pattern = /(^|[\s\n]|<br\/?>)(((?:https?|ftp)(:\/\/)|(www|\/\/))[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
            var strLen = attrStrLen||50;
            var slash = '&#x2F;&#x2F;'; // // double Forward Slash

            if(text == undefined)
                return '';

            if(text.indexOf(slash) > -1) {
                text = text.replace(/[&#x2F;]{6}/g, '/');
            }

            return text.replace(pattern, function(link){

                var tag = '<a href="%href" target="_blank" title="%href">%link</a>',
                    clearLink = link.replace(/\s+/g,''), // clear whitespace
                    url = !cmUtil.startsWith(clearLink,'www') // check if starts with http
                        ? clearLink
                        : 'http://'+clearLink,
                    startsWithBreak = link.indexOf('\n') != -1;

                if(url != undefined){
                    if(clearLink.length > strLen){
                        return $sce.trustAsHtml(
                                (startsWithBreak ? '\n' : '') +
                                (cmUtil.startsWith(link,' ')?' ':'') +
                                tag.replace(/%href/g,url)
                                   .replace(/%link/g,String(clearLink).substring(0, strLen))
                        );
                    } else {
                        return $sce.trustAsHtml(
                                (startsWithBreak ? '\n' : '') +
                                (cmUtil.startsWith(link,' ')?' ':'') +
                                tag.replace(/%href/g,url)
                                   .replace(/%link/g,clearLink)
                        );
                    }
                }
            });
        }
    }
]);
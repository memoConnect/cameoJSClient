'use strict';

angular.module('cmUi').filter('cmAutolink', [
    function(){
        return function(text, attrStrLen){
            var pattern = /(^|[\s\n]|<br\/?>)(((?:https?|ftp)(:\/\/)|(www|\/\/))[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
            var strLen = attrStrLen||50

            return text.replace(pattern, function(link){
                var tag = '<a href="%href" target="_blank" title="%href">%link</a>';
                if(link != undefined){
                    if(link.length > strLen){
                        return tag.replace(/%href/,link).replace(/%link/,String(link).substring(0, strLen));
                    } else {
                        return tag.replace(/%href/,link).replace(/%link/,link);
                    }
                }
            });
        }
    }
]);
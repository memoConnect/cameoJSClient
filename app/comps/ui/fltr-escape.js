'use strict';

angular.module('cmUi')
.filter('cmEscape', [
    function(){
        return function(canBeHtml){
            var entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': '&quot;',
                "'": '&#39;',
                "/": '&#x2F;'
            };

            function escapeHtml(string) {
                return String(string).replace(/[&<>"'\/]/g, function (s) {
                    return entityMap[s];
                });
            }

            var text = escapeHtml(canBeHtml||'');

            return text;
        }
    }
]);
'use strict';

angular.module('cmUi').directive('cmInputWatcher',[
    function(){
        return {
            restrict: 'A',

            link: function(scope, element){
                element.find('input').on('focus',function(){
                    element.addClass('isActive');
                }).on('blur',function(){
                    element.removeClass('isActive');
                });
            }
        }
    }
]);
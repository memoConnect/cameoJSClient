'use strict';

function cmReload($route){
    return {
        restrict: 'AE',
        scope: true,
        template: '<i class="fa cm-change"></i>',
        controller: function($scope, $element){
            $element.on('click',function(){
                $route.reload();
            });
        }
    }
}
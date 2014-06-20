'use strict';

angular.module('cmUi').directive('cmAddButton',[
    function(){
        return {
            restrict: 'E',
            template: '<i class="fa cm-{{icon}}"></i>',
            link: function(scope, element, attrs){
                scope.icon = attrs.cmIcon;
            }
        }
    }
]);
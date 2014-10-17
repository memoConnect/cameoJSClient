'use strict';

angular.module('cmUi').directive('cmAddButton',[
    function(){
        return {
            restrict: 'E',
            template: '<i class="fa with-response cm-{{icon}}"></i>',
            scope: {
                icon: "@cmIcon"
            }
        }
    }
]);
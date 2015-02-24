'use strict';

angular.module('cmUi').directive('cmSelecter',[
    function (){
        return{
            restrict: 'A',
            link: function(scope, element){
                element.on('focus',function(){
                    element[0].select();

                    // Work around Chrome's little problem
                    element[0].onmouseup = function() {
                        // Prevent further mouseup intervention
                        element[0].onmouseup = null;
                        return false;
                    };
                });
            }
        }
    }
]);
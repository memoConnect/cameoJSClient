'use strict';

angular.module('cmUi')
.directive('cmSendOnReturn',[
    'cmSettings',
    '$rootScope',
    function (cmSettings,
              $rootScope){
        return {
            restrict: 'A',
            link: function(scope, element){

                function keyDownHandler(event){
                    if(event.keyCode == 13
                    && event.shiftKey == false
                    && cmSettings.is('sendOnReturn')){
                        $rootScope.$broadcast('sendOnReturn');
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    }
                    return true;
                }

                element.on('keydown',keyDownHandler);

                scope.$on('$destroy',function(){
                    element.off('keydown',keyDownHandler);
                });
            }
        }
    }
]);
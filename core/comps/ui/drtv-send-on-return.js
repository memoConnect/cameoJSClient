'use strict';

angular.module('cmUi').directive('cmSendOnReturn',[
    'cmSettings',
    '$rootScope',
    function (cmSettings,
              $rootScope){
        return {
            restrict: 'A',
            link: function(scope, element){
                element.on('keydown', function(e){
                    // on return
                    if(e.keyCode == 13 && e.shiftKey == false && cmSettings.is('sendOnReturn')){
                        $rootScope.$broadcast('sendOnReturn');
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                    return true;
                });
            }
        }
    }
]);
'use strict';

angular.module('cmDesktopUi').directive('cmColumn',[
    function () {
        return {
            restrict: 'E',
            link: function(scope, element){
                if(element.find('cm-footer').length == 0)
                    element.addClass('without-footer')
                else
                    element.removeClass('without-footer')
            }
        }
    }
]);
'use strict';

/**
 * @ngdoc directive
 * @name cmDesktopWidgets.directive:cmDesktopWidgetMenu
 * @description
 * Desktop menu with identites
 *
 * @restrict E
 * @example
 */
angular.module('cmDesktopWidgets')
.directive('cmDesktopWidgetMenu', [
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/wdgt-desktop-menu.html'
        }
    }
]);
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
angular.module('cmDesktopWidgets').directive('cmDesktopWidgetLoginBlank', [
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/blank/wdgt-desktop-login-blank.html'
        }
    }
]);
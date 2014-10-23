'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSettingsAccount
 * @description
 * account settings
 *
 * @restrict E
 * @example
 */
angular.module('cmWidgets').directive('cmWidgetSettingsAccount', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/wdgt-settings-account.html',
            controller: function(){
                //console.log('cmWidgetSettingsAccount')
            }
        }
    }
]);
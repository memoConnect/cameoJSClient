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
angular.module('cmWidgets').directive('cmWidgetSetupAccount', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/setup/wdgt-setup-account.html',
            controller: function(){
                //console.log('cmWidgetSetupAccount')
            }
        }
    }
]);
'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSettingsIdentity
 * @description
 * identity setup
 *
 * @restrict E
 * @example
 */
angular.module('cmWidgets').directive('cmWidgetSetupCameoid', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/setup/wdgt-setup-cameoid.html',
            controller: function(){
                //console.log('cmWidgetSetupAccount')
            }
        }
    }
]);
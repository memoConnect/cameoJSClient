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
angular.module('cmWidgets').directive('cmWidgetSetupIdentity', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/setup/wdgt-setup-identity.html',
            controller: function(){
                //console.log('cmWidgetSetupAccount')
            }
        }
    }
]);
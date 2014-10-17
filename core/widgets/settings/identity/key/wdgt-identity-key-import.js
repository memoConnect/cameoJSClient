'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyImport
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
angular.module('cmWidgets').directive('cmWidgetIdentityKeyImport', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-import.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyImport')
            }
        }
    }
]);
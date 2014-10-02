'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyEdit
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
angular.module('cmWidgets').directive('cmWidgetIdentityKeyEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyEdit')
            }
        }
    }
]);
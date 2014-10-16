'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityEdit
 * @description
 * List conversations.
 *
 * @restrict E
 * @example
 */
angular.module('cmWidgets').directive('cmWidgetIdentityEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityEdit')
            }
        }
    }
]);
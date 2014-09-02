'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityEdit
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
angular.module('cmWidgets').directive('cmWidgetIdentityEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/wdgt-identity-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityEdit')
            }
        }
    }
]);
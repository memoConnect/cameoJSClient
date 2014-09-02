'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityOverview
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
angular.module('cmWidgets').directive('cmWidgetIdentitiesOverview', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/identity/wdgt-identities-overview.html',
            controller: function(){
                //console.log('cmWidgetIdentitiesOverview')
            }
        }
    }
]);
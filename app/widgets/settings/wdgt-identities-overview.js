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
    // no depencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/wdgt-identities-overview.html',
            controller: function(){
                //console.log('cmWidgetIdentitiesOverview')
            }
        }
    }
]);
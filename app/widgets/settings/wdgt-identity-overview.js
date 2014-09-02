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
angular.module('cmWidgets').directive('cmWidgetIdentityOverview', [
    // no depencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/wdgt-identity-overview.html',
            controller: function($scope, $element, $attrs){
                console.log('cmWidgetIdentityOverview')
            }
        }
    }
]);
'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSearch
 * @description
 * Search contacts.
 *
 * @restrict AE
 */

angular.module('cmWidgets')
.directive('cmWidgetContactSearch', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-search.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
]);
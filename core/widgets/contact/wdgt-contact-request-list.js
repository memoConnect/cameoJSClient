'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

angular.module('cmWidgets')
.directive('cmWidgetContactRequestList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-request-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
]);
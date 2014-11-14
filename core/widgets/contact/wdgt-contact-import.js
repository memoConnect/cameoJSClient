'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactImport
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

angular.module('cmWidgets')
.directive('cmWidgetContactImport', [
    function( ){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-import.html'
        }
    }
]);
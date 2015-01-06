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
.directive('cmWidgetContactCreate', [
    function(){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-create.html',
            controller: function(){
            }
        }
    }
]);
'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams

angular.module('cmWidgets')
.directive('cmWidgetContactEdit', [
    function(){
        return {
            restrict: 'E',
            scope: {
                contactId: '=cmContactId'
            },
            templateUrl: 'widgets/contact/wdgt-contact-edit.html'
        }
    }
]);
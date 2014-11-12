'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactEdit
 * @description
 * Edit Contact
 *
 * @restrict AE
 */

angular.module('cmWidgets').directive('cmWidgetContactEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          {
                contact: '=cmData'
            },
            templateUrl:    'widgets/contact/wdgt-contact-edit.html',
            controller: function($scope) {
            }
        }
    }
]);
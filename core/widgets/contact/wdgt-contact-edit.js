'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactEdit
 * @description
 *
 * @restrict E
 */

angular.module('cmWidgets')
.directive('cmWidgetContactEdit', [
    function(){
        return {
            restrict: 'E',
            scope: {
                contact: '=cmData'
            },
            templateUrl: 'widgets/contact/wdgt-contact-edit.html'
        }
    }
]);
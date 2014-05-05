'use strict';

angular.module('cmFiles').directive('cmFileInput', [
    function () {
        return {
            restrict: 'AE',
            require: '^cmAttachments',
            scope: {},
            template: '<input type="file">',

            link: function (scope, element, attributes, attachmentsCtrl) {
                element.on("change", function (event) {
                    attachmentsCtrl.setFile(event.target.files[0]);
                    scope.$apply();
                });
            }
        }
    }
]);
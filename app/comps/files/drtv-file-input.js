'use strict';

angular.module('cmFiles').directive('cmFileInput', [
    function () {
        return {
            restrict: 'AE',
            require: '^cmFiles',
            scope: {},
            template: '<input type="file">',

            link: function (scope, element, attributes, cmFilesCtrl) {
                element.on("change", function (event) {
                    cmFilesCtrl.setFile(event.target.files[0]);
                    scope.$apply();
                });
            }
        }
    }
]);
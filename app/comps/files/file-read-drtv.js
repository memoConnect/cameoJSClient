'use strict';

function cmFileRead() {
    return {
        scope: {
            fileread: "=cmFileRead"
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                });
            });
        }
    }
}
'use strict';

function cmFileInput() {
    return {
        restrict : 'AE',
        require : '^cmUpload',
        scope : {},
        template : '<input type="file" placeholder ="{FILES.PLACEHOLDER.UPLOAD|cmTranslate}">',

        link: function (scope, element, attributes, uploadCtrl) {
            element.on("change", function (event) {
                uploadCtrl.setFile(event.target.files[0])
            });
        }
    }
}
'use strict';

angular.module('cmFiles').directive('cmAttachmentsPreview',[
    function () {
        return {
            restrict: 'E',
            require: '^cmAttachments',
            link: function (scope, element, attributes, attachmentsCtrl) {

            }
        }
    }
]);
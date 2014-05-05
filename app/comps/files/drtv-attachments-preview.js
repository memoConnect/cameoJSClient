'use strict';

angular.module('cmFiles').directive('cmAttachmentsPreview',[
    function() {
        return {
            restrict: 'E',
            templateUrl: 'comps/files/drtv-attachments-preview.html'
        }
    }
]);
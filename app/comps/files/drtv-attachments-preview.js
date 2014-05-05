'use strict';

angular.module('cmFiles').directive('cmAttachmentsPreview',[
    '$q',
    function ($q) {
        return {
            restrict: 'E',
            templateUrl: 'comps/files/drtv-attachments-preview.html',
            controller: function($scope){

            }
        }
    }
]);
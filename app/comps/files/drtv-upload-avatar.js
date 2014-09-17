'use strict';

angular.module('cmFiles').directive('cmUploadAvatar',[
    function() {
        return {
            restrict: 'E',
            templateUrl: 'comps/files/drtv-upload-avatar.html',
            //require: '^cmFiles',

            link: function (scope, element, attrs, cmFilesCtrl) {

            }
        }
    }
]);
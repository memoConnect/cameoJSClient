'use strict';

angular.module('cmFiles').directive('cmFilesPreview',[
    'cmFileFactory',
    function(cmFileFactory) {
        return {
            restrict: 'E',
            templateUrl: 'comps/files/drtv-files-preview.html',
            require: '^cmFiles',

            link: function (scope, element, attrs, cmFilesCtrl) {
                scope.removeFile = function(file){
                    cmFilesCtrl.removeFile(file);
                }
            }
        }
    }
]);
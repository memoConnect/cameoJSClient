'use strict';

angular.module('cmFiles').directive('cmFilesPreview',[
    'cmFileTypes',
    'cmFileFactory',
    function(cmFileTypes, cmFileFactory) {
        return {
            restrict: 'E',
            templateUrl: 'comps/files/drtv-files-preview.html',
            require: '^cmFiles',

            link: function (scope, element, attrs, cmFilesCtrl) {
                scope.removeFile = function(file){
                    cmFilesCtrl.removeFile(file);
                }
            },

            controller: function($scope){
                $scope.cmFileTypes = cmFileTypes;

                $scope.isImage = function(mime){
                    return mime == undefined ? false : mime.search('^image/') != -1;
                };

                $scope.removeFile = function(file){
                    cmFileFactory.remove(file);
                };
            }
        }
    }
]);
'use strict';

angular.module('cmFiles').directive('cmFilesPreview',[
    'cmFileTypes',
    function(cmFileTypes) {
        return {
            restrict: 'E',
            templateUrl: 'comps/files/drtv-files-preview.html',
            controller: function($scope){
                $scope.cmFileTypes = cmFileTypes;

                $scope.isImage = function(mime){
                    return mime == undefined ? false : mime.search('^image/') != -1;
                };
            }
        }
    }
]);
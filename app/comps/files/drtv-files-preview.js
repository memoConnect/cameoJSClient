'use strict';

angular.module('cmFiles').directive('cmFilesPreview',[
    '$rootScope',
    function($rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'comps/files/drtv-files-preview.html',
            require: '^cmFiles',

            link: function (scope, element, attrs, cmFilesCtrl) {
                scope.removeFile = function(file){
                    cmFilesCtrl.removeFile(file);
                };

                $rootScope.$on('textArea:resize', function(event,newHeight){
                    element.css('bottom',newHeight);
                });
            }
        }
    }
]);
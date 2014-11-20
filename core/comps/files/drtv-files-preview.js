'use strict';

angular.module('cmFiles').directive('cmFilesPreview',[
    'cmAnswerFiles',
    '$rootScope', '$document',
    function(cmAnswerFiles,
             $rootScope, $document) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'comps/files/drtv-files-preview.html',

            controller: function ($scope, $element) {
                $scope.files = cmAnswerFiles.files;

                $scope.removeFile = function(file){
                    cmAnswerFiles.remove(file);
                };

                $rootScope.$on('textArea:resize', function(event){
                    var answerMessage = $document[0].querySelector('cm-answer .message');
                    $element.css('bottom',answerMessage.offsetHeight+'px');
                });
            }
        }
    }
]);
'use strict';

angular.module('cmFiles').directive('cmFilesPreview',[
    '$rootScope', '$document',
    function($rootScope, $document) {
        return {
            restrict: 'E',
            templateUrl: 'comps/files/drtv-files-preview.html',
            require: '^cmFiles',

            link: function (scope, element, attrs, cmFilesCtrl) {
                scope.removeFile = function(file){
                    cmFilesCtrl.removeFile(file);
                };

                $rootScope.$on('textArea:resize', function(event){
                    var answerMessage = $document[0].querySelector('div.answer .message');
                    element.css('bottom',answerMessage.offsetHeight+'px');
                });
            }
        }
    }
]);
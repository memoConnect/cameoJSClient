'use strict';

angular.module('cmFiles').directive('cmFileChoose', [
    function () {

        var tpl = '<input type="file" data-qa="btn-file-choose">'

        return {
            restrict: 'AE',
            require: '^cmFiles',
            template: tpl,

            link: function (scope, element, attributes, cmFilesCtrl) {
                var index = 1;

                // add countrer for save resets
                function addCounter(){
                    element.find('input').attr('cm-resets',index);
                }

                // file is selected
                element.on('change', function (event) {
                    cmFilesCtrl.setFile(event.target.files[0]);
                });

                // reset files from sended message
                scope.$on('reset:files',function(){
                    element.html(tpl);
                    index++;
                    addCounter();
                });

                // init
                addCounter();
            }
        }
    }
]);
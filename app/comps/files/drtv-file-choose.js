'use strict';

// https://github.com/apache/cordova-plugin-camera/blob/b76b5ae670bdff4dd4c716e889ab12e049f9c733/doc/index.mdhttps://github.com/apache/cordova-plugin-camera/blob/b76b5ae670bdff4dd4c716e889ab12e049f9c733/doc/index.md

angular.module('cmFiles').directive('cmFileChoose', [
    'cmPhonegap', 'cmCamera',
    function (cmPhonegap, cmCamera) {

        var tpl = '<input type="file" data-qa="btn-file-choose" />'

        return {
            restrict: 'AE',
            require: '^cmFiles',
            template: tpl,

            link: function (scope, element, attrs, cmFilesCtrl) {
                var index = 1;

                // add countrer for save resets
                function addCounter(){
                    element.find('input').attr('cm-resets',index);
                }

                // phonegap
                if (cmPhonegap.isAvailable() && cmPhonegap.isAndroid()){
                    element.on('click', function (evt) {
                        evt.preventDefault();
                        evt.stopPropagation();

//                        cmCamera.takePhoto(function(blob){
//                            cmFilesCtrl.setFile(blob);
//                        });

                        cmCamera.chooseFile(function(){

                        });
                    });
                } else {
                    // default fileapi
                    // file is selected
                    element.on('change', function (event) {
                        cmFilesCtrl.setFile(event.target.files[0]);
                    });
                }

                // reset files from sended message
                scope.$on('reset:files',function(){
                    element.html(tpl);
                    index++;
                    addCounter();
                });

                if(attrs.cmDroparea){
                    var droparea = angular.element(document.getElementById(attrs.cmDroparea));

                    if(droparea != undefined) {
                        droparea.on('dragleave', function (evt) {
                            var target = evt.target;
                            if (target && target === droparea[0]) {
                                droparea.removeClass('files-dragged');
                            }
                            evt.preventDefault();
                            evt.stopPropagation();
                        });

                        droparea.on('dragenter', function (evt) {
                            droparea.addClass('files-dragged');
                            evt.preventDefault();
                            evt.stopPropagation();
                        });

                        droparea.on('dragover', function (evt) {
                            evt.preventDefault();
                            evt.stopPropagation();
                        });

                        droparea.on('drop', function (evt) {
                            evt.preventDefault();
                            evt.stopPropagation();

                            var files = evt.dataTransfer.files;

                            for (var i=0, l=files.length; i<l; i++) {
                                cmFilesCtrl.setFile(files[i]);
                            }

                            droparea.removeClass('files-dragged');
                        });
                    }
                }

                // init
                addCounter();
            }
        }
    }
]);
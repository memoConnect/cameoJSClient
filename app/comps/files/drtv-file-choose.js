'use strict';

angular.module('cmFiles').directive('cmFileChoose', [
    function () {

        var tpl = '<input type="file" data-qa="btn-file-choose" capture>'

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

                // phonegap fix for 4.4
                if (typeof device != 'undefined' &&
                    device.platform.toLowerCase() === 'android' &&
                    device.version.indexOf('4.4') === 0) {

                    document.addEventListener("deviceready", function () {
                        element
                            .on('click', function () {
                                filechooser.open({}, function (data) {
                                    // {"filepath":"\/storage\/emulated\/0\/DCIM\/Camera\/IMG_20140510_154258893_HDR.jpg"}
//                                    var file = new File(data.filepath);
//                                    console.log(file)
//                                    cmFilesCtrl.setFile(file);
                                });
                            });
                    }, false);

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
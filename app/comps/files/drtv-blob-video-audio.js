'use strict';

angular.module('cmFiles').directive('cmBlobVideoAudio',[
    '$rootScope',
    'cmFileTypes',
    'cmEnv',
    'cmFilesAdapter',
    function ($rootScope, cmFileTypes, cmEnv, cmFilesAdapter) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                function showFile(file){
                    if(typeof file.blob == 'object'){
                        var canPlay = element[0].canPlayType(file.type);
                        // browser supports file
                        if(!cmEnv.isiOS && canPlay) {
                            file.base64 = cmFilesAdapter.getBlobUrl(file.blob);
                            element.attr('src', file.base64.url);
                            element.on('load', function() {
                                fileReady(file);
                            });
                        // file can't play via html5 video
                        } else {
                            file.loaded = true;

                            var fileEl = angular
                                .element('<div class="file '+cmFileTypes.find(file.type, file.name)+'" ></div>')
                                .on('click',function(){
                                    file.promptSaveAs()
                                });

                            element.parent().html('').append(fileEl[0]);
                        }
                        // can play mov without use filereader...
//                        element.attr('src',window.URL.createObjectURL(file.blob));
                    } else {
                        // hide spinner
                        file.loaded = true;
                    }
                }

                function handleBlob(file){
                    if(typeof file !== 'undefined'){
                        if(file.state == 'cached' || file.state == 'new'){
                            showFile(file);
                        }

                        file.on('file:cached', function(){
                            showFile(file);
                        });

                        file.on('upload:finish', function(){
                            showFile(file);
                        });
                    }
                }

                function fileReady(file){
                    // hide spinner
                    scope.$apply(function () {
                        file.loaded = true;
                    });

                    if (attrs.cmScrollToTarget) {
                        $rootScope.$broadcast('scroll:to', attrs.cmScrollToTarget)
                    }
                }

                // load image via fileapi
                scope.$watch(attrs.cmBlobVideoAudio, handleBlob);
            }
        }
    }
]);
'use strict';

angular.module('cmFiles').directive('cmBlobVideoAudio',[
    'cmEnv', 'cmFilesAdapter',
    '$rootScope',
    function (cmEnv, cmFilesAdapter,
              $rootScope) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                function showFile(file){
                    if(typeof file.blob == 'object'){
                        var canPlay = element[0].canPlayType(file.type);
                        // browser supports file
                        if(!cmEnv.isiOS && canPlay) {
                            cmFilesAdapter.getBlobUrl(file.blob).then(function(objUrl){
                                file.url = objUrl;
                                element.attr('src', file.url.src);
                                fileReady(file);
                            });
                        // file can't play via html5 video
                        } else {
                            fileReady(file);

                            var fileEl = angular
                                .element('<div class="file '+file.detectedExtension+'" ></div>')
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
                        if(file.state.is('cached') || file.state.is('new')){
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
                    file.loaded = true;

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
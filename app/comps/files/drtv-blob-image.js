'use strict';

angular.module('cmFiles').directive('cmBlobImage',[
    '$rootScope',
    'cmFilesAdapter',
    function ($rootScope, cmFilesAdapter) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                // TODO: thumbnail

                function showFile(file){
                    if(typeof file.blob == 'object'){
                        cmFilesAdapter
                        .getBlobUrl(file.blob, true)
                        .then(function(objUrl){
                            file.url = objUrl;
                            element.attr('src', file.url.src);
                            element.on('load', function(){
                                // hide spinner
                                scope.$apply(function(){
                                    file.loaded = true;
                                });

                                if(attrs.cmScrollToTarget) {
                                    $rootScope.$broadcast('scroll:to',attrs.cmScrollToTarget)
                                }
                            });
                        });

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

                // load image via fileapi
                scope.$watch(attrs.cmBlobImage, handleBlob);
            }
        }
    }
]);
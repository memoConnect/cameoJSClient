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
//                        // get for img tag base64 url
//                        var reader = new FileReader();
//                        // promise when base64 loaded
//                        reader.onload = function(e){
//                            // set attribute
//                            element.attr('src',e.target.result);
//                            element.on('load', function(){
//                                // hide spinner
//                                scope.$apply(function(){
//                                    file.loaded = true;
//                                });
//
//                                if(attrs.cmScrollToTarget) {
//                                    $rootScope.$broadcast('scroll:to',attrs.cmScrollToTarget)
//                                }
//                            });
//                        };
//                        reader.readAsDataURL(file.blob)
                        file.base64 = cmFilesAdapter.getBlobUrl(file.blob);
                        element.attr('src', file.base64.url);
                        element.on('load', function(){
                            // hide spinner
                            scope.$apply(function(){
                                file.loaded = true;
                            });

                            if(attrs.cmScrollToTarget) {
                                $rootScope.$broadcast('scroll:to',attrs.cmScrollToTarget)
                            }
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
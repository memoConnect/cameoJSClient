'use strict';

angular.module('cmFiles').directive('cmBlobImage',[
    '$rootScope',
    'cmFilesAdapter',
    function ($rootScope, cmFilesAdapter) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

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

//                                if(attrs.cmScrollTo) {
//                                    $rootScope.$broadcast('scroll:to');
//                                }
                            });
                        });

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

                // load image via fileapi
                scope.$watch(attrs.cmBlobImage, handleBlob);
            }
        }
    }
]);
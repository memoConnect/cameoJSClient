'use strict';

angular.module('cmFiles').directive('cmBlobView',[
    '$rootScope',
    function ($rootScope) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                // TODO: thumbnail

                function showFile(file){
                    if(typeof file.blob == 'object'){
                        // get for img tag base64 url
                        var reader = new FileReader();
                        // promise when base64 loaded
                        reader.onload = function(e){
                            // set attribute
                            element.attr('src',e.target.result);
                            // hide spinner
                            scope.$apply(function(){
                                file.loaded = true;
                            });
                            if(attrs.cmScrollToTarget) {
                                $rootScope.$broadcast('scroll:to',attrs.cmScrollToTarget)
                            }
                        };
                        reader.readAsDataURL(file.blob)
                    } else {
                        // hide spinner
                        file.loaded = true;
                    }
                }

                function handleBlob(file){
                    if(file.hasBlob() !== true){
//                        file.trigger('request:blob');
                    } else {
                        showFile(file);
                    }

                }

                // load image via fileapi
                scope.$watch(attrs.cmBlobView, handleBlob);
            }
        }
    }
]);
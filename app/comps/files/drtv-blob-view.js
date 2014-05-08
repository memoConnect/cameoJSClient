'use strict';

angular.module('cmFiles').directive('cmBlobView',[
    function () {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                // TODO: thumbnail

                function handleBlob(file){
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
                        };
                        reader.readAsDataURL(file.blob)
                    } else {
                        // hide spinner
                        file.loaded = true;
                    }
                }

                // load image via fileapi
                scope.$watch(attrs.cmBlobView, handleBlob)
            }
        }
    }
]);
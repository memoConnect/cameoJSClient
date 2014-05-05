'use strict';

angular.module('cmFiles').directive('cmBlobView',[
    function () {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                // TODO: thumbnail
                // load image via fileapi
                scope.$watch(attrs.cmBlobView, function(attachment){
                    if(typeof attachment.blob == 'object'){
                        // get for img tag base64 url
                        var reader = new FileReader();
                        // promise when base64 loaded
                        reader.onload = function(e){
                            // set attribute
                            element.attr('src',e.target.result);
                            // hide spinner
                            scope.$apply(function(){
                                attachment.loaded = true;
                            });
                        };
                        reader.readAsDataURL(attachment.blob)
                    } else {
                        // hide spinner
                        attachment.loaded = true;
                    }
                })
            }
        }
    }
]);
'use strict';

angular.module('cmFiles').directive('cmBlobView',[
    function () {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                // TODO: thumbnail
                // load image via fileapi
                scope.$watch(attrs.cmBlobView, function(blob){
                    if(typeof blob == 'object'){
                        var reader = new FileReader();
                        reader.onload = function(e){
                            element.attr('src',e.target.result);
                        }
                        reader.readAsDataURL(blob)
                    }
                })
            }
        }
    }
]);
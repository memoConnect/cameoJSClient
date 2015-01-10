'use strict';

angular.module('cmUi').directive('cmStayInMask',[
    'cmUtil', 'cmFullscreen',
    '$window', '$screen',
    function (cmUtil, cmFullscreen,
              $window, $screen){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                var maskNode = cmUtil.findParent(attrs.cmStayInMask,element[0]),
                    win = {},
                    mask = {},
                    image = {};

                function calcRatio(obj){
                    obj.ratio = obj.width / obj.height;
                    obj.isPortrait = obj.width < obj.height;
                    obj.isLandscape = obj.width > obj.height;
                    obj.isSquare = obj.width == obj.height;
                }

                function calcDim(){
                    // width to big for mask
                    if(image.width > mask.width){
                        image.newWidth = mask.width;
                        image.newHeight = Math.round(image.newWidth / image.ratio);

                        if(image.newHeight > mask.height) {
                            image.top = Math.round((mask.height - image.newHeight)/2);
                        }
                    } else if(image.height > mask.height) {

                    }

                    // width to big for window
                    if(image.width > win.width){
                        image.maxWidth = win.width;
                        image.maxHeight = image.maxWidth / image.ratio;
                    } else {
                        image.maxWidth = image.width;
                        image.maxHeight = image.height;
                    }
                }

                function resize(event, init){
                    win.width = $screen.availWidth;
                    win.height = $screen.availHeight;

                    if(!init)
                        calcDim();
                }

                function setDim(dim){
                    element.css({
                        top:dim.top+'px',
                        width:dim.width+'px',
                        height:dim.height+'px'
                    });
                }

                resize({},true);

                element.on('load', function () {
                    mask = {
                        width: maskNode.offsetWidth,
                        height: maskNode.offsetHeight
                    };
                    image = {
                        width: this.naturalWidth,
                        height: this.naturalHeight
                    };

                    calcRatio(mask);
                    calcRatio(image);

                    calcDim();

                    // in mask
                    setDim({
                        top:image.top,
                        width:image.newWidth,
                        height:image.newHeight
                    });

                    cmFullscreen.on('change', function(event, isFullscreenOpen){
                        if(isFullscreenOpen){
                            // in window
                            setDim({
                                top:0,
                                width:image.maxWidth,
                                height:image.maxHeight
                            });
                        } else {
                            // in mask
                            setDim({
                                top:image.top,
                                width:image.newWidth,
                                height:image.newHeight
                            });
                        }
                    });
                });

                angular.element($window).on('resize',resize);

                scope.$on('$destroy', function(){
                    angular.element($window).off('resize',resize);
                })
            }
        }
    }
]);
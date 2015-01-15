'use strict';

angular.module('cmUi')
.directive('cmStayInMask',[
    'cmUtil', 'cmFullscreen', 'cmObject',
    '$window',
    function (cmUtil, cmFullscreen, cmObject,
              $window){
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
                    if(image.isLandscape){
                        image.newWidth = mask.width;
                        image.newHeight = Math.ceil(image.newWidth / image.ratio);

                        if(image.newHeight > mask.height) {
                            image.top = Math.ceil((mask.height - image.newHeight)/2);
                        }
                    } else if(image.isPortrait || image.isSquare) {
                        // scale to mask
                        if(image.height >= mask.height){
                            image.newHeight = mask.height;
                            image.newWidth = Math.ceil(image.newHeight * image.ratio);
                        } else {
                            image.newHeight = image.height;
                            image.newWidth = image.width;

                            image.top = (mask.height / 2) - (image.height / 2);
                        }
                    }

                    // check max if fit in window
                    // on landscape check first the height
                    if(win.isLandscape) {
                        if (image.height > win.height) {
                            image.maxHeight = win.height;
                            image.maxWidth = Math.ceil(image.maxHeight * image.ratio);
                        } else if(image.width > win.width) {
                            image.maxWidth = win.width;
                            image.maxHeight = image.maxWidth / image.ratio;
                        } else {
                            image.maxWidth = image.width;
                            image.maxHeight = image.height;
                        }
                    // on portrait check first the width
                    } else {
                        if(image.width > win.width) {
                            image.maxWidth = win.width;
                            image.maxHeight = image.maxWidth / image.ratio;
                        } else {
                            image.maxWidth = image.width;
                            image.maxHeight = image.height;
                        }
                    }
                }

                function browserResize(event, init){
                    win.width = $window.innerWidth;
                    win.height = $window.innerHeight;

                    calcRatio(win);

                    if(!init)
                        calcDim();
                }

                function imageDimensions(event, data){
                    
                    if(!cmUtil.isInParent(data.element, element[0])){
                        return false;
                    }

                    if(data.isOpen){
                        browserResize();
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
                }

                function setDim(dim){
                    element.css({
                        top:dim.top+'px',
                        width:dim.width+'px',
                        height:dim.height+'px'
                    });

                    element.triggerHandler('dimensionsChanged',dim);
                }

                browserResize({},true);

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
                    calcRatio(win);

                    calcDim();

                    // in mask
                    setDim({
                        top:image.top,
                        width:image.newWidth,
                        height:image.newHeight
                    });

                    cmFullscreen.on('change', imageDimensions);
                });

                angular.element($window).on('resize',browserResize);
                angular.element($window).on('orientationchange',browserResize);

                scope.$on('$destroy', function(){
                    angular.element($window).off('resize',browserResize);
                    angular.element($window).off('orientationchange',browserResize);
                    cmFullscreen.off('change', imageDimensions);
                })
            }
        }
    }
]);
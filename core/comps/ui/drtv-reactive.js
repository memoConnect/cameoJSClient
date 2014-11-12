'use strict';

angular.module('cmUi').directive('cmReactive',[
    'cmDevice',
    '$timeout',
    '$parse',
    function (cmDevice,$timeout,$parse){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                var isTouch = false,
                    hasClicked = false; // for older browser ans iOS mobile devices

                function isValidTouch(evt){

                    function getOffsetSum(elem) {
                        var top=0, left=0;
                        while(elem) {
                            top = top + parseInt(elem.offsetTop);
                            left = left + parseInt(elem.offsetLeft);
                            elem = elem.offsetParent;
                        }
                        return {top: top, left: left};
                    }

                    var offset = getOffsetSum(element[0]);

                    if(evt.changedTouches[0].pageY <= (offset.top + element[0].offsetHeight) && evt.changedTouches[0].pageY > offset.top
                        && evt.changedTouches[0].pageX <= (offset.left + element[0].offsetWidth) && evt.changedTouches[0].pageX > offset.left
                    ){
                        return true;
                    }

                    return false;
                }

                function runClick(evt){
                    if(!hasClicked){
                        if('ngClick' in attrs){
                            var fn = $parse(attrs['ngClick']);
                            fn(scope,{$event:evt});
                        }
                    }

                    hasClicked = false; // set to default
                }

                element.on('mouseenter', function(){
                    element.addClass('is-hover');
                });

                element.on('mouseleave', function(){
                    element.removeClass('is-hover');
                });

                element.on('click',function(){
                    if(!cmDevice.isMobile()){
                        if(!isTouch){
                            element.addClass('is-clicked');
                            $timeout(function(){element.removeClass('is-clicked');},250)
                        }
                    } else {
                        hasClicked = true;
                    }
                });

                element.on('touchstart',function(){
                    isTouch = true;
                    element.removeClass('is-hover');
                });

                element.on('touchend',function(evt){
                    evt.preventDefault();

                    element.removeClass('is-hover');

                    if(isValidTouch(evt)){
                        element.addClass('is-touched');
                        $timeout(function(){element.removeClass('is-touched'); runClick(evt); isTouch = false;},250)
                    } else {
                        isTouch = false;
                    }

                });
            }
        }
    }
]);
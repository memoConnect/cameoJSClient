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
                    hasClicked = false, // for older browser ans iOS mobile devices
                    touchMove = false;

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
                    //console.log('runClick', hasClicked, attrs)

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
                    element.addClass('is-touched');
                });

                element.on('touchmove',function(){
                    touchMove = true;
                    element.removeClass('is-hover');
                    element.removeClass('is-touched');
                });

                element.on('touchend',function(evt){
                    evt.preventDefault();

                    element.removeClass('is-hover');

                    //console.log('touchMove', touchMove)

                    if(isValidTouch(evt) && !touchMove){
                        runClick(evt);
                        $timeout(function(){element.removeClass('is-touched'); isTouch = false;},250)
                    } else {
                        element.removeClass('is-touched');
                        isTouch = false;
                    }

                    touchMove = false; // default
                });
            }
        }
    }
]);
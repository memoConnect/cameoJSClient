'use strict';

angular.module('cmUi').directive('cmReactive',[
    '$timeout',
    '$parse',
    function ($timeout,$parse){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                var isTouch = false;

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

                element.on('mouseenter', function(evt){
                    element.addClass('is-hover');
                });

                element.on('mouseleave', function(){
                    element.removeClass('is-hover');
                });

                element.on('click',function(){
                    if(!isTouch){
                        element.addClass('is-clicked');
                        $timeout(function(){element.removeClass('is-clicked')},250)
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
                        $timeout(function(){element.removeClass('is-touched')},250)
                    }

                    if('ngClick' in attrs){
                        var fn = $parse(attrs['ngClick']);
                        fn(scope,{$event:evt});
                    }

                    isTouch = false;
                });
            }
        }
    }
]);
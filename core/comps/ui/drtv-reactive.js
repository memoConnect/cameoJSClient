'use strict';

angular.module('cmUi').directive('cmReactive',[
    'cmDevice',
    '$rootScope', '$timeout',
    function (cmDevice,
              $rootScope, $timeout){
        return {
            restrict: 'A',
            link: function(scope, element){
                if(cmDevice.isMobile()){
                    var huhu = $rootScope.$on('$routeChangeStart',function(e, next){
                        next.resolve = angular.extend( next.resolve || {}, {
                            animation: function(){
                                return $timeout(function () {
                                    // only do the animation bitsch
                                }, 260)
                            }
                        });
                    });

                    scope.$on('$destroy', function(){
                        huhu();
                    });

                    return false;
                }

                $rootScope.$on('$routeChangeSuccess',function(){
                    element.removeClass('is-hover');
                });

                element.on('mouseenter', function(){
                    element.addClass('is-hover');
                });

                element.on('mouseleave', function(){
                    element.removeClass('is-hover');
                });

                scope.$on('$destroy', function(){
                    element.off('mouseleave');
                    element.off('mouseenter');
                    element.removeClass('is-hover');
                });
            }
        }
    }
]);
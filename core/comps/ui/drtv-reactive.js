'use strict';

angular.module('cmUi').directive('cmReactive',[
    'cmDevice',
    '$rootScope', '$timeout',
    function (cmDevice,
              $rootScope, $timeout){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                // is disabled
                if('cmReactive' in attrs && attrs.cmReactive != '') {
                    attrs.$observe(
                        'cmReactive',
                        function(value) {
                            var isDisabled = scope.$eval(value);
                            if(isDisabled) {
                                element.addClass('cm-reactive-disabled');
                            } else {
                                element.removeClass('cm-reactive-disabled');
                            }
                        }
                    );
                }

                if(cmDevice.isMobile()){
                    var killWatcher = $rootScope.$on('$routeChangeStart',function(e, next){
                        next.resolve = angular.extend( next.resolve || {}, {
                            animation: function(){
                                return $timeout(function () {
                                    // only do the animation
                                }, 260)
                            }
                        });
                    });

                    scope.$on('$destroy', function(){
                        killWatcher();
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
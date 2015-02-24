'use strict';

// http://blog.alexmaccaw.com/javascript-wake-event

angular.module('cmCore')
.directive('cmDetectStandby',[
    'cmVisibility',
    '$rootScope', '$window',
    function (cmVisibility,
              $rootScope, $window) {
        return {
            restrict: 'A',
            link: function () {
                var TIMEOUT = 20000;
                var lastTime = (new Date()).getTime();

                function compare(){
                    var currentTime = (new Date()).getTime();
                    if (currentTime > (lastTime + TIMEOUT + 2000)) {
                        $rootScope.$emit('cmApi:wakeup');
                    }
                    lastTime = currentTime;
                }

                cmVisibility.add('cmDetectStandby', compare);

                $window.setInterval(function () {
                    compare()
                }, TIMEOUT);
            }
        }
    }
]);
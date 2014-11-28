'use strict';
/*
 var event = document.createEvent('HTMLEvents')
 event.initEvent('backbutton', true, true)
 document.dispatchEvent(event)

 http://stackoverflow.com/questions/15813850/detect-history-back-using-angular
*/

angular.module('cmCore')
.service('cmHistory', [
    '$window', '$rootScope', '$location',
    function($window, $rootScope, $location){
        var self = {
            stack: [],
            add: function(url){
                this.stack.push(url);
            },
            removeLast: function(){
                this.stack.pop();
            },
            reset: function(){
                this.stack = [];
            },
            comesFrom: function(url){
                return this.stack.length > 1 && this.stack[this.stack.length - 2] == url;
            },
            isEmpty: function(){
                return this.stack.length == 0
                    || $rootScope.actualLocation == '/talks'
                    || $rootScope.actualLocation == '/login';
            },
            getPrev: function(){
                return !this.isEmpty()
                    ? this.stack[this.stack.length - 1]
                    : '';
            },
            goBack: function(){
                $rootScope.goBack();
            }
        };

        // detect back button event of browser
        $rootScope.$on('$locationChangeSuccess', function() {
            $rootScope.actualLocation = $location.path();
        });

        $rootScope.$watch(
            function(){return $location.path()},
            function (newLocation) {
                if($rootScope.actualLocation === newLocation) {
                    self.removeLast();
                }
            }
        );

        // detect route change
        $rootScope.$on('$routeChangeSuccess', function(){
            var current = $location.$$path;

            // clear history in some cases
            if(current.indexOf('/login') != -1) {
                self.reset();
                // push new route
            } else if(current !== self.getPrev()) {
                self.add($location.$$path);
            }
        });

        return self;
    }
]);

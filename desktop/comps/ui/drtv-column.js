'use strict';

angular.module('cmDesktopUi').directive('cmColumn',[
    '$rootScope', '$timeout',
    function ($rootScope, $timeout) {
        return {
            restrict: 'E',
            link: function(scope, element){
                function checkFooter(){
                    console.log(element.find('cm-footer'))
                    if(element.find('cm-footer').length == 0)
                        element.addClass('without-footer')
                    else
                        element.removeClass('without-footer')
                }

                checkFooter();

                var watchersEnd = $rootScope.$on('cmFooter:stateChanged',function(){
                    console.log('footer wech');
                    $timeout(function(){
                        checkFooter();
                    },50);
                });

                scope.$on('$destroy', function(){
                    watchersEnd();
                });
            }
        }
    }
]);
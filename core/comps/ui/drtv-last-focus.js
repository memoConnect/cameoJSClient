'use strict';

angular.module('cmUi')
.directive('cmLastFocus',[
    '$rootScope',
    function($rootScope){
        return {
            restrict: 'A',
            link: function(scope, element){
                function setLastFocus(){
                    $rootScope.lastFocus = this;
                }

                element
                    .on('focus', setLastFocus)

                scope.$on('$destroy', function() {
                    element
                        .off('focus', setLastFocus)
                });
            }
        }
    }
]);
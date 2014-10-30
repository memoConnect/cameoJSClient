'use strict';

angular.module('cmUi').directive('cmTimeout',[

    'cmUtil',

    function(cmUtil){
        return {
            restrict:   'E',
            scope:      true,
            controller: function($scope, $attrs){
                $scope.cmTimeout = cmUtil.millisecondsToStr(parseInt($scope.$parent.$eval($attrs.cmData || 0)))

                var last_value  =   undefined,
                    interval    =   window.setInterval(function(){
                                        $scope.cmTimeout = cmUtil.millisecondsToStr(parseInt($scope.$parent.$eval($attrs.cmData || 0)))
                                        if(last_value != $scope.cmTimeout){
                                            $scope.$digest()
                                            last_value = $scope.cmTimeout
                                        }
                                    }, 500)

                $scope.$on('$destroy', function(){
                    window.clearInterval(interval)
                })
            }
        }
    }
]);
'use strict';

function cmScrollTo($timeout){
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs){

            function initTimeout(){
                var anchor = angular.element(document.querySelector($attrs.cmScrollTo)),
                    body = angular.element(document.querySelector('body')),
                    html = angular.element(document.querySelector('html'));

                $timeout(function(){
                    body[0].scrollTop = anchor[0].offsetTop;
                    html[0].scrollTop = anchor[0].offsetTop;
                },1500);
            }

            if($attrs.ngRepeat && $scope.$last && $attrs.cmScrollTo != ''){
                initTimeout();
            } else if(!$attrs.ngRepeat){
                initTimeout();
            }
        }
    }
}
'use strict';

function cmScrollTo($timeout){
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs){
            if($scope.$last && $attrs.cmScrollTo != ''){
                var anchor = angular.element(document.querySelector($attrs.cmScrollTo)),
                    body = angular.element(document.querySelector('body'));

                $timeout(function(){
                    body[0].scrollTop = anchor[0].offsetTop;
                },500);
            }
        }
    }
}
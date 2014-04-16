'use strict';

angular.module('cmUi').directive('cmScrollTo',[
    '$timeout',
    function ($timeout){
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs){

                function initTimeout(){
                    var anchor = angular.element(document.querySelector($attrs.cmScrollTo)),
                        body = angular.element(document.querySelector('body')),
                        html = angular.element(document.querySelector('html'));

                    $timeout(function(){
                        var bottom = anchor[0].offsetTop + 5000;
                        body[0].scrollTop = bottom;
                        html[0].scrollTop = bottom;
                    },500);
                }

                if($attrs.ngRepeat && $scope.$last && $attrs.cmScrollTo != ''){
                    initTimeout();
                } else if(!$attrs.ngRepeat){
                    initTimeout();
                }
            }
        }
    }
]);
'use strict';

angular.module('cmUi').directive('cmScrollTo',[
    '$timeout',
    '$rootScope',
    function ($timeout, $rootScope){
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs){

                function initTimeout(target){
                    var anchor = angular.element(document.querySelector(target)),
                        body = angular.element(document.querySelector('body')),
                        html = angular.element(document.querySelector('html'));

                    $timeout(function(){
                        var bottom = anchor[0].offsetTop + 5000;
                        body[0].scrollTop = bottom;
                        html[0].scrollTop = bottom;
                    },500);
                }

                if($attrs.ngRepeat && $scope.$last && $attrs.cmScrollTo != ''){
                    initTimeout($attrs.cmScrollTo);
                    // this because of cm-blob-image
                    $rootScope.$on('scroll:to',function(event,target){
                        initTimeout(target);
                    })
                } else if(!$attrs.ngRepeat){
                    initTimeout($attrs.cmScrollTo);
                }
            }
        }
    }
]);
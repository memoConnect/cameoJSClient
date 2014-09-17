'use strict';

angular.module('cmUi').directive('cmScrollTo',[
    'cmLogger',
    '$timeout',
    '$rootScope',
    '$document',
    function (cmLogger, $timeout, $rootScope, $document){
        return {
            restrict: 'A',
            scope: true,
            controller: function($scope, $element, $attrs){
                $scope.options = angular.extend({},{
                    anchor: undefined, // #id of element
                    force: undefined, // force to top or bottom
                    onEvent: false,// only initalize the rootScope event
                    timeout: 250
                },$scope.$eval($attrs.cmScrollTo)||{});
            },
            link: function(scope, element, attrs){

                if(!scope.options.anchor){
                    cmLogger.warn('drtv cm-scroll-to anchor is empty');
                    return false;
                }

                var lastOffset = -1;

                function initTimeout(){
                    var anchor = angular.element($document[0].querySelector(scope.options.anchor)),
                        bodyAndHtml = angular.element($document[0].querySelectorAll('body,html')),
                        docTop = 0;
                    // count scrollTop
                    angular.forEach(bodyAndHtml,function(tag){
                        if(tag.scrollTop > docTop)
                            docTop = tag.scrollTop;
                    });

                    $timeout(function(){
                        var position = anchor[0].offsetTop;

                        switch(scope.options.force){
                            case 'bottom':
                                position = position+5000;
                            break;
                            case 'top':
                                position = 0;
                            break;
                        }
                        // set only first init or scrollheight changed
                        console.log(position,lastOffset,docTop)
                        if(lastOffset == -1 || docTop != position) {
                            lastOffset = position;

                            angular.forEach(bodyAndHtml, function (tag) {
                                tag.scrollTop = position;
                            });
                        }
                    },scope.options.timeout);
                }

                // drtv on create
                if(!scope.options.onEvent) {
                    // drtv in ng-loop
                    if (attrs.ngRepeat && $scope.$last) {
                        initTimeout();
                    // drtv normal
                    } else if (!attrs.ngRepeat) {
                        initTimeout();
                    }
                // only via event broadcast
                } else {
                    $rootScope.$on('scroll:to',function(event){
                        initTimeout();
                    });
                }
            }
        }
    }
]);
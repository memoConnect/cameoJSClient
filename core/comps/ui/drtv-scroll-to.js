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
                    timeout: 250,
                    addElementsHeight: undefined
                },$scope.$eval($attrs.cmScrollTo)||{});
            },
            link: function(scope, element, attrs){
                if(!scope.options.anchor){
                    cmLogger.warn('drtv cm-scroll-to anchor is empty');
                    return false;
                }

                function initTimeout(where){
                    var anchor = angular.element($document[0].querySelector(scope.options.anchor)),
                        bodyAndHtml = angular.element($document[0].querySelectorAll('body,html')),
                        extraOffset = 0;

                    // anchor isn't exists yet because of routeChange
                    if(anchor.length == 0) {
                        return false;
                    }

                    // subscract elements height because of overblending
                    if(scope.options.addElementsHeight) {
                        var extraHeight = angular.element($document[0].querySelectorAll(scope.options.addElementsHeight));
                        angular.forEach(extraHeight, function (tag) {
                            extraOffset = tag.offsetHeight;
                        });
                    }

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

                        angular.forEach(bodyAndHtml, function (tag) {
                            tag.scrollTop = position - extraOffset;
                        });
                    },scope.options.timeout);
                }

                // drtv on create
                if(!scope.options.onEvent) {
                    // drtv in ng-loop
                    if (attrs.ngRepeat && scope.$last) {
                        initTimeout('last');
                    // drtv normal
                    } else if (!attrs.ngRepeat) {
                        initTimeout('no-repeat');
                    }
                // only via event broadcast
                } else {
                    var scrollToEvent = $rootScope.$on('scroll:to',function(){
                        initTimeout('event');
                    });

                    scope.$on('$destroy', function(){
                        scrollToEvent();
                    });
                }
            }
        }
    }
]);
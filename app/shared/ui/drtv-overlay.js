'use strict';

angular.module('cmUi').directive('cmOverlay',[
    '$rootScope',
    function ($rootScope){
        return {
            restrict : 'AE',
            scope: true,
            transclude : true,

            link : function(scope, element, attrs, controller, transclude){
                var container = angular.element('<div class="container" ng-transclude></div>'),
                    bg = angular.element('<div cm-transparent-bg ng-click="hideOverlay()"></div>');

                element.append(bg);
                element.append(container);

                function show(){
                    angular.element(document.getElementById('cm-app')).append(element);

                    transclude(scope, function(clone){
                        container.append(clone);
                    });
                    element.addClass('visible');
                }

                function hide(){
                    element.removeClass('visible');
                    container.children().remove();
                }

                //container.on('click', hide)

                $rootScope.$on('cmOverlay:show', function(event, id){ if(attrs.id == id) show() });
                $rootScope.$on('cmOverlay:hide', function(event, id){ if(attrs.id == id) hide() });
            },

            controller: function($scope, $element, $attrs){
                $scope.hideOverlay = function(){
                    $scope.$emit('cmOverlay:hide', $attrs.id);
                }
            }
        }
    }
]);
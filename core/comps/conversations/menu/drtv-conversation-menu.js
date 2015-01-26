'use strict';


angular.module('cmConversations')
.directive('cmConversationMenu', [
    'cmUtil',
    '$window', '$rootScope',
    function (cmUtil,
              $window, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'comps/conversations/menu/drtv-conversation-menu.html',
            scope: {
                conversation: '=cmData'
            },

            link: function(scope, element){
                function clickOutside(e){
                    if(e.target != element[0] &&
                        !cmUtil.findParent('cmConversationMenu',e.target)
                    ) {
                        scope.$apply(function(){
                            scope.handleMenu('close');
                        })
                    }
                }

                angular.element($window).on('click',clickOutside);

                scope.$on('$destroy', function(){
                    angular.element($window).off('click',clickOutside);
                });
            },

            controller: function ($scope, $element, $attrs) {
                $scope.goto = $rootScope.goto;

                $scope.menuVisible = false;

                $scope.handleMenu = function(forceClose){
                    $scope.menuVisible = !forceClose && $scope.menuVisible || forceClose ? false : true;
                }
            }
        }
    }
]);
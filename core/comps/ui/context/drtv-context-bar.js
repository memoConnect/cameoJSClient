'use strict';

angular.module('cmUi').directive('cmContextBar',[
    'cmContextFactory', 'cmModal',
    function(cmContextFactory, cmModal){
        return {
            restrict: 'E',
            templateUrl: 'comps/ui/context/drtv-context-bar.html',
            scope: {},
            link: function(scope, element){

                function deactivate(){
                    element.removeClass('cm-show');
                }

                function activate(){
                    if(!element.hasClass('cm-show')){
                        element.addClass('cm-show');
                    }

                    scope.counter = cmContextFactory.length;
                }

                cmContextFactory.on('register', activate);

                scope.$on('$destroy',function(){
                    cmContextFactory.off('register', activate);
                });

                cmContextFactory.on('clear', deactivate);

                scope.$on('$destroy',function(){
                    cmContextFactory.off('clear', deactivate);
                });

                /**
                 * @todo clear on route change?
                 */
            },
            controller: function($scope){
                $scope.counter = 0;

                $scope.close = function(){
                    cmContextFactory.clear();
                };

                $scope.delete = function(){
                    var constText = 'SYSTEM.CONTEXT.MODAL.CONFIRM.DELETE.ONE_ITEM';
                    if(cmContextFactory.length > 1){
                        constText = 'SYSTEM.CONTEXT.MODAL.CONFIRM.DELETE.MORE_ITEMS';
                    }

                    cmModal.confirm({
                        title:  'SYSTEM.CONTEXT.MODAL.CONFIRM.DELETE.TITLE',
                        text:   constText
                    })
                    .then(function(){
                        cmContextFactory.delete();
                    })

                };
            }
        }
    }
]);

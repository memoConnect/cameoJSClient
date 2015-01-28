'use strict';

angular.module('cmUi').directive('cmContextBar',[
    'cmContextFactory', 'cmModal', 'cmLoader',
    function(cmContextFactory, cmModal, cmLoader){
        return {
            restrict: 'E',
            templateUrl: 'comps/ui/context/drtv-context-bar.html',
            scope: {},
            link: function(scope, element){

                function activate(){
                    if(!element.hasClass('cm-show')){
                        element.addClass('cm-show');
                    }

                    scope.counter = cmContextFactory.length;
                }

                function deactivate(){
                    element.removeClass('cm-show');
                }

                function check(){
                    if(cmContextFactory.length > 0){
                        scope.counter = cmContextFactory.length;
                    } else {
                        deactivate();
                    }
                }

                cmContextFactory.on('register', activate);
                cmContextFactory.on('deregister', check);

                scope.$on('$destroy',function(){
                    cmContextFactory.off('register', activate);
                    cmContextFactory.off('deregister', check);
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
                var running = false,
                    loader = new cmLoader($scope);

                $scope.counter = 0;

                $scope.close = function(){
                    cmContextFactory.clear();
                };

                $scope.delete = function(){
                    if(!running){
                        running = true;

                        loader.start();

                        var constText = 'SYSTEM.CONTEXT.MODAL.CONFIRM.DELETE.ONE_ITEM';
                        if(cmContextFactory.length > 1){
                            constText = 'SYSTEM.CONTEXT.MODAL.CONFIRM.DELETE.MORE_ITEMS';
                        }

                        cmModal.confirm({
                            title:  'SYSTEM.CONTEXT.MODAL.CONFIRM.DELETE.TITLE',
                            text:   constText
                        })
                            .then(function(){
                                cmContextFactory
                                    .delete()
                                    .finally(function(){
                                        running = false;
                                        loader.stop();
                                    });
                            })
                    }
                };
            }
        }
    }
]);

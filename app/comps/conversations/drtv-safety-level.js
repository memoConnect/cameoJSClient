'use strict';

angular.module('cmConversations').directive('cmSafetyLevel',[
    function cmSafetyLevel(){
        return {
            restrict: 'AE',
            template: '',

            link: function(scope, element, attrs){

                function drawLevel(x){
                    // clear all
                    element.children().remove();
                    // draw x
                    if(x == 0) {
                        element.append('<i class="fa cm-unlock"></i>');
                    } else {
                        for (var i = 0; i < x; i++) {
                            element.append('<i class="fa cm-lock"></i>');
                        }
                    }
                }

                // for conversation model
                if(attrs.cmLevel) {
                    scope.$watch(attrs.cmLevel, function (level) {
                        drawLevel(level)
                    })
                }

                // for conversation controls
                if(attrs.cmLevelState) {
                    scope.$watch(attrs.cmLevelState, function (state) {
                        var level = 0;
                        switch (state) {
                            case 'unsafe':
                                level = 0;
                                break;
                            case 'safe':
                                level = 1;
                                break;
                            case 'safer':
                                level = 2;
                                break;
                        }
                        drawLevel(level);
                    })
                }
            }
        }
    }
])
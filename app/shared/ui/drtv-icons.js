'use strict';

angular.module('cmUi').directive('cmIcons',[
    function cmSafetyLevel(){
        return {
            restrict:   'AE',
            template:   '',
            scope:      {
                            alt :   "@",
                            count:  "@",
                            icons:  "@"
                        },

            link: function(scope, element, attrs){
                function draw(){
                    // clear all
                    element.children().remove();
                    // draw x
                    if(scope.count == 0 && scope.alt) {
                        element.append('<i class="fa '+scope.alt+'"></i>')
                    } else {
                        for (var i = 0; i < scope.count; i++) {
                            element.append('<i class="fa '+scope.icons+'"></i>')
                        }
                    }
                }

                scope.$watch(attrs.count, function(count) {
                    scope.count = count
                    draw()
                })

                scope.$watch(attrs.icons, function(icon) {
                    scope.icons = icon
                    console.log(icon)
                    draw()
                })

                scope.$watch(attrs.alt, function(alt) {
                    scope.alt = alt
                    draw()
                })

            }
        }
    }
])
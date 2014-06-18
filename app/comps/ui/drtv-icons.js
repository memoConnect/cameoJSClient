'use strict';

angular.module('cmUi').directive('cmIcons',[
    function cmIcons(){
        return {
            restrict:   'AE',
            template:   '',
            scope:      {},

            link: function(scope, element, attrs){
                scope.count = attrs.count
                scope.icons = attrs.icons

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



                attrs.$observe('icons', function(icons) {
                    scope.icons = attrs.icons
                    draw()
                })

                attrs.$observe('count', function(count) {
                    scope.count = attrs.count
                    draw()
                })
            }

        }
    }
])
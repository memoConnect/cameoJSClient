'use strict';

angular.module('cmUi').directive('cmSecurityIndicator',[
    function cmSecurityIndicator(){
        return {
            restrict:   'AE',
            template:    '<cm-icons count="{{positive}}" icons="cm-lock"    class="positive"></cm-icons>'
                        +'<cm-icons count="{{negative}}" icons="cm-unlock"  class="negative"></cm-icons>',
            scope:      true,

            controller: function($scope, $element, $attrs){
                $scope.positive = 3
                $scope.negative = 4
            }
        }
    }
])
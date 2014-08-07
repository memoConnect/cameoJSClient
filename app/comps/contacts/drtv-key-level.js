'use strict';

angular.module('cmContacts').directive('cmKeyLevel',[
    function (){
        return {
            restrict: 'E',
            template: '<cm-icons icons="cm-lock" alt="cm-unlock" count="{{count}}"></cm-icons>',
            controller: function($scope, $element, $attrs){
                $scope.$watch($attrs.cmData, function(keySize){
                    $scope.count = 0;

                    if(keySize >= 2048){
                        $scope.count = 2;
                    }
                });
            }
        }
    }
]);